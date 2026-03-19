import { useState } from "react";
import Icon from "@/components/ui/icon";

const channels = [
  { id: 1, name: "академия-магии", emoji: "🏫", members: 342, active: 28, desc: "РП в стенах магической академии. Студенты, преподаватели, интриги!", tags: ["Фэнтези", "Школа", "Магия"], color: "var(--kira-purple)" },
  { id: 2, name: "тёмный-лес", emoji: "🌲", members: 187, active: 12, desc: "Таинственный лес, полный монстров и древних секретов. 18+", tags: ["Хоррор", "Приключения"], color: "var(--kira-green)" },
  { id: 3, name: "небесный-флот", emoji: "⛵", members: 421, active: 54, desc: "Воздушные пираты и торговцы в эпоху пара и магии", tags: ["Стимпанк", "Морское RP"], color: "var(--kira-cyan)" },
  { id: 4, name: "клан-серебряный-туман", emoji: "🌫️", members: 89, active: 7, desc: "Закрытый клан для элитных РПшников. По приглашению", tags: ["Клан", "Закрытый"], color: "var(--kira-pink)" },
];

const channelMessages = [
  { user: "AkiraKun", avatar: "🦊", text: "*Акира входит в класс, поправляя мантию* Опять опоздала... надеюсь Профессор Мизуки не заметит", time: "14:30", raceTag: "Дух", raceStyle: "race-spirit" },
  { user: "MikuChan", avatar: "🌸", text: "*шепчет* Заметил. Он уже пять минут смотрит на дверь 😅 Садись быстрее!", time: "14:31", raceTag: "Эльф", raceStyle: "race-elf" },
  { user: "SystemBot", avatar: "🤖", text: "🎲 AkiraKun бросает кубик на Скрытность: **17** — Успех! Профессор не заметил.", time: "14:31", raceTag: "", raceStyle: "" },
  { user: "DarkNova", avatar: "🌑", text: "*наблюдает из-за книги* Интересно... а что будет, если я расскажу ему. *загадочно улыбается*", time: "14:32", raceTag: "Пустота", raceStyle: "race-void" },
];

