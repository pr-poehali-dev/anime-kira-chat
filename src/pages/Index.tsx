import { useState } from "react";
import NavBar from "@/components/NavBar";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import CharactersPage from "./CharactersPage";
import ChatsPage from "./ChatsPage";
import ChannelsPage from "./ChannelsPage";
import VideosPage from "./VideosPage";
import MusicPage from "./MusicPage";
import AdminPage from "./AdminPage";
import AuthModal from "@/components/AuthModal";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [page, setPage] = useState("home");
  const [authed, setAuthed] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  if (!authed) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "var(--kira-bg)" }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: "10%", left: "15%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(155,93,229,0.12) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "15%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(241,91,181,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,187,249,0.04) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: "linear-gradient(rgba(155,93,229,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(155,93,229,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 text-center px-6 animate-fade-up">
          {/* Logo */}
          <div className="mb-8">
            <h1
              className="font-orbitron text-7xl md:text-9xl font-black text-kira-purple text-glow-purple mb-2"
              style={{ letterSpacing: "0.1em" }}
            >
              KIRA
            </h1>
            <p className="font-rajdhani text-kira-pink text-lg" style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}>
              ✦ Аниме РП Платформа ✦
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-xl mx-auto">
            {[
              { emoji: "⚔️", label: "РП Чаты" },
              { emoji: "🐉", label: "Персонажи" },
              { emoji: "📹", label: "TikTok" },
              { emoji: "🎵", label: "Музыка" },
            ].map((f) => (
              <div
                key={f.label}
                className="kira-card rounded-xl p-3 text-center"
              >
                <div className="text-2xl mb-1">{f.emoji}</div>
                <p className="font-rajdhani text-xs text-kira-muted">{f.label}</p>
              </div>
            ))}
          </div>

          {/* Auth buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              className="btn-kira-primary px-8 py-4 rounded-xl text-base flex items-center gap-2 justify-center"
              onClick={() => { setShowAuth(true); }}
            >
              <span>⚡</span> Войти через Google
            </button>
            <button
              className="btn-kira-outline px-8 py-4 rounded-xl text-base"
              onClick={() => setAuthed(true)}
            >
              Войти как гость
            </button>
          </div>

          <p className="font-rajdhani text-xs text-kira-muted">
            Регистрируясь, вы принимаете правила платформы
          </p>
        </div>

        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onAuth={() => { setAuthed(true); setShowAuth(false); }}
          />
        )}
      </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage onNav={setPage} />;
      case "profile": return <ProfilePage />;
      case "characters": return <CharactersPage />;
      case "chats": return <ChatsPage />;
      case "channels": return <ChannelsPage />;
      case "videos": return <VideosPage />;
      case "music": return <MusicPage />;
      case "admin": return <AdminPage />;
      default: return <HomePage onNav={setPage} />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--kira-bg)" }}>
      <NavBar active={page} onNav={setPage} isAdmin={true} />

      {/* Main content */}
      <main className="flex-1 md:ml-20 overflow-hidden">
        {/* Top bar */}
        <header
          className="sticky top-0 z-40 flex items-center justify-between px-5 py-3"
          style={{ background: "rgba(8,11,20,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--kira-border)" }}
        >
          <div className="flex items-center gap-3">
            <span className="font-orbitron font-bold text-kira-purple md:hidden text-glow-purple">KIRA</span>
            <span className="font-rajdhani text-sm text-kira-muted capitalize hidden md:block">
              {page === "home" ? "Лента" : page === "profile" ? "Профиль" : page === "characters" ? "Персонажи" : page === "chats" ? "Чаты" : page === "channels" ? "Каналы" : page === "videos" ? "Видео" : page === "music" ? "Музыка" : "Админ-панель"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center text-kira-muted hover:text-kira-text transition-colors">
              <Icon name="Search" size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-kira-muted hover:text-kira-pink transition-colors relative">
              <Icon name="Bell" size={16} />
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ background: "var(--kira-pink)" }} />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-base kira-avatar"
              style={{ background: "var(--kira-surface)" }}
              onClick={() => setPage("profile")}
            >
              🐉
            </button>
          </div>
        </header>

        {/* Page content */}
        <div className={`p-4 md:p-6 ${page === "chats" ? "h-screen overflow-hidden" : "min-h-screen"}`}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
