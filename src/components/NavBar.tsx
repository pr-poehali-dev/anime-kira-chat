import Icon from "@/components/ui/icon";

const navItems = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "chats", label: "Чаты", icon: "MessageSquare" },
  { id: "channels", label: "Каналы", icon: "Hash" },
  { id: "characters", label: "Персы", icon: "Swords" },
  { id: "videos", label: "Видео", icon: "Video" },
  { id: "music", label: "Музыка", icon: "Music" },
  { id: "profile", label: "Профиль", icon: "User" },
];

interface NavBarProps {
  active: string;
  onNav: (id: string) => void;
  isAdmin?: boolean;
}

export default function NavBar({ active, onNav, isAdmin }: NavBarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 h-full w-20 z-50 items-center py-6 gap-2"
        style={{ background: "var(--kira-surface)", borderRight: "1px solid var(--kira-border)" }}
      >
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center">
          <span
            className="font-orbitron font-bold text-lg text-kira-purple text-glow-purple"
            style={{ letterSpacing: "0.05em" }}
          >
            K
          </span>
          <span className="font-orbitron text-xs text-kira-pink" style={{ fontSize: "0.55rem", letterSpacing: "0.2em" }}>
            IRA
          </span>
        </div>

        <div className="flex flex-col gap-1 flex-1 w-full px-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item w-full ${active === item.id ? "active" : ""}`}
              onClick={() => onNav(item.id)}
            >
              <Icon name={item.icon} fallback="Circle" size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {isAdmin && (
          <button
            className={`nav-item w-full mx-2 ${active === "admin" ? "active" : ""}`}
            onClick={() => onNav("admin")}
            style={{ color: active === "admin" ? "var(--kira-yellow)" : undefined }}
          >
            <Icon name="ShieldCheck" fallback="Shield" size={20} />
            <span>Админ</span>
          </button>
        )}

        {/* Settings */}
        <button className="nav-item mx-2" onClick={() => onNav("profile")}>
          <Icon name="Settings" size={18} />
        </button>
      </aside>

      {/* Mobile bottom bar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2"
        style={{
          background: "var(--kira-surface)",
          borderTop: "1px solid var(--kira-border)",
          paddingBottom: "env(safe-area-inset-bottom, 8px)",
        }}
      >
        {navItems.slice(0, 5).map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => onNav(item.id)}
          >
            <Icon name={item.icon} fallback="Circle" size={20} />
            <span>{item.label}</span>
          </button>
        ))}
        {isAdmin && (
          <button
            className={`nav-item ${active === "admin" ? "active" : ""}`}
            onClick={() => onNav("admin")}
            style={{ color: active === "admin" ? "var(--kira-yellow)" : undefined }}
          >
            <Icon name="ShieldCheck" fallback="Shield" size={20} />
            <span>Админ</span>
          </button>
        )}
      </nav>
    </>
  );
}
