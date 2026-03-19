import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const AUTH_URL = "https://functions.poehali.dev/74ba3c70-3a4d-4399-a72c-23b70ce06876";

interface AuthModalProps {
  onClose: () => void;
  onAuth: (user: { display_name: string; avatar_url: string; is_admin: boolean; session_token: string }) => void;
}

export default function AuthModal({ onClose, onAuth }: AuthModalProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Telegram Login Widget callback
  useEffect(() => {
    (window as Record<string, unknown>).onTelegramAuth = async (tgUser: Record<string, unknown>) => {
      setLoading("telegram");
      setError(null);
      const resp = await fetch(`${AUTH_URL}/telegram/callback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tgUser),
      });
      const data = await resp.json();
      if (resp.ok) {
        localStorage.setItem("kira_token", data.session_token);
        onAuth(data);
      } else {
        setError(data.error || "Ошибка Telegram авторизации");
        setLoading(null);
      }
    };

    // Inject Telegram widget script
    const existing = document.getElementById("tg-login-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "tg-login-script";
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", "KiraRPBot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.setAttribute("data-request-access", "write");
      script.async = true;
      document.getElementById("tg-widget-container")?.appendChild(script);
    }

    // Handle VK OAuth callback from popup
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === "vk_auth_callback" && e.data.code) {
        handleVkCallback(e.data.code);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const handleVkLogin = async () => {
    setLoading("vk");
    setError(null);
    const redirectUri = `${window.location.origin}/vk-callback.html`;
    const resp = await fetch(`${AUTH_URL}/vk/url?redirect_uri=${encodeURIComponent(redirectUri)}`);
    const data = await resp.json();
    if (data.url) {
      const popup = window.open(data.url, "vk_auth", "width=700,height=500,left=200,top=100");
      if (!popup) {
        setError("Разреши всплывающие окна в браузере для входа через VK");
        setLoading(null);
      }
    } else {
      setError("Не удалось получить ссылку VK. Проверь настройки VK_CLIENT_ID.");
      setLoading(null);
    }
  };

  const handleVkCallback = async (code: string) => {
    const redirectUri = `${window.location.origin}/vk-callback.html`;
    const resp = await fetch(`${AUTH_URL}/vk/callback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, redirect_uri: redirectUri }),
    });
    const data = await resp.json();
    setLoading(null);
    if (resp.ok) {
      localStorage.setItem("kira_token", data.session_token);
      onAuth(data);
    } else {
      setError(data.error || "Ошибка VK авторизации");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(8,11,20,0.95)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="kira-card rounded-2xl p-8 w-full max-w-sm animate-fade-up kira-panel-corner relative"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "1px solid rgba(155,93,229,0.4)" }}
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-kira-muted hover:text-kira-text transition-colors"
          onClick={onClose}
        >
          <Icon name="X" size={18} />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="font-orbitron text-3xl font-black text-kira-purple text-glow-purple mb-1">KIRA</h2>
          <p className="font-rajdhani text-xs text-kira-muted" style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Аниме РП Платформа
          </p>
        </div>

        <h3 className="font-rajdhani font-bold text-center text-kira-text mb-5">
          Войди или зарегистрируйся
        </h3>

        {error && (
          <div
            className="mb-4 px-4 py-2.5 rounded-lg font-rajdhani text-sm animate-fade-up"
            style={{ background: "rgba(220,20,60,0.1)", border: "1px solid rgba(220,20,60,0.3)", color: "#FF6B6B" }}
          >
            {error}
          </div>
        )}

        {/* VK */}
        <button
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl mb-3 font-rajdhani font-semibold text-sm transition-all duration-300 relative overflow-hidden"
          style={{ background: "#0077FF", color: "white", border: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.filter = ""; e.currentTarget.style.transform = ""; }}
          onClick={handleVkLogin}
          disabled={!!loading}
        >
          {loading === "vk" ? (
            <Icon name="Loader2" size={16} className="animate-spin" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2zm2.35 13.76h-1.56c-.59 0-.77-.47-1.83-1.54-.92-.9-1.33-.92-1.56-.92-.31 0-.41.09-.41.52v1.4c0 .37-.12.59-1.1.59-1.62 0-3.41-.98-4.67-2.81C4.57 10.66 4 8.49 4 7.97c0-.23.09-.45.52-.45h1.56c.39 0 .54.18.69.59.76 2.19 2.04 4.11 2.57 4.11.2 0 .29-.09.29-.59V9.41c-.06-1.06-.62-1.15-.62-1.52 0-.18.15-.36.39-.36h2.45c.33 0 .45.18.45.56v2.99c0 .33.15.45.24.45.2 0 .36-.12.72-.48 1.12-1.25 1.91-3.18 1.91-3.18.11-.23.29-.45.68-.45h1.56c.47 0 .57.24.47.56-.2.92-2.08 3.57-2.08 3.57-.16.26-.22.38 0 .67.16.21.69.66 1.04 1.06.65.73 1.14 1.34 1.27 1.77.12.43-.09.64-.52.64z"/>
            </svg>
          )}
          {loading === "vk" ? "Входим через VK..." : "Войти через ВКонтакте"}
        </button>

        {/* Telegram */}
        <div className="mb-3">
          <div
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-rajdhani font-semibold text-sm transition-all duration-300"
            style={{ background: "#229ED9", color: "white", cursor: "pointer" }}
          >
            {loading === "telegram" ? (
              <Icon name="Loader2" size={16} className="animate-spin" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.7 8.02c-.13.59-.47.73-.95.46l-2.62-1.93-1.26 1.21c-.14.14-.26.26-.53.26l.19-2.69 4.87-4.4c.21-.19-.05-.29-.33-.1L7.44 15.04 4.86 14.2c-.56-.17-.57-.56.12-.83l9.14-3.52c.46-.17.87.11.52.95z"/>
              </svg>
            )}
            <span>Войти через Telegram</span>
          </div>
          {/* Hidden Telegram widget container */}
          <div id="tg-widget-container" className="overflow-hidden" style={{ height: 0, opacity: 0, position: "absolute" }} />
          <p className="font-rajdhani text-xs text-kira-muted text-center mt-1">
            Нажми кнопку выше, затем подтверди в Telegram
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px" style={{ background: "var(--kira-border)" }} />
          <span className="font-rajdhani text-xs text-kira-muted">или войди как гость</span>
          <div className="flex-1 h-px" style={{ background: "var(--kira-border)" }} />
        </div>

        <button
          className="btn-kira-outline w-full py-3 rounded-xl text-sm"
          onClick={() => onAuth({ display_name: "Гость", avatar_url: "", is_admin: false, session_token: "" })}
        >
          Войти без регистрации
        </button>

        <p className="font-rajdhani text-xs text-kira-muted text-center mt-4">
          Авторизуясь, вы принимаете правила платформы Kira
        </p>
      </div>
    </div>
  );
}
