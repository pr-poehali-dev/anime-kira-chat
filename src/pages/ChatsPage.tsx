import { useState } from "react";
import Icon from "@/components/ui/icon";

const chats = [
  { id: 1, name: "AkiraKun", avatar: "🦊", lastMsg: "Хочешь сегодня продолжить нашу историю?", time: "5 мин", unread: 2, online: true },
  { id: 2, name: "MikuChan", avatar: "🌸", lastMsg: "Моя целительница уже готова к бою 💚", time: "30 мин", unread: 0, online: true },
  { id: 3, name: "DarkNova", avatar: "🌑", lastMsg: "Скоро начнём финальную главу", time: "2 ч", unread: 5, online: false },
  { id: 4, name: "LunaRei", avatar: "🌙", lastMsg: "Прочитала твою анкету персонажа — интересно!", time: "вчера", unread: 0, online: false },
];

const messages = [
  { id: 1, from: "other", text: "Привет! Готов к нашему RP сегодня? 🦊", time: "14:22" },
  { id: 2, from: "me", text: "Да, уже готовлю сцену! Мой маг наконец вышел из заточения после 3 лет в башне...", time: "14:23" },
  { id: 3, from: "other", text: "Оо, это звучит эпично! Моя лиса как раз будет проходить мимо той башни 😄✨", time: "14:24" },
  { id: 4, from: "me", text: "Идеально! Начинаем? *Асуки медленно открывает тяжёлые ворота башни, squinting от солнечного света после долгого заточения*", time: "14:25" },
  { id: 5, from: "other", text: "*Кагура застывает на дороге, её девять хвостов поднимаются от удивления* Ты... ты живой? Все думали, что ты погиб в ту ночь!", time: "14:26" },
];

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [calling, setCalling] = useState<"audio" | "video" | null>(null);

  const active = chats.find((c) => c.id === activeChat);

  if (calling) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center animate-fade-in"
        style={{ background: "rgba(8,11,20,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="text-center mb-8">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-6xl mx-auto mb-4 animate-glow-pulse kira-avatar"
            style={{ background: "var(--kira-surface)" }}
          >
            {active?.avatar}
          </div>
          <h3 className="font-orbitron text-xl font-bold text-kira-text mb-1">{active?.name}</h3>
          <p className="font-rajdhani text-sm text-kira-muted animate-blink">
            {calling === "video" ? "📹 Видеозвонок..." : "🎤 Звоним..."}
          </p>
        </div>

        {calling === "video" && (
          <div
            className="w-72 h-44 rounded-xl mb-8 flex items-center justify-center text-4xl"
            style={{ background: "var(--kira-surface2)", border: "1px solid var(--kira-border)" }}
          >
            📹
          </div>
        )}

        <div className="flex items-center gap-6">
          <button
            className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{ background: "rgba(155,93,229,0.2)", border: "1px solid var(--kira-purple)" }}
          >
            <Icon name="Mic" size={20} />
          </button>
          {calling === "video" && (
            <button
              className="w-14 h-14 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
              style={{ background: "rgba(0,187,249,0.2)", border: "1px solid var(--kira-cyan)" }}
            >
              <Icon name="Video" size={20} />
            </button>
          )}
          <button
            className="w-16 h-16 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{ background: "#DC143C" }}
            onClick={() => setCalling(null)}
          >
            <Icon name="PhoneOff" size={24} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full gap-0 overflow-hidden" style={{ height: "calc(100vh - 80px)" }}>
      {/* Chat list */}
      <div
        className={`${activeChat ? "hidden md:flex" : "flex"} flex-col w-full md:w-72 flex-shrink-0`}
        style={{ borderRight: "1px solid var(--kira-border)" }}
      >
        <div className="p-4" style={{ borderBottom: "1px solid var(--kira-border)" }}>
          <h2 className="font-orbitron text-base font-bold text-kira-purple mb-3">Личные чаты</h2>
          <input className="kira-input text-sm" placeholder="🔍 Поиск по чатам..." />
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((ch) => (
            <button
              key={ch.id}
              className="w-full flex items-center gap-3 p-4 text-left transition-all duration-200 hover:bg-kira-surface2"
              style={{
                background: activeChat === ch.id ? "var(--kira-surface2)" : "transparent",
                borderBottom: "1px solid var(--kira-border)",
              }}
              onClick={() => setActiveChat(ch.id)}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-2xl kira-avatar"
                  style={{ background: "var(--kira-surface)" }}
                >
                  {ch.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 ${ch.online ? "online-dot" : "offline-dot"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-rajdhani font-bold text-sm text-kira-text">{ch.name}</span>
                  <span className="font-rajdhani text-xs text-kira-muted">{ch.time}</span>
                </div>
                <p className="font-rajdhani text-xs text-kira-muted truncate">{ch.lastMsg}</p>
              </div>
              {ch.unread > 0 && (
                <span
                  className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--kira-purple)", color: "white" }}
                >
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat window */}
      {activeChat ? (
        <div className="flex flex-col flex-1 min-w-0">
          {/* Header */}
          <div
            className="flex items-center gap-3 p-4"
            style={{ borderBottom: "1px solid var(--kira-border)", background: "var(--kira-surface)" }}
          >
            <button className="md:hidden btn-kira-outline px-2 py-1 rounded-lg" onClick={() => setActiveChat(null)}>
              <Icon name="ArrowLeft" size={16} />
            </button>
            <div className="relative">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl kira-avatar" style={{ background: "var(--kira-surface2)" }}>
                {active?.avatar}
              </div>
              {active?.online && <div className="absolute -bottom-0.5 -right-0.5 online-dot" />}
            </div>
            <div className="flex-1">
              <p className="font-rajdhani font-bold text-sm text-kira-text">{active?.name}</p>
              <p className="font-rajdhani text-xs" style={{ color: active?.online ? "var(--kira-green)" : "var(--kira-muted)" }}>
                {active?.online ? "● онлайн" : "● оффлайн"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-kira-muted hover:text-kira-cyan transition-colors"
                style={{ border: "1px solid var(--kira-border)" }}
                onClick={() => setCalling("audio")}
              >
                <Icon name="Phone" size={15} />
              </button>
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center text-kira-muted hover:text-kira-purple transition-colors"
                style={{ border: "1px solid var(--kira-border)" }}
                onClick={() => setCalling("video")}
              >
                <Icon name="Video" size={15} />
              </button>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-kira-muted hover:text-kira-text" style={{ border: "1px solid var(--kira-border)" }}>
                <Icon name="MoreVertical" size={15} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-fade-up`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2.5 ${m.from === "me" ? "chat-bubble-mine" : "chat-bubble-other"}`}
                >
                  <p className="font-rajdhani text-sm leading-relaxed">{m.text}</p>
                  <p className="font-rajdhani text-xs text-kira-muted mt-1 text-right">{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            className="p-3 flex items-center gap-3"
            style={{ borderTop: "1px solid var(--kira-border)", background: "var(--kira-surface)" }}
          >
            <button className="text-kira-muted hover:text-kira-purple transition-colors">
              <Icon name="Paperclip" size={18} />
            </button>
            <input
              className="kira-input flex-1 text-sm py-2"
              placeholder="Напиши сообщение или действие РП... *действие в звёздочках*"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <button
              className="w-9 h-9 rounded-lg flex items-center justify-center btn-kira-primary flex-shrink-0"
              disabled={!msg}
            >
              <Icon name="Send" size={15} />
            </button>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-float">💬</div>
            <p className="font-orbitron text-sm text-kira-purple mb-1">Выбери чат</p>
            <p className="font-rajdhani text-xs text-kira-muted">Слева список твоих диалогов</p>
          </div>
        </div>
      )}
    </div>
  );
}
