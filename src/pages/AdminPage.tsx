import { useState } from "react";
import Icon from "@/components/ui/icon";

const races = ["Человек", "Демон", "Эльф", "Дракон", "Дух", "Пустота"];
const classes = ["Воин", "Маг", "Плут", "Целитель", "Лучник", "Заклинатель"];

const users = [
  { name: "AkiraKun", avatar: "🦊", joined: "12.03.24", status: "active", role: "user", chars: 3 },
  { name: "MikuChan", avatar: "🌸", joined: "08.02.24", status: "active", role: "user", chars: 2 },
  { name: "DarkNova", avatar: "🌑", joined: "01.01.24", status: "banned", role: "user", chars: 4 },
  { name: "LunaRei", avatar: "🌙", joined: "20.03.24", status: "active", role: "mod", chars: 1 },
];

const broadcasts = [
  { title: "Ивент: Ночь Демонов 👿", date: "15.04.24", sent: 1240 },
  { title: "Обновление системы рас!", date: "10.04.24", sent: 1890 },
];

export default function AdminPage() {
  const [tab, setTab] = useState("stats");
  const [newRace, setNewRace] = useState("");
  const [newClass, setNewClass] = useState("");
  const [broadcastText, setBroadcastText] = useState("");
  const [raceList, setRaceList] = useState(races);
  const [classList, setClassList] = useState(classes);

  return (
    <div className="max-w-3xl mx-auto pb-24 md:pb-6">
      {/* Header */}
      <div
        className="rounded-xl p-4 mb-6 flex items-center gap-3 animate-fade-up"
        style={{ background: "linear-gradient(135deg, rgba(254,228,64,0.1), rgba(155,93,229,0.06))", border: "1px solid rgba(254,228,64,0.25)" }}
      >
        <div className="text-3xl">👑</div>
        <div>
          <h2 className="font-orbitron text-lg font-bold" style={{ color: "var(--kira-yellow)" }}>Админ-панель</h2>
          <p className="font-rajdhani text-xs text-kira-muted">Управление платформой Kira</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="online-dot" />
          <span className="font-rajdhani text-xs text-kira-green">Система работает</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-kira mb-6 overflow-x-auto animate-fade-up delay-100">
        {[
          { id: "stats", label: "Статистика", icon: "BarChart2" },
          { id: "users", label: "Пользователи", icon: "Users" },
          { id: "races", label: "Расы / Классы", icon: "Swords" },
          { id: "broadcast", label: "Рассылки", icon: "Megaphone" },
          { id: "channels", label: "Каналы", icon: "Hash" },
        ].map((t) => (
          <button key={t.id} className={`kira-tab flex items-center gap-1.5 ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <Icon name={t.icon} fallback="Circle" size={13} />
            {t.label}
          </button>
        ))}
      </div>

      {/* STATS */}
      {tab === "stats" && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Пользователей", val: "1,892", icon: "Users", color: "var(--kira-purple)" },
              { label: "Онлайн сейчас", val: "247", icon: "Wifi", color: "var(--kira-green)" },
              { label: "Персонажей", val: "4,210", icon: "Swords", color: "var(--kira-cyan)" },
              { label: "Сообщений/день", val: "18.4K", icon: "MessageSquare", color: "var(--kira-pink)" },
            ].map((s) => (
              <div key={s.label} className="kira-card rounded-xl p-4 text-center">
                <Icon name={s.icon} fallback="Circle" size={20} style={{ color: s.color, margin: "0 auto 8px" }} />
                <div className="font-orbitron text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                <div className="font-rajdhani text-xs text-kira-muted">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="kira-card rounded-xl p-4">
            <h3 className="font-orbitron text-xs text-kira-yellow mb-4" style={{ letterSpacing: "0.12em" }}>АКТИВНОСТЬ ЗА 7 ДНЕЙ</h3>
            <div className="flex items-end gap-1 h-24">
              {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${h}%`,
                    background: "linear-gradient(180deg, var(--kira-purple), rgba(155,93,229,0.3))",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                <span key={d} className="flex-1 text-center font-rajdhani text-xs text-kira-muted">{d}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* USERS */}
      {tab === "users" && (
        <div className="animate-fade-up space-y-3">
          <div className="flex gap-3 mb-4">
            <input className="kira-input flex-1 text-sm" placeholder="Поиск пользователя..." />
            <button className="btn-kira-outline px-4 py-2 rounded-lg text-sm flex items-center gap-1">
              <Icon name="Filter" size={13} /> Фильтр
            </button>
          </div>

          {users.map((u) => (
            <div key={u.name} className="kira-card rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl kira-avatar" style={{ background: "var(--kira-surface2)" }}>
                {u.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-rajdhani font-bold text-kira-text">{u.name}</span>
                  {u.role === "mod" && (
                    <span className="kira-badge" style={{ background: "rgba(0,187,249,0.1)", color: "var(--kira-cyan)", border: "1px solid rgba(0,187,249,0.3)" }}>МОД</span>
                  )}
                  <span
                    className="kira-badge"
                    style={
                      u.status === "active"
                        ? { background: "rgba(0,245,212,0.1)", color: "var(--kira-green)", border: "1px solid rgba(0,245,212,0.3)" }
                        : { background: "rgba(220,20,60,0.1)", color: "#FF6B6B", border: "1px solid rgba(220,20,60,0.3)" }
                    }
                  >
                    {u.status === "active" ? "Активен" : "Бан"}
                  </span>
                </div>
                <p className="font-rajdhani text-xs text-kira-muted">С {u.joined} · {u.chars} персонажа</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center btn-kira-outline text-xs">
                  <Icon name="Edit2" size={13} />
                </button>
                <button
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors"
                  style={{ border: "1px solid rgba(220,20,60,0.4)", color: "#FF6B6B", background: "rgba(220,20,60,0.08)" }}
                >
                  <Icon name="Ban" fallback="X" size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RACES & CLASSES */}
      {tab === "races" && (
        <div className="animate-fade-up grid md:grid-cols-2 gap-6">
          {/* Races */}
          <div>
            <h3 className="font-orbitron text-sm text-kira-purple mb-3" style={{ letterSpacing: "0.1em" }}>РАСЫ</h3>
            <div className="kira-card rounded-xl p-4 mb-3">
              <div className="flex flex-wrap gap-2 mb-4">
                {raceList.map((r) => (
                  <div key={r} className="flex items-center gap-1 kira-badge race-human" style={{ paddingRight: "4px" }}>
                    {r}
                    <button
                      className="ml-1 text-xs opacity-60 hover:opacity-100"
                      onClick={() => setRaceList(raceList.filter((x) => x !== r))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="kira-input flex-1 text-sm py-2"
                  placeholder="Новая раса..."
                  value={newRace}
                  onChange={(e) => setNewRace(e.target.value)}
                />
                <button
                  className="btn-kira-primary px-3 py-2 rounded-lg text-sm"
                  onClick={() => { if (newRace) { setRaceList([...raceList, newRace]); setNewRace(""); } }}
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Classes */}
          <div>
            <h3 className="font-orbitron text-sm text-kira-pink mb-3" style={{ letterSpacing: "0.1em" }}>КЛАССЫ</h3>
            <div className="kira-card rounded-xl p-4 mb-3">
              <div className="flex flex-wrap gap-2 mb-4">
                {classList.map((c) => (
                  <div key={c} className="flex items-center gap-1 kira-badge class-mage" style={{ paddingRight: "4px" }}>
                    {c}
                    <button
                      className="ml-1 text-xs opacity-60 hover:opacity-100"
                      onClick={() => setClassList(classList.filter((x) => x !== c))}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  className="kira-input flex-1 text-sm py-2"
                  placeholder="Новый класс..."
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                />
                <button
                  className="btn-kira-primary px-3 py-2 rounded-lg text-sm"
                  onClick={() => { if (newClass) { setClassList([...classList, newClass]); setNewClass(""); } }}
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BROADCAST */}
      {tab === "broadcast" && (
        <div className="animate-fade-up">
          <div className="kira-card rounded-xl p-4 mb-6">
            <h3 className="font-orbitron text-sm text-kira-cyan mb-3" style={{ letterSpacing: "0.1em" }}>НОВАЯ РАССЫЛКА</h3>
            <input className="kira-input text-sm mb-3" placeholder="Заголовок рассылки" />
            <textarea
              className="kira-input resize-none text-sm mb-3"
              rows={4}
              placeholder="Текст сообщения для всех пользователей..."
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
            />
            <div className="flex gap-3">
              <select className="kira-input text-sm flex-1 py-2" style={{ cursor: "pointer" }}>
                <option value="all">Всем пользователям</option>
                <option value="active">Только активным</option>
                <option value="chars">Владельцам персонажей</option>
              </select>
              <button className="btn-kira-cyan px-5 py-2 rounded-lg text-sm flex items-center gap-2 flex-shrink-0">
                <Icon name="Send" size={14} /> Отправить
              </button>
            </div>
          </div>

          <h3 className="font-orbitron text-xs text-kira-muted mb-3" style={{ letterSpacing: "0.12em" }}>ИСТОРИЯ РАССЫЛОК</h3>
          <div className="space-y-3">
            {broadcasts.map((b) => (
              <div key={b.title} className="kira-card rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: "rgba(0,187,249,0.1)", border: "1px solid rgba(0,187,249,0.2)" }}>📢</div>
                <div className="flex-1">
                  <p className="font-rajdhani font-bold text-sm text-kira-text">{b.title}</p>
                  <p className="font-rajdhani text-xs text-kira-muted">{b.date} · отправлено {b.sent} чел.</p>
                </div>
                <button className="btn-kira-outline px-3 py-1.5 rounded-lg text-xs">Повторить</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHANNELS */}
      {tab === "channels" && (
        <div className="animate-fade-up">
          <p className="font-rajdhani text-sm text-kira-muted mb-4">Управление каналами платформы</p>
          <div className="kira-card rounded-xl p-4 mb-4">
            <h3 className="font-orbitron text-xs text-kira-cyan mb-3" style={{ letterSpacing: "0.1em" }}>СОЗДАТЬ ОФИЦИАЛЬНЫЙ КАНАЛ</h3>
            <input className="kira-input text-sm mb-3" placeholder="Название канала..." />
            <textarea className="kira-input resize-none text-sm mb-3" rows={2} placeholder="Описание..." />
            <button className="btn-kira-cyan w-full py-2.5 rounded-lg text-sm">
              ✦ Создать официальный канал
            </button>
          </div>
          <div className="kira-card rounded-xl p-4">
            <p className="font-rajdhani text-xs text-kira-muted">Список всех каналов и управление ими появятся после интеграции с базой данных</p>
          </div>
        </div>
      )}
    </div>
  );
}
