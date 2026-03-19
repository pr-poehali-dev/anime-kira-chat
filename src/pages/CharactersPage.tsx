import { useState } from "react";
import Icon from "@/components/ui/icon";

const races = [
  { id: "human", name: "Человек", emoji: "👤", desc: "Универсальные бойцы с высоким потенциалом", style: "race-human" },
  { id: "demon", name: "Демон", emoji: "😈", desc: "Тёмная сила и высокий урон. Слабы к святому", style: "race-demon" },
  { id: "elf", name: "Эльф", emoji: "🧝", desc: "Грация и магия природы. Долгожители", style: "race-elf" },
  { id: "dragon", name: "Дракон", emoji: "🐉", desc: "Легендарная раса. Невероятная мощь и броня", style: "race-dragon" },
  { id: "spirit", name: "Дух", emoji: "👻", desc: "Существа из эфира. Мастера иллюзий", style: "race-spirit" },
  { id: "void", name: "Пустота", emoji: "🌑", desc: "Таинственная раса. Поглощают энергию врагов", style: "race-void" },
];

const classes = [
  { id: "warrior", name: "Воин", emoji: "⚔️", desc: "Меч и щит — его закон. Танк на поле боя", style: "class-warrior" },
  { id: "mage", name: "Маг", emoji: "🔮", desc: "Повелитель стихий. Высокий урон, слабая защита", style: "class-mage" },
  { id: "rogue", name: "Плут", emoji: "🗡️", desc: "Тень и обман. Критические удары из тени", style: "class-rogue" },
  { id: "healer", name: "Целитель", emoji: "💚", desc: "Поддержка команды. Снимает негативные эффекты", style: "class-healer" },
  { id: "archer", name: "Лучник", emoji: "🏹", desc: "Дальний бой и ловушки. Лёгкий на подъём", style: "class-archer" },
  { id: "summoner", name: "Заклинатель", emoji: "✨", desc: "Вызывает духов и фамильяров на помощь", style: "class-summoner" },
];

const myChars = [
  { name: "Асуки-Дракон", emoji: "🐉", race: "Дракон", raceStyle: "race-dragon", cls: "Маг", clsStyle: "class-mage", level: 45, exp: 62, desc: "Молчаливый маг с тёмным прошлым. Ищет утерянный артефакт." },
  { name: "КагураЛис", emoji: "🦊", race: "Дух", raceStyle: "race-spirit", cls: "Заклинатель", clsStyle: "class-summoner", level: 28, exp: 35, desc: "Озорная лисица с девятью хвостами. Любит розыгрыши и сладости." },
];

