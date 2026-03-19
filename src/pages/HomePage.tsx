import Icon from "@/components/ui/icon";

const posts = [
  {
    id: 1,
    user: "AkiraKun",
    avatar: "🦊",
    race: "Лис-дух",
    raceClass: "race-spirit",
    charClass: "Заклинатель",
    charClassStyle: "class-summoner",
    level: 34,
    time: "5 мин",
    text: "Сегодня в RP провёл эпический бой с Драконом Пустоты. Моя лиса Кагура наконец получила новую форму! ✨ Кто хочет вступить в наш клан «Серебряный Туман»?",
    likes: 42,
    comments: 8,
    liked: false,
    image: null,
  },
  {
    id: 2,
    user: "MikuChan",
    avatar: "🌸",
    race: "Эльф",
    raceClass: "race-elf",
    charClass: "Целитель",
    charClassStyle: "class-healer",
    level: 21,
    time: "23 мин",
    text: "Открыла новый канал для RP в жанре «Академия магии» 🏫 Принимаем всех! Нужны студенты, преподаватели и немного злодеев 😈",
    likes: 89,
    comments: 31,
    liked: true,
    image: null,
  },
  {
    id: 3,
    user: "DarkNova",
    avatar: "🌑",
    race: "Пустота",
    raceClass: "race-void",
    charClass: "Воин",
    charClassStyle: "class-warrior",
    level: 67,
    time: "1 час",
    text: "Скачал крутое видео с TikTok для нашего RP — там идеальная BGM для финальной битвы. Кто ещё собирает плейлисты для своих сцен? 🎵⚔️",
    likes: 156,
    comments: 47,
    liked: false,
    image: null,
  },
];

const onlineUsers = [
  { name: "AkiraKun", avatar: "🦊", online: true },
  { name: "MikuChan", avatar: "🌸", online: true },
  { name: "ShadowX", avatar: "⚡", online: true },
  { name: "LunaRei", avatar: "🌙", online: false },
  { name: "FireSoul", avatar: "🔥", online: true },
];

interface HomePageProps {
  onNav: (id: string) => void;
}

export default function HomePage({ onNav }: HomePageProps) {
  return (
    <div className="flex gap-6 h-full">
      {/* Feed */}
      <div className="flex-1 overflow-y-auto pb-24 md:pb-6 space-y-4">
        {/* Hero banner */}
        <div
          className="rounded-xl p-6 relative overflow-hidden kira-panel-corner animate-fade-up"
          style={{
            background: "linear-gradient(135deg, rgba(155,93,229,0.15), rgba(241,91,181,0.08))",
            border: "1px solid var(--kira-border)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,187,249,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <p className="font-rajdhani text-xs text-kira-cyan mb-1" style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>
              ✦ Добро пожаловать в
            </p>
            <h1 className="font-orbitron text-4xl font-bold text-kira-purple text-glow-purple mb-2">
              KIRA
            </h1>
            <p className="font-rajdhani text-sm text-kira-muted mb-4">
              Аниме РП платформа нового поколения
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-kira-primary px-4 py-2 rounded-lg text-sm" onClick={() => onNav("characters")}>
                Создать персонажа
              </button>
              <button className="btn-kira-outline px-4 py-2 rounded-lg text-sm" onClick={() => onNav("channels")}>
                Найти РП
              </button>
            </div>
          </div>
        </div>

        {/* New post */}
        <div className="kira-card rounded-xl p-4 animate-fade-up delay-100">
          <div className="flex gap-3 items-start">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 kira-avatar"
              style={{ background: "var(--kira-surface2)" }}
            >
              😺
            </div>
            <div className="flex-1">
              <textarea
                className="kira-input resize-none text-sm"
                rows={2}
                placeholder="Поделись событиями из РП... ✨"
                style={{ minHeight: "60px" }}
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <button className="btn-kira-outline px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <Icon name="Image" size={12} /> Фото
                  </button>
                  <button className="btn-kira-outline px-3 py-1 rounded-lg text-xs flex items-center gap-1">
                    <Icon name="Film" size={12} /> Видео
                  </button>
                </div>
                <button className="btn-kira-primary px-4 py-1.5 rounded-lg text-xs">
                  Опубликовать
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        {posts.map((post, i) => (
          <div
            key={post.id}
            className={`kira-card rounded-xl p-4 animate-fade-up delay-${(i + 2) * 100}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0 kira-avatar"
                style={{ background: "var(--kira-surface2)" }}
              >
                {post.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-rajdhani font-bold text-kira-text">{post.user}</span>
                  <span className={`kira-badge ${post.raceClass}`}>{post.race}</span>
                  <span className={`kira-badge ${post.charClassStyle}`}>{post.charClass}</span>
                  <span className="kira-badge" style={{ background: "rgba(254,228,64,0.1)", color: "var(--kira-yellow)", border: "1px solid rgba(254,228,64,0.3)" }}>
                    Lv.{post.level}
                  </span>
                </div>
                <p className="text-xs text-kira-muted font-rajdhani">{post.time} назад</p>
              </div>
              <button className="text-kira-muted hover:text-kira-text">
                <Icon name="MoreHorizontal" size={16} />
              </button>
            </div>

            <p className="font-rajdhani text-sm leading-relaxed mb-4" style={{ color: "var(--kira-text)" }}>
              {post.text}
            </p>

            <div className="flex items-center gap-4 pt-3" style={{ borderTop: "1px solid var(--kira-border)" }}>
              <button
                className={`flex items-center gap-1.5 text-xs font-rajdhani font-semibold transition-all duration-200 ${post.liked ? "text-kira-pink" : "text-kira-muted hover:text-kira-pink"}`}
              >
                <Icon name={post.liked ? "Heart" : "Heart"} size={14} />
                {post.likes}
              </button>
              <button className="flex items-center gap-1.5 text-xs font-rajdhani font-semibold text-kira-muted hover:text-kira-cyan transition-colors">
                <Icon name="MessageCircle" size={14} />
                {post.comments}
              </button>
              <button className="flex items-center gap-1.5 text-xs font-rajdhani font-semibold text-kira-muted hover:text-kira-purple transition-colors">
                <Icon name="Share2" size={14} />
                Поделиться
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right sidebar - online */}
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="kira-card rounded-xl p-4 sticky top-0">
          <h3 className="font-orbitron text-xs text-kira-purple mb-3" style={{ letterSpacing: "0.15em" }}>
            ● ОНЛАЙН
          </h3>
          <div className="space-y-3">
            {onlineUsers.map((u) => (
              <div key={u.name} className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base"
                    style={{ background: "var(--kira-surface2)", border: "1px solid var(--kira-border)" }}
                  >
                    {u.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 ${u.online ? "online-dot" : "offline-dot"}`}
                  />
                </div>
                <span className="font-rajdhani text-sm font-semibold">{u.name}</span>
                {u.online && (
                  <span className="ml-auto text-xs text-kira-green font-rajdhani">онлайн</span>
                )}
              </div>
            ))}
          </div>

          <button className="btn-kira-outline w-full mt-4 py-2 rounded-lg text-xs" onClick={() => onNav("chats")}>
            Открыть чаты
          </button>
        </div>

        {/* Quick stats */}
        <div className="kira-card rounded-xl p-4 mt-4">
          <h3 className="font-orbitron text-xs text-kira-cyan mb-3" style={{ letterSpacing: "0.15em" }}>
            ★ АКТИВНОСТЬ
          </h3>
          {[
            { label: "Игроков онлайн", val: "247", color: "var(--kira-green)" },
            { label: "Активных РП", val: "38", color: "var(--kira-purple)" },
            { label: "Каналов", val: "124", color: "var(--kira-cyan)" },
          ].map((s) => (
            <div key={s.label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid var(--kira-border)" }}>
              <span className="font-rajdhani text-xs text-kira-muted">{s.label}</span>
              <span className="font-orbitron text-sm font-bold" style={{ color: s.color }}>{s.val}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
