import { useState } from "react";
import Icon from "@/components/ui/icon";

const videos = [
  { id: 1, title: "Финальная битва — Арка Демона", user: "DarkNova", avatar: "🌑", views: "12.4K", likes: 543, duration: "3:21", emoji: "⚔️", tag: "Баттл РП" },
  { id: 2, title: "Романтическая сцена в Академии 🌸", user: "MikuChan", avatar: "🌸", views: "8.7K", likes: 892, duration: "2:05", emoji: "💕", tag: "Романтика" },
  { id: 3, title: "Открытие нового навыка — Лисий Огонь", user: "AkiraKun", avatar: "🦊", views: "21.1K", likes: 1204, duration: "1:47", emoji: "🔥", tag: "Аниме моменты" },
  { id: 4, title: "Лучшие РП-моменты недели #42", user: "KiraAdmin", avatar: "👑", views: "45K", likes: 3201, duration: "8:12", emoji: "✨", tag: "Подборка" },
];

export default function VideosPage() {
  const [url, setUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = () => {
    if (!url) return;
    setDownloading(true);
    setTimeout(() => { setDownloading(false); setDone(true); setTimeout(() => setDone(false), 3000); }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-6">
      <div className="mb-6 animate-fade-up">
        <h2 className="font-orbitron text-xl font-bold text-kira-pink">Видео</h2>
        <p className="font-rajdhani text-xs text-kira-muted">Видео сцены и TikTok для РП</p>
      </div>

      {/* TikTok downloader */}
      <div
        className="rounded-xl p-5 mb-6 animate-fade-up delay-100 kira-panel-corner"
        style={{ background: "linear-gradient(135deg, rgba(241,91,181,0.08), rgba(155,93,229,0.06))", border: "1px solid rgba(241,91,181,0.25)" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🎵</span>
          <div>
            <p className="font-orbitron text-sm font-bold text-kira-pink">TikTok Загрузчик</p>
            <p className="font-rajdhani text-xs text-kira-muted">Скачивай видео без водяного знака</p>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <input
            className="kira-input flex-1 text-sm"
            placeholder="Вставь ссылку на TikTok видео..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className={`px-4 py-2 rounded-lg text-sm font-rajdhani font-semibold flex items-center gap-2 flex-shrink-0 transition-all duration-300 ${downloading ? "opacity-70" : ""}`}
            style={{ background: "linear-gradient(135deg, #FF0050, #9B5DE5)", color: "white" }}
            onClick={handleDownload}
            disabled={downloading || !url}
          >
            {downloading ? (
              <>
                <Icon name="Loader2" size={14} className="animate-spin" /> Загрузка...
              </>
            ) : (
              <>
                <Icon name="Download" size={14} /> Скачать
              </>
            )}
          </button>
        </div>

        {done && (
          <div
            className="flex items-center gap-2 p-3 rounded-lg animate-fade-up"
            style={{ background: "rgba(0,245,212,0.1)", border: "1px solid rgba(0,245,212,0.3)" }}
          >
            <Icon name="CheckCircle" size={16} style={{ color: "var(--kira-green)" }} />
            <span className="font-rajdhani text-sm" style={{ color: "var(--kira-green)" }}>Видео успешно сохранено!</span>
          </div>
        )}

        <p className="font-rajdhani text-xs text-kira-muted mt-2">
          Поддерживаются: TikTok, Instagram Reels, YouTube Shorts
        </p>
      </div>

      {/* Upload */}
      <div
        className="rounded-xl p-4 mb-6 flex items-center gap-4 cursor-pointer transition-all animate-fade-up delay-200"
        style={{ background: "var(--kira-surface)", border: "2px dashed var(--kira-border)" }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--kira-pink)")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--kira-border)")}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: "rgba(241,91,181,0.1)", border: "1px solid rgba(241,91,181,0.25)" }}
        >
          📤
        </div>
        <div>
          <p className="font-rajdhani font-bold text-sm text-kira-text">Загрузить своё видео</p>
          <p className="font-rajdhani text-xs text-kira-muted">MP4, MOV до 500MB</p>
        </div>
        <button className="ml-auto btn-kira-outline px-4 py-2 rounded-lg text-xs">
          Выбрать файл
        </button>
      </div>

      {/* Video grid */}
      <div className="space-y-3">
        {videos.map((v, i) => (
          <div key={v.id} className={`kira-card rounded-xl p-4 kira-card-pink animate-fade-up delay-${(i + 3) * 100}`}>
            <div className="flex gap-4 items-center">
              <div
                className="w-20 h-14 rounded-lg flex items-center justify-center text-3xl flex-shrink-0 relative"
                style={{ background: "var(--kira-surface2)", border: "1px solid var(--kira-border)" }}
              >
                {v.emoji}
                <div
                  className="absolute bottom-1 right-1 text-xs font-orbitron px-1"
                  style={{ background: "rgba(0,0,0,0.7)", borderRadius: "3px", fontSize: "0.55rem" }}
                >
                  {v.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="kira-badge" style={{ background: "rgba(241,91,181,0.1)", color: "var(--kira-pink)", border: "1px solid rgba(241,91,181,0.25)", fontSize: "0.58rem" }}>
                    {v.tag}
                  </span>
                </div>
                <p className="font-rajdhani font-bold text-sm text-kira-text truncate">{v.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-base">{v.avatar}</span>
                    <span className="font-rajdhani text-xs text-kira-muted">{v.user}</span>
                  </div>
                  <span className="font-rajdhani text-xs text-kira-muted">{v.views} просм.</span>
                  <span className="flex items-center gap-1 font-rajdhani text-xs text-kira-muted">
                    <Icon name="Heart" size={10} /> {v.likes}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="w-9 h-9 rounded-lg flex items-center justify-center btn-kira-primary"
                >
                  <Icon name="Play" size={14} />
                </button>
                <button className="w-9 h-9 rounded-lg flex items-center justify-center btn-kira-outline">
                  <Icon name="Download" size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