export default function CharactersPage() {
  const [view, setView] = useState<"list" | "create">("list");
  const [step, setStep] = useState(1);
  const [newChar, setNewChar] = useState({ name: "", race: "", cls: "", backstory: "" });

  if (view === "create") {
    return (
      <div className="max-w-2xl mx-auto pb-24 md:pb-6 animate-fade-up">
        <div className="flex items-center gap-3 mb-6">
          <button className="btn-kira-outline px-3 py-2 rounded-lg" onClick={() => { setView("list"); setStep(1); }}>
            <Icon name="ArrowLeft" size={16} />
          </button>
          <h2 className="font-orbitron text-lg font-bold text-kira-purple">Создать персонажа</h2>
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-orbitron font-bold transition-all duration-300"
                style={{
                  background: step >= s ? "linear-gradient(135deg, var(--kira-purple), var(--kira-pink))" : "var(--kira-surface2)",
                  color: step >= s ? "white" : "var(--kira-muted)",
                  border: step >= s ? "none" : "1px solid var(--kira-border)",
                }}
              >
                {s}
              </div>
              {s < 3 && <div className="flex-1 h-px" style={{ background: step > s ? "var(--kira-purple)" : "var(--kira-border)" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-up">
            <h3 className="font-orbitron text-sm text-kira-cyan mb-1" style={{ letterSpacing: "0.1em" }}>ШАГ 1 — ИМЯ ПЕРСОНАЖА</h3>
            <p className="font-rajdhani text-xs text-kira-muted mb-4">Дай имя своему герою</p>
            <input
              className="kira-input text-base mb-6"
              placeholder="Введи имя персонажа..."
              value={newChar.name}
              onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
            />
            <button
              className="btn-kira-primary w-full py-3 rounded-xl text-sm"
              disabled={!newChar.name}
              onClick={() => setStep(2)}
              style={{ opacity: newChar.name ? 1 : 0.5 }}
            >
              Далее →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up">
            <h3 className="font-orbitron text-sm text-kira-cyan mb-1" style={{ letterSpacing: "0.1em" }}>ШАГ 2 — РАСА И КЛАСС</h3>
            <p className="font-rajdhani text-xs text-kira-muted mb-4">Выбери расу и класс персонажа</p>

            <p className="font-rajdhani font-semibold text-sm mb-2 text-kira-purple">Раса</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {races.map((r) => (
                <button
                  key={r.id}
                  className="kira-card rounded-xl p-3 text-left transition-all duration-200"
                  style={newChar.race === r.id ? { borderColor: "var(--kira-purple)", background: "rgba(155,93,229,0.1)" } : {}}
                  onClick={() => setNewChar({ ...newChar, race: r.id })}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{r.emoji}</span>
                    <span className={`kira-badge ${r.style}`}>{r.name}</span>
                  </div>
                  <p className="font-rajdhani text-xs text-kira-muted">{r.desc}</p>
                </button>
              ))}
            </div>

            <p className="font-rajdhani font-semibold text-sm mb-2 text-kira-pink">Класс</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {classes.map((c) => (
                <button
                  key={c.id}
                  className="kira-card rounded-xl p-3 text-left"
                  style={newChar.cls === c.id ? { borderColor: "var(--kira-pink)", background: "rgba(241,91,181,0.1)" } : {}}
                  onClick={() => setNewChar({ ...newChar, cls: c.id })}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{c.emoji}</span>
                    <span className={`kira-badge ${c.style}`}>{c.name}</span>
                  </div>
                  <p className="font-rajdhani text-xs text-kira-muted">{c.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="btn-kira-outline px-6 py-3 rounded-xl text-sm flex-1" onClick={() => setStep(1)}>← Назад</button>
              <button
                className="btn-kira-primary py-3 rounded-xl text-sm flex-1"
                disabled={!newChar.race || !newChar.cls}
                onClick={() => setStep(3)}
                style={{ opacity: newChar.race && newChar.cls ? 1 : 0.5 }}
              >
                Далее →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up">
            <h3 className="font-orbitron text-sm text-kira-cyan mb-1" style={{ letterSpacing: "0.1em" }}>ШАГ 3 — ПРЕДЫСТОРИЯ</h3>
            <p className="font-rajdhani text-xs text-kira-muted mb-4">Расскажи историю своего персонажа</p>
            <textarea
              className="kira-input resize-none mb-6"
              rows={5}
              placeholder="Опиши характер, прошлое, мотивы персонажа..."
              value={newChar.backstory}
              onChange={(e) => setNewChar({ ...newChar, backstory: e.target.value })}
            />

            {/* Preview */}
            <div className="kira-card rounded-xl p-4 mb-6" style={{ border: "1px solid var(--kira-purple)" }}>
              <p className="font-orbitron text-xs text-kira-muted mb-2">ПРЕДПРОСМОТР</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-kira-surface2 flex items-center justify-center text-2xl kira-avatar">
                  {races.find((r) => r.id === newChar.race)?.emoji || "❓"}
                </div>
                <div>
                  <p className="font-orbitron font-bold text-kira-text">{newChar.name || "Имя персонажа"}</p>
                  <div className="flex gap-1 mt-1">
                    {newChar.race && <span className={`kira-badge ${races.find((r) => r.id === newChar.race)?.style}`}>{races.find((r) => r.id === newChar.race)?.name}</span>}
                    {newChar.cls && <span className={`kira-badge ${classes.find((c) => c.id === newChar.cls)?.style}`}>{classes.find((c) => c.id === newChar.cls)?.name}</span>}
                    <span className="kira-badge" style={{ background: "rgba(254,228,64,0.1)", color: "var(--kira-yellow)", border: "1px solid rgba(254,228,64,0.3)" }}>Lv.1</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-kira-outline px-6 py-3 rounded-xl text-sm flex-1" onClick={() => setStep(2)}>← Назад</button>
              <button className="btn-kira-primary py-3 rounded-xl text-sm flex-1" onClick={() => setView("list")}>
                ✦ Создать персонажа
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-6">
      <div className="flex items-center justify-between mb-6 animate-fade-up">
        <div>
          <h2 className="font-orbitron text-xl font-bold text-kira-purple">Персонажи</h2>
          <p className="font-rajdhani text-xs text-kira-muted">Твои ролевые альтер-эго</p>
        </div>
        <button className="btn-kira-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2" onClick={() => setView("create")}>
          <Icon name="Plus" size={14} /> Создать
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {myChars.map((ch, i) => (
          <div key={ch.name} className={`kira-card rounded-xl p-5 animate-fade-up delay-${(i + 1) * 100}`}>
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl kira-avatar flex-shrink-0"
                style={{ background: "var(--kira-surface2)" }}
              >
                {ch.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-orbitron font-bold text-kira-text">{ch.name}</h3>
                  <span className={`kira-badge ${ch.raceStyle}`}>{ch.race}</span>
                  <span className={`kira-badge ${ch.clsStyle}`}>{ch.cls}</span>
                </div>
                <p className="font-rajdhani text-sm text-kira-muted mb-3">{ch.desc}</p>
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="font-rajdhani text-xs text-kira-muted">Lv.{ch.level}</span>
                    <span className="font-orbitron text-xs text-kira-purple">{ch.exp}%</span>
                  </div>
                  <div className="level-bar-bg">
                    <div className="level-bar-fill" style={{ width: `${ch.exp}%` }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3 pt-3" style={{ borderTop: "1px solid var(--kira-border)" }}>
              <button className="btn-kira-outline px-3 py-1.5 rounded-lg text-xs flex-1">Редактировать</button>
              <button className="btn-kira-primary px-3 py-1.5 rounded-lg text-xs flex-1">Играть</button>
            </div>
          </div>
        ))}
      </div>

      {/* Races & Classes reference */}
      <div className="kira-card rounded-xl p-4 animate-fade-up delay-300">
        <h3 className="font-orbitron text-sm text-kira-cyan mb-4" style={{ letterSpacing: "0.1em" }}>СПРАВОЧНИК РАС И КЛАССОВ</h3>
        <div className="flex gap-2 flex-wrap">
          {races.map((r) => (
            <span key={r.id} className={`kira-badge ${r.style} cursor-pointer`}>{r.emoji} {r.name}</span>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap mt-2">
          {classes.map((c) => (
            <span key={c.id} className={`kira-badge ${c.style} cursor-pointer`}>{c.emoji} {c.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
