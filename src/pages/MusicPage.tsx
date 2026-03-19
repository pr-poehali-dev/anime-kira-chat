import { useState } from "react";
import Icon from "@/components/ui/icon";

const tracks = [
  { id: 1, title: "Shinzou wo Sasageyo (Cover)", artist: "KiraMusic", duration: "4:22", emoji: "⚔️", genre: "Аниме", likes: 892 },
  { id: 2, title: "Battle Theme — Dark Dungeon", artist: "NightSoul", duration: "3:05", emoji: "🌑", genre: "Эпик", likes: 543 },
  { id: 3, title: "Sakura Dreams", artist: "MikuChan", duration: "2:47", emoji: "🌸", genre: "Романтика", likes: 1204 },
  { id: 4, title: "Dragon's Wrath (OST)", artist: "DragonSoul_X", duration: "5:12", emoji: "🐉", genre: "Боссфайт", likes: 2341 },
  { id: 5, title: "Ethereal Fox Spirit", artist: "AkiraKun", duration: "3:33", emoji: "🦊", genre: "Аниме", likes: 678 },
];

const playlists = [
  { name: "Для боссфайта", emoji: "⚔️", count: 12 },
  { name: "Романтические сцены", emoji: "🌸", count: 8 },
  { name: "Таинственные места", emoji: "🌙", count: 15 },
  { name: "Мои любимые", emoji: "💜", count: 23 },
];

export default function MusicPage() {
  const [playing, setPlaying] = useState<number | null>(2);
  const [progress, setProgress] = useState(45);

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-6">
      <div className="mb-6 animate-fade-up">
        <h2 className="font-orbitron text-xl font-bold" style={{ color: "var(--kira-yellow)" }}>Музыка</h2>
        <p className="font-rajdhani text-xs text-kira-muted">Плейлисты для твоих РП сцен</p>
      </div>

      {/* Now playing */}
      {playing !== null && (
        <div
          className="rounded-xl p-5 mb-6 animate-fade-up delay-100"
          style={{ background: "linear-gradient(135deg, rgba(155,93,229,0.15), rgba(254,228,64,0.05))", border: "1px solid rgba(155,93,229,0.3)" }}
        >
          <p className="font-rajdhani text-xs text-kira-muted mb-3 uppercase tracking-wider">Сейчас играет</p>
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl flex-shrink-0 animate-float"
              style={{ background: "var(--kira-surface2)", border: "1px solid rgba(155,93,229,0.3)" }}
            >
              {tracks.find((t) => t.id === playing)?.emoji}
            </div>
            <div>
              <p className="font-orbitron font-bold text-base text-kira-text">{tracks.find((t) => t.id === playing)?.title}</p>
              <p className="font-rajdhani text-sm text-kira-muted">{tracks.find((t) => t.id === playing)?.artist}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="level-bar-bg mb-1 cursor-pointer" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(Math.round(((e.clientX - rect.left) / rect.width) * 100));
            }}>
              <div className="level-bar-fill" style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--kira-purple), var(--kira-yellow))" }} />
            </div>
            <div className="flex justify-between">
              <span className="font-orbitron text-xs text-kira-muted">1:{String(Math.floor(progress * 0.6)).padStart(2, "0")}</span>
              <span className="font-orbitron text-xs text-kira-muted">{tracks.find((t) => t.id === playing)?.duration}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <button className="text-kira-muted hover:text-kira-text transition-colors"><Icon name="Shuffle" size={16} /></button>
            <button className="text-kira-muted hover:text-kira-text transition-colors"><Icon name="SkipBack" size={20} /></button>
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center btn-kira-primary"
              onClick={() => setPlaying(playing ? null : 1)}
            >
              <Icon name={playing ? "Pause" : "Play"} size={20} />
            </button>
            <button className="text-kira-muted hover:text-kira-text transition-colors"><Icon name="SkipForward" size={20} /></button>
            <button className="text-kira-muted hover:text-kira-text transition-colors"><Icon name="Repeat" size={16} /></button>
          </div>
        </div>
      )}

      {/* Playlists */}
      <div className="mb-6 animate-fade-up delay-200">
        <p className="font-orbitron text-xs text-kira-yellow mb-3" style={{ letterSpacing: "0.15em" }}>МОИ ПЛЕЙЛИСТЫ</p>
        <div className="grid grid-cols-2 gap-2">
          {playlists.map((pl) => (
            <button
              key={pl.name}
              className="kira-card rounded-xl p-3 text-left hover:border-yellow-500"
            >
              <div className="text-2xl mb-2">{pl.emoji}</div>
              <p className="font-rajdhani font-bold text-sm text-kira-text">{pl.name}</p>
              <p className="font-rajdhani text-xs text-kira-muted">{pl.count} треков</p>
            </button>
          ))}
        </div>
      </div>

      {/* Track list */}
      <div className="animate-fade-up delay-300">
        <p className="font-orbitron text-xs text-kira-yellow mb-3" style={{ letterSpacing: "0.15em" }}>ВСЕ ТРЕКИ</p>
        <div className="space-y-2">
          {tracks.map((t, i) => (
            <button
              key={t.id}
              className="kira-card rounded-xl p-3 w-full text-left flex items-center gap-3"
              style={playing === t.id ? { borderColor: "var(--kira-purple)", background: "rgba(155,93,229,0.08)" } : {}}
              onClick={() => setPlaying(t.id)}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "var(--kira-surface2)" }}
              >
                {playing === t.id ? <Icon name="Music" size={16} style={{ color: "var(--kira-purple)" }} /> : t.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-rajdhani font-bold text-sm truncate" style={{ color: playing === t.id ? "var(--kira-purple)" : "var(--kira-text)" }}>
                  {t.title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-rajdhani text-xs text-kira-muted">{t.artist}</span>
                  <span className="kira-badge" style={{ background: "rgba(254,228,64,0.08)", color: "var(--kira-yellow)", border: "1px solid rgba(254,228,64,0.2)", fontSize: "0.55rem" }}>{t.genre}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-rajdhani text-xs text-kira-muted">{t.likes}</span>
                <span className="font-orbitron text-xs text-kira-muted">{t.duration}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
