"""
Авторизация через VK и Telegram для платформы Kira.
Поддерживает OAuth VK и Telegram Login Widget.
"""
import json
import os
import hashlib
import hmac
import secrets
import urllib.request
import urllib.parse
import psycopg2


CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token",
}


def get_db():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def make_token():
    return secrets.token_hex(32)


def upsert_user(provider, provider_id, username, display_name, avatar_url, email=None):
    token = make_token()
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        """
        INSERT INTO users (provider, provider_id, username, display_name, avatar_url, email, session_token, last_seen)
        VALUES (%s, %s, %s, %s, %s, %s, %s, NOW())
        ON CONFLICT (provider, provider_id) DO UPDATE SET
            username = EXCLUDED.username,
            display_name = EXCLUDED.display_name,
            avatar_url = EXCLUDED.avatar_url,
            session_token = EXCLUDED.session_token,
            last_seen = NOW()
        RETURNING id, display_name, avatar_url, is_admin, session_token
        """,
        (provider, provider_id, username, display_name, avatar_url, email, token),
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return {"id": row[0], "display_name": row[1], "avatar_url": row[2], "is_admin": row[3], "session_token": row[4]}


def verify_telegram(data: dict) -> bool:
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    check_hash = data.pop("hash", "")
    data_check_arr = sorted([f"{k}={v}" for k, v in data.items()])
    data_check_string = "\n".join(data_check_arr)
    secret_key = hashlib.sha256(bot_token.encode()).digest()
    hmac_hash = hmac.new(secret_key, msg=data_check_string.encode(), digestmod=hashlib.sha256).hexdigest()
    return hmac_hash == check_hash


def get_user_by_token(token: str):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "SELECT id, display_name, avatar_url, is_admin, provider FROM users WHERE session_token = %s",
        (token,)
    )
    row = cur.fetchone()
    cur.close()
    conn.close()
    if row:
        return {"id": row[0], "display_name": row[1], "avatar_url": row[2], "is_admin": row[3], "provider": row[4]}
    return None


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    params = event.get("queryStringParameters") or {}

    # ── GET /me — проверить сессию ──────────────────────────────
    if method == "GET" and path.endswith("/me"):
        token = (event.get("headers") or {}).get("X-Auth-Token", "")
        if not token:
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "no token"})}
        user = get_user_by_token(token)
        if not user:
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "invalid token"})}
        return {"statusCode": 200, "headers": CORS, "body": json.dumps(user)}

    # ── GET /vk/url — получить ссылку для VK OAuth ──────────────
    if method == "GET" and path.endswith("/vk/url"):
        client_id = os.environ.get("VK_CLIENT_ID", "")
        redirect = params.get("redirect_uri", "")
        vk_url = (
            f"https://oauth.vk.com/authorize"
            f"?client_id={client_id}"
            f"&display=page"
            f"&redirect_uri={urllib.parse.quote(redirect)}"
            f"&scope=email"
            f"&response_type=code"
            f"&v=5.199"
        )
        return {"statusCode": 200, "headers": CORS, "body": json.dumps({"url": vk_url})}

    # ── POST /vk/callback — обработать код от VK ────────────────
    if method == "POST" and path.endswith("/vk/callback"):
        body = json.loads(event.get("body") or "{}")
        code = body.get("code", "")
        redirect_uri = body.get("redirect_uri", "")
        client_id = os.environ.get("VK_CLIENT_ID", "")
        client_secret = os.environ.get("VK_CLIENT_SECRET", "")

        token_url = (
            f"https://oauth.vk.com/access_token"
            f"?client_id={client_id}"
            f"&client_secret={client_secret}"
            f"&redirect_uri={urllib.parse.quote(redirect_uri)}"
            f"&code={code}"
        )
        with urllib.request.urlopen(token_url) as resp:
            token_data = json.loads(resp.read())

        if "error" in token_data:
            return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": token_data.get("error_description", "vk error")})}

        access_token = token_data["access_token"]
        vk_user_id = str(token_data["user_id"])
        email = token_data.get("email", "")

        api_url = f"https://api.vk.com/method/users.get?user_ids={vk_user_id}&fields=photo_100&access_token={access_token}&v=5.199"
        with urllib.request.urlopen(api_url) as resp:
            api_data = json.loads(resp.read())

        vk_user = api_data["response"][0]
        display_name = f"{vk_user.get('first_name', '')} {vk_user.get('last_name', '')}".strip()
        avatar_url = vk_user.get("photo_100", "")
        username = f"vk_{vk_user_id}"

        user = upsert_user("vk", vk_user_id, username, display_name, avatar_url, email)
        return {"statusCode": 200, "headers": CORS, "body": json.dumps(user)}

    # ── POST /telegram/callback — верифицировать Telegram login ──
    if method == "POST" and path.endswith("/telegram/callback"):
        body = json.loads(event.get("body") or "{}")
        tg_data = dict(body)

        if not verify_telegram(tg_data):
            return {"statusCode": 403, "headers": CORS, "body": json.dumps({"error": "invalid telegram signature"})}

        tg_id = str(body.get("id", ""))
        display_name = f"{body.get('first_name', '')} {body.get('last_name', '')}".strip()
        username = body.get("username", f"tg_{tg_id}")
        avatar_url = body.get("photo_url", "")

        user = upsert_user("telegram", tg_id, username, display_name, avatar_url)
        return {"statusCode": 200, "headers": CORS, "body": json.dumps(user)}

    return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "not found"})}