import { useState } from "react";
import Icon from "@/components/ui/icon";

const services = [
  {
    num: "01",
    title: "Стратегия",
    desc: "Глубокое погружение в бизнес-контекст, анализ рынка и создание цифровой стратегии, которая работает.",
    icon: "Compass",
  },
  {
    num: "02",
    title: "Дизайн",
    desc: "Визуальные системы с характером. От айдентики до интерфейсов — всё подчинено единой идее.",
    icon: "Layers",
  },
  {
    num: "03",
    title: "Разработка",
    desc: "Технологии без компромиссов. Быстро, надёжно, масштабируемо — готово к любым нагрузкам.",
    icon: "Code2",
  },
  {
    num: "04",
    title: "Запуск",
    desc: "Выводим продукт в мир: от настройки аналитики до первых тысяч пользователей.",
    icon: "Rocket",
  },
];

const cases = [
  { tag: "Маркетплейс", title: "Nova Market", year: "2024", color: "#1A1510" },
  { tag: "SaaS платформа", title: "Orbit Analytics", year: "2024", color: "#0E1318" },
  { tag: "Мобильное приложение", title: "Pulse Health", year: "2023", color: "#131018" },
];

const stats = [
  { value: "7+", label: "лет опыта" },
  { value: "120+", label: "проектов" },
  { value: "98%", label: "клиентов вернулись" },
  { value: "40+", label: "наград" },
];

export default function Index() {
  const [activeCase, setActiveCase] = useState(0);

  return (
    <div className="grain-overlay min-h-screen" style={{ backgroundColor: "var(--dark-bg)", color: "var(--text-primary)" }}>
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid var(--dark-border)", backgroundColor: "rgba(12,10,8,0.85)", backdropFilter: "blur(12px)" }}>
        <div className="animate-fade-in">
          <span className="font-display text-xl tracking-widest text-gold" style={{ letterSpacing: "0.2em" }}>СТУДИЯ</span>
        </div>
        <div className="hidden md:flex items-center gap-8 animate-fade-in delay-100">
          {["Услуги", "Работы", "О нас", "Контакты"].map((item) => (
            <a key={item} href="#" className="font-body text-sm tracking-wider transition-colors duration-300 hover:text-gold" style={{ color: "var(--text-secondary)", letterSpacing: "0.08em", fontSize: "0.75rem", textTransform: "uppercase" }}>
              {item}
            </a>
          ))}
        </div>
        <button className="btn-gold px-6 py-2.5 animate-fade-in delay-200">
          Начать проект
        </button>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-end pb-20 px-8 pt-32 relative overflow-hidden">
        {/* Background mesh */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none" style={{
          background: "radial-gradient(ellipse 60% 60% at 80% 30%, rgba(201,169,110,0.06) 0%, transparent 70%)"
        }} />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 80% at 20% 80%, rgba(201,169,110,0.04) 0%, transparent 70%)"
        }} />

        {/* Vertical label */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col items-center gap-4">
            <div style={{ width: "1px", height: "80px", backgroundColor: "var(--dark-border)" }} className="animate-fade-in delay-700" />
            <span className="font-body text-xs tracking-widest animate-fade-in delay-800" style={{ color: "var(--text-secondary)", writingMode: "vertical-rl", letterSpacing: "0.2em", fontSize: "0.65rem", textTransform: "uppercase" }}>
              Скролл вниз
            </span>
            <div style={{ width: "1px", height: "40px", backgroundColor: "var(--dark-border)" }} className="animate-fade-in delay-800" />
          </div>
        </div>

        <div className="max-w-6xl">
          <div className="mb-4 animate-fade-up delay-100">
            <span className="font-body text-xs tracking-widest text-gold" style={{ letterSpacing: "0.25em", textTransform: "uppercase" }}>
              — Цифровая студия
            </span>
          </div>
          <h1 className="font-display animate-fade-up delay-200" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)", lineHeight: "0.95", fontWeight: 300, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
            Создаём<br />
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}>цифровые</em><br />
            продукты
          </h1>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-8 animate-fade-up delay-300">
            <p className="font-body max-w-sm" style={{ color: "var(--text-secondary)", lineHeight: 1.7, fontSize: "1rem" }}>
              Мы превращаем сложные идеи в элегантные цифровые решения. Стратегия, дизайн и технологии в одном месте.
            </p>
            <div className="flex items-center gap-4 ml-auto">
              <button className="btn-gold px-8 py-4 text-sm">
                Обсудить проект
              </button>
              <button className="btn-outline-gold px-8 py-4 text-sm">
                Наши работы
              </button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 pt-8 grid grid-cols-2 md:grid-cols-4 gap-0 animate-fade-up delay-400" style={{ borderTop: "1px solid var(--dark-border)" }}>
          {stats.map((stat, i) => (
            <div key={i} className="py-6 pr-8" style={{ borderRight: i < 3 ? "1px solid var(--dark-border)" : "none" }}>
              <div className="font-display text-4xl font-light text-gold mb-1">{stat.value}</div>
              <div className="font-body text-xs tracking-widest" style={{ color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.12em" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-8 py-28" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="font-body text-xs tracking-widest text-gold mb-3" style={{ letterSpacing: "0.25em", textTransform: "uppercase" }}>
                — Что мы делаем
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1 }}>
                Услуги
              </h2>
            </div>
            <p className="font-body max-w-xs" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              Полный цикл создания цифрового продукта — от первой идеи до живого сервиса.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--dark-border)" }}>
            {services.map((s, i) => (
              <div key={i} className="card-hover p-10 flex flex-col gap-6" style={{ backgroundColor: "var(--dark-surface)", border: "1px solid transparent" }}>
                <div className="flex items-start justify-between">
                  <span className="font-display text-6xl font-light" style={{ color: "var(--dark-border)", lineHeight: 1 }}>{s.num}</span>
                  <div className="p-3 rounded-full" style={{ border: "1px solid var(--dark-border)" }}>
                    <Icon name={s.icon} fallback="Star" size={18} style={{ color: "var(--gold)" }} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-light mb-3">{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
                </div>
                <div className="mt-auto">
                  <a href="#" className="inline-flex items-center gap-2 font-body text-xs tracking-wider text-gold transition-all duration-300 hover:gap-4" style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    Подробнее <Icon name="ArrowRight" size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="px-8 py-28" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-body text-xs tracking-widest text-gold mb-3" style={{ letterSpacing: "0.25em", textTransform: "uppercase" }}>
              — Портфолио
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1 }}>
              Избранные работы
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cases.map((c, i) => (
              <div
                key={i}
                className="relative overflow-hidden cursor-pointer group"
                style={{ height: "400px", backgroundColor: c.color, border: "1px solid var(--dark-border)", transition: "border-color 0.3s ease" }}
                onMouseEnter={() => setActiveCase(i)}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 transition-opacity duration-500" style={{
                  background: `radial-gradient(ellipse 80% 80% at 50% 120%, rgba(201,169,110,0.12) 0%, transparent 70%)`,
                  opacity: activeCase === i ? 1 : 0
                }} />

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 transition-all duration-500 group-hover:w-24 group-hover:h-24" style={{
                  background: "linear-gradient(135deg, transparent 50%, rgba(201,169,110,0.08) 50%)"
                }} />

                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs tracking-widest" style={{ color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{c.tag}</span>
                    <span className="font-body text-xs" style={{ color: "var(--text-secondary)" }}>{c.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-light mb-4" style={{ lineHeight: 1.1 }}>{c.title}</h3>
                    <div className="flex items-center gap-2 font-body text-xs text-gold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ textTransform: "uppercase", letterSpacing: "0.12em" }}>
                      Смотреть <Icon name="ArrowUpRight" size={14} />
                    </div>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: "var(--gold)" }} />
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="btn-outline-gold px-10 py-4 text-sm">
              Все проекты
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT / MANIFESTO */}
      <section className="px-8 py-28 relative overflow-hidden" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(201,169,110,0.04) 0%, transparent 70%)"
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="font-body text-xs tracking-widest text-gold mb-8" style={{ letterSpacing: "0.25em", textTransform: "uppercase" }}>
            — Манифест
          </p>
          <blockquote className="font-display" style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", fontWeight: 300, lineHeight: 1.25, color: "var(--text-primary)" }}>
            «Мы верим, что отличный дизайн — это не украшение, а{" "}
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>инструмент роста</em>{" "}
            для бизнеса»
          </blockquote>
          <div className="mt-10 flex items-center justify-center gap-4">
            <div style={{ width: "40px", height: "1px", backgroundColor: "var(--dark-border)" }} />
            <span className="font-body text-xs" style={{ color: "var(--text-secondary)" }}>Алексей Морозов, Основатель</span>
            <div style={{ width: "40px", height: "1px", backgroundColor: "var(--dark-border)" }} />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-8 py-28" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="font-body text-xs tracking-widest text-gold mb-3" style={{ letterSpacing: "0.25em", textTransform: "uppercase" }}>
              — Как мы работаем
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 300, lineHeight: 1 }}>
              Процесс
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { n: "1", t: "Брифинг", d: "Погружаемся в задачу, изучаем конкурентов, формулируем цели и метрики успеха." },
              { n: "2", t: "Создание", d: "Итерируем быстро: концепции, прототипы, тесты. Вы видите процесс каждый день." },
              { n: "3", t: "Запуск", d: "Деплоим, настраиваем аналитику и остаёмся рядом после старта." },
            ].map((step, i) => (
              <div key={i} className="relative p-10" style={{ borderRight: i < 2 ? "1px solid var(--dark-border)" : "none" }}>
                <div className="font-display text-7xl font-light text-gold mb-6" style={{ opacity: 0.2, lineHeight: 1 }}>{step.n}</div>
                <h3 className="font-display text-2xl font-light mb-3">{step.t}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-28 relative overflow-hidden" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)"
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="font-body text-xs tracking-widest text-gold mb-6" style={{ letterSpacing: "0.25em", textTransform: "uppercase" }}>
            — Начнём?
          </p>
          <h2 className="font-display mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, lineHeight: 1.1 }}>
            Готовы создать что-то<br />
            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>по-настоящему особенное?</em>
          </h2>
          <p className="font-body mb-10 mx-auto max-w-md" style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
            Расскажите нам о вашем проекте. Мы ответим в течение 24 часов и предложим план действий.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-gold px-10 py-4 text-sm w-full sm:w-auto">
              Написать нам
            </button>
            <button className="btn-outline-gold px-10 py-4 text-sm w-full sm:w-auto">
              <span className="flex items-center gap-2 justify-center">
                <Icon name="Phone" size={14} />
                Позвонить
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-12" style={{ borderTop: "1px solid var(--dark-border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-display text-xl tracking-widest text-gold" style={{ letterSpacing: "0.2em" }}>СТУДИЯ</span>
            <p className="font-body text-xs mt-2" style={{ color: "var(--text-secondary)" }}>Цифровая студия полного цикла</p>
          </div>
          <div className="flex items-center gap-8">
            {["Telegram", "Behance", "LinkedIn"].map((social) => (
              <a key={social} href="#" className="font-body text-xs tracking-wider transition-colors duration-300 hover:text-gold" style={{ color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {social}
              </a>
            ))}
          </div>
          <p className="font-body text-xs" style={{ color: "var(--text-secondary)" }}>
            © 2024 Студия. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}