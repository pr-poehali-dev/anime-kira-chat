import Icon from "@/components/ui/icon";

interface AuthModalProps {
  onClose: () => void;
  onAuth: () => void;
}

export default function AuthModal({ onClose, onAuth }: AuthModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      style={{ background: "rgba(8,11,20,0.92)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <div
        className="kira-card rounded-2xl p-8 w-full max-w-sm animate-fade-up kira-panel-corner"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "1px solid rgba(155,93,229,0.4)" }}
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="font-orbitron text-3xl font-black text-kira-purple text-glow-purple mb-1">KIRA</h2>
          <p className="font-rajdhani text-xs text-kira-muted" style={{ letterSpacing: "0.2em", textTransform: "uppercase" }}>Аниме РП Платформа</p>
        </div>

        <h3 className="font-rajdhani font-bold text-center text-kira-text mb-6">Войди или зарегистрируйся</h3>

        {/* Google */}
        <button
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl mb-3 font-rajdhani font-semibold text-sm transition-all duration-300"
          style={{ background: "white", color: "#1a1a1a", border: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,255,255,0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          onClick={onAuth}
        >
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"/>
              <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"/>
              <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"/>
              <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"/>
            </svg>
          </div>
          Продолжить с Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px" style={{ background: "var(--kira-border)" }} />
          <span className="font-rajdhani text-xs text-kira-muted">или</span>
          <div className="flex-1 h-px" style={{ background: "var(--kira-border)" }} />
        </div>

        {/* Email */}
        <div className="space-y-3 mb-4">
          <input className="kira-input text-sm" placeholder="Email" type="email" />
          <input className="kira-input text-sm" placeholder="Пароль" type="password" />
        </div>

        <button
          className="btn-kira-primary w-full py-3 rounded-xl text-sm mb-3"
          onClick={onAuth}
        >
          Войти
        </button>

        <button
          className="btn-kira-outline w-full py-3 rounded-xl text-sm"
          onClick={onAuth}
        >
          Зарегистрироваться
        </button>

        <button
          className="absolute top-4 right-4 text-kira-muted hover:text-kira-text transition-colors"
          onClick={onClose}
        >
          <Icon name="X" size={18} />
        </button>
      </div>
    </div>
  );
}
