import { useState } from "react";
import Icon from "@/components/ui/icon";

const myPosts = [
  { id: 1, text: "Начинаю новое RP приключение! Кто хочет со мной? 🗡️", likes: 23, comments: 5, time: "2 дня" },
  { id: 2, text: "Мой персонаж только что достиг 30 уровня ✨ Наконец-то открыл класс Архимага!", likes: 67, comments: 18, time: "5 дней" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("РПшник со стажем 🌸 Люблю магические миры и сложные сюжеты. Всегда открыт(а) для новых историй!");

  return (
    <div className="max-w-2xl mx-auto pb-24 md:pb-6">
      {/* Cover + Avatar */}
      <div className="relative mb-16 animate-fade-up">
        <div
          className="h-40 rounded-xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(155,93,229,0.3), rgba(241,91,181,0.2), rgba(0,187,249,0.15))" }}
        >
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(155,93,229,0.2) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(0,187,249,0.15) 0%, transparent 50%)" }} />
          <button
            className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs btn-kira-outline flex items-center gap-1"
          >
            <Icon name="Camera" size={12} /> Сменить обложку
          </button>
        </div>

        <div className="absolute -bottom-12 left-6 flex items-end gap-3">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-5xl kira-avatar"
              style={{ background: "var(--kira-surface)" }}
            >
              🐉
            </div>
            <button
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center btn-kira-primary text-xs"
            >
              <Icon name="Camera" size={12} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-3 right-4 flex gap-2">
          <button
            className="btn-kira-outline px-3 py-1.5 rounded-lg text-xs flex items-center gap-1"
            onClick={() => setEditing(!editing)}
          >
            <Icon name="Edit2" size={12} /> {editing ? "Сохранить" : "Редактировать"}
          </button>
          <button className="btn-kira-cyan px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
            <Icon name="Share2" size={12} /> Поделиться
          </button>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 mb-6 animate-fade-up delay-100">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="font-orbitron text-xl font-bold text-kira-text">DragonSoul_X</h2>
          <span className="kira-badge race-dragon">Дракон</span>
          <span className="kira-badge class-mage">Маг</span>
          <span className="kira-badge" style={{ background: "rgba(254,228,64,0.1)", color: "var(--kira-yellow)", border: "1px solid rgba(254,228,64,0.3)" }}>
            ★ Lv.45
          </span>
        </div>
        <p className="font-rajdhani text-sm text-kira-muted mt-1">@dragonsoul_x · Участник с марта 2024</p>

        {editing ? (
          <textarea
            className="kira-input mt-3 text-sm resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />
        ) : (
          <p className="font-rajdhani text-sm mt-3 leading-relaxed" style={{ color: "var(--kira-text)" }}>
            {bio}
          </p>
        )}

        {/* Stats */}
        <div className="flex gap-6 mt-4">
          {[
            { val: "128", label: "Подписки" },
            { val: "540", label: "Подписчики" },
            { val: "34", label: "Посты" },
            { val: "12", label: "Персонажи" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-orbitron font-bold text-kira-purple">{s.val}</div>
              <div className="font-rajdhani text-xs text-kira-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* EXP bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="font-rajdhani text-xs text-kira-muted">EXP до Lv.46</span>
            <span className="font-orbitron text-xs text-kira-purple">7,400 / 12,000</span>
          </div>
          <div className="level-bar-bg">
            <div className="level-bar-fill" style={{ width: "62%" }} />
          </div>
        </div>
      </div>

      {/* Google login block */}
      <div
        className="mx-4 mb-6 rounded-xl p-4 animate-fade-up delay-200"
        style={{ background: "var(--kira-surface)", border: "1px solid var(--kira-border)" }}
      >
        <p className="font-rajdhani text-xs text-kira-muted mb-2 text-center">Аккаунт привязан к</p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-xs font-bold" style={{ color: "#4285F4" }}>G</div>
          <span className="font-rajdhani font-semibold text-sm">Google · dragonsoul@gmail.com</span>
          <div className="online-dot ml-1" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-kira mb-4 overflow-x-auto px-4 animate-fade-up delay-300">
        {["posts", "characters", "media"].map((tab) => (
          <button
            key={tab}
            className={`kira-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "posts" ? "Посты" : tab === "characters" ? "Персонажи" : "Медиа"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "posts" && (
        <div className="space-y-4 px-4 animate-fade-up">
          {myPosts.map((p) => (
            <div key={p.id} className="kira-card rounded-xl p-4">
              <p className="font-rajdhani text-sm leading-relaxed mb-3">{p.text}</p>
              <div className="flex items-center gap-4 text-xs text-kira-muted font-rajdhani">
                <span className="flex items-center gap-1"><Icon name="Heart" size={12} />{p.likes}</span>
                <span className="flex items-center gap-1"><Icon name="MessageCircle" size={12} />{p.comments}</span>
                <span className="ml-auto">{p.time} назад</span>
              </div>
            </div>
          ))}
          <button className="btn-kira-outline w-full py-3 rounded-xl text-sm">
            + Написать новый пост
          </button>
        </div>
      )}

      {activeTab === "characters" && (
        <div className="px-4 animate-fade-up">
          <div className="kira-card rounded-xl p-6 text-center">
            <div className="text-4xl mb-3">🐉</div>
            <h4 className="font-orbitron text-sm text-kira-purple mb-1">Асуки-Дракон</h4>
            <div className="flex justify-center gap-2 mb-3">
              <span className="kira-badge race-dragon">Дракон</span>
              <span className="kira-badge class-mage">Маг</span>
            </div>
            <button className="btn-kira-outline px-4 py-2 rounded-lg text-xs">Просмотреть</button>
          </div>
          <button className="btn-kira-primary w-full py-3 rounded-xl text-sm mt-4">
            + Создать нового персонажа
          </button>
        </div>
      )}

      {activeTab === "media" && (
        <div className="px-4 animate-fade-up">
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg flex items-center justify-center text-2xl"
                style={{ background: "var(--kira-surface2)", border: "1px solid var(--kira-border)" }}
              >
                {["🎬", "🖼️", "🎵", "📸", "🎬", "🖼️"][i]}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