export default function ChannelsPage() {
  const [view, setView] = useState<"list" | "channel" | "create">("list");
  const [activeChannel, setActiveChannel] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  const [newCh, setNewCh] = useState({ name: "", desc: "", type: "public" });

  const active = channels.find((c) => c.id === activeChannel);

  if (view === "create") {
    return (
      <div className="max-w-lg mx-auto pb-24 md:pb-6 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <button className="btn-kira-outline px-3 py-2 rounded-lg" onClick={() => setView("list")}>
            <Icon name="ArrowLeft" size={16} />
          </button>
          <h2 className="font-orbitron text-lg font-bold text-kira-cyan">Создать канал</h2>
        </div>

        <div className="kira-card rounded-xl p-5 space-y-4">
          <div>
            <label className="font-rajdhani text-xs text-kira-muted mb-1 block uppercase tracking-wider">Название канала</label>
            <input
              className="kira-input text-sm"
              placeholder="например: академия-магии"
              value={newCh.name}
              onChange={(e) => setNewCh({ ...newCh, name: e.target.value.toLowerCase().replace(/\s/g, "-") })}
            />
            {newCh.name && (
              <p className="font-rajdhani text-xs text-kira-purple mt-1"># {newCh.name}</p>
            )}
          </div>

          <div>
            <label className="font-rajdhani text-xs text-kira-muted mb-1 block uppercase tracking-wider">Описание</label>
            <textarea
              className="kira-input resize-none text-sm"
              rows={3}
              placeholder="О чём этот канал? Какой жанр РП?"
              value={newCh.desc}
              onChange={(e) => setNewCh({ ...newCh, desc: e.target.value })}
            />
          </div>

          <div>
            <label className="font-rajdhani text-xs text-kira-muted mb-2 block uppercase tracking-wider">Тип канала</label>
            <div className="grid grid-cols-2 gap-3">
              {["public", "private"].map((t) => (
                <button
                  key={t}
                  className="kira-card rounded-xl p-3 text-center"
                  style={newCh.type === t ? { borderColor: "var(--kira-cyan)", background: "rgba(0,187,249,0.08)" } : {}}
                  onClick={() => setNewCh({ ...newCh, type: t })}
                >
                  <div className="text-2xl mb-1">{t === "public" ? "🌐" : "🔒"}</div>
                  <p className="font-rajdhani font-semibold text-sm text-kira-text">{t === "public" ? "Публичный" : "Приватный"}</p>
                  <p className="font-rajdhani text-xs text-kira-muted">{t === "public" ? "Все могут зайти" : "По приглашению"}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn-kira-cyan w-full py-3 rounded-xl text-sm"
            disabled={!newCh.name || !newCh.desc}
            style={{ opacity: newCh.name && newCh.desc ? 1 : 0.5 }}
            onClick={() => setView("list")}
          >
            ✦ Создать канал
          </button>
        </div>
      </div>
    );
  }

  if (view === "channel" && active) {
    return (
      <div className="flex flex-col h-full" style={{ height: "calc(100vh - 80px)" }}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4" style={{ borderBottom: "1px solid var(--kira-border)", background: "var(--kira-surface)" }}>
          <button className="btn-kira-outline px-2 py-1 rounded-lg" onClick={() => setView("list")}>
            <Icon name="ArrowLeft" size={16} />
          </button>
          <span className="text-2xl">{active.emoji}</span>
          <div className="flex-1">
            <p className="font-rajdhani font-bold text-sm text-kira-text">#{active.name}</p>
            <p className="font-rajdhani text-xs text-kira-muted">{active.members} участников · {active.active} онлайн</p>
          </div>
          <div className="flex gap-2">
            <button className="btn-kira-outline px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
              <Icon name="Users" size={12} /> Участники
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {channelMessages.map((m, i) => (
            <div key={i} className="flex gap-3 animate-fade-up">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0 kira-avatar" style={{ background: "var(--kira-surface2)" }}>
                {m.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-rajdhani font-bold text-sm text-kira-text">{m.user}</span>
                  {m.raceTag && <span className={`kira-badge ${m.raceStyle}`}>{m.raceTag}</span>}
                  <span className="font-rajdhani text-xs text-kira-muted">{m.time}</span>
                </div>
                <div
                  className="font-rajdhani text-sm leading-relaxed px-3 py-2 rounded-xl"
                  style={{
                    background: m.user === "SystemBot" ? "rgba(254,228,64,0.05)" : "var(--kira-surface2)",
                    border: m.user === "SystemBot" ? "1px solid rgba(254,228,64,0.2)" : "1px solid var(--kira-border)",
                    color: m.user === "SystemBot" ? "var(--kira-yellow)" : "var(--kira-text)",
                  }}
                  dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 flex items-center gap-3" style={{ borderTop: "1px solid var(--kira-border)", background: "var(--kira-surface)" }}>
          <button className="text-kira-muted hover:text-kira-yellow transition-colors">
            <Icon name="Dices" fallback="Circle" size={18} />
          </button>
          <input
            className="kira-input flex-1 text-sm py-2"
            placeholder={`Сообщение в #${active.name}... *действие в звёздочках*`}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="w-9 h-9 rounded-lg flex items-center justify-center btn-kira-primary flex-shrink-0" disabled={!msg}>
            <Icon name="Send" size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6 animate-fade-up">
        <div>
          <h2 className="font-orbitron text-xl font-bold text-kira-cyan">Каналы</h2>
          <p className="font-rajdhani text-xs text-kira-muted">Коллективные РП-беседы</p>
        </div>
        <button className="btn-kira-cyan px-4 py-2 rounded-xl text-sm flex items-center gap-2" onClick={() => setView("create")}>
          <Icon name="Plus" size={14} /> Создать
        </button>
      </div>

      <div className="space-y-3">
        {channels.map((ch, i) => (
          <button
            key={ch.id}
            className={`kira-card rounded-xl p-4 w-full text-left animate-fade-up delay-${i * 100}`}
            onClick={() => { setActiveChannel(ch.id); setView("channel"); }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: "var(--kira-surface2)", border: `1px solid ${ch.color}33` }}
              >
                {ch.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-rajdhani font-bold text-kira-text">#{ch.name}</span>
                  <div className="flex items-center gap-1">
                    <div className="online-dot w-1.5 h-1.5" />
                    <span className="font-rajdhani text-xs" style={{ color: "var(--kira-green)" }}>{ch.active}</span>
                  </div>
                </div>
                <p className="font-rajdhani text-xs text-kira-muted mb-2 truncate">{ch.desc}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {ch.tags.map((t) => (
                    <span key={t} className="kira-badge" style={{ background: "rgba(255,255,255,0.04)", color: "var(--kira-muted)", border: "1px solid var(--kira-border)", fontSize: "0.6rem" }}>{t}</span>
                  ))}
                  <span className="ml-auto font-rajdhani text-xs text-kira-muted">{ch.members} чел.</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-kira-muted flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
