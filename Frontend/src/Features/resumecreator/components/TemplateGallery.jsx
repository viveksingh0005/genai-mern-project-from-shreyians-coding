// src/components/TemplateGallery.jsx
import { TEMPLATES } from "../templates";

export default function TemplateGallery({ currentId, onSelect, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300
    }}>
      <div style={{
        background: "#1e2330", border: "1px solid #2d3748", borderRadius: 12,
        padding: 24, width: 580, maxHeight: "80vh", overflowY: "auto",
        fontFamily: "'Segoe UI', sans-serif"
      }}>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: 20
        }}>
          <div>
            <p style={{ fontWeight: 700, color: "#e2e8f0", fontSize: 15, margin: 0 }}>
              Choose a Template
            </p>
            <p style={{ fontSize: 11, color: "#64748b", margin: "4px 0 0" }}>
              Your content will be replaced with template defaults
            </p>
          </div>
          <button onClick={onClose} style={{
            background: "none", border: "none", color: "#94a3b8",
            cursor: "pointer", fontSize: 22, lineHeight: 1, padding: "0 4px"
          }}>
            ✕
          </button>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12
        }}>
          {TEMPLATES.map(tpl => (
            <TemplateCard
              key={tpl.id}
              tpl={tpl}
              isActive={currentId === tpl.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Single card ────────────────────────────────────────
function TemplateCard({ tpl, isActive, onSelect }) {
  return (
    <div
      onClick={() => onSelect(tpl)}
      style={{
        border: `1.5px solid ${isActive ? "#185fa5" : "#2d3748"}`,
        background: isActive ? "rgba(24,95,165,0.12)" : "transparent",
        borderRadius: 10, padding: "16px 12px", cursor: "pointer",
        textAlign: "center", transition: "all .15s", position: "relative",
      }}
      onMouseEnter={e => {
        if (!isActive) e.currentTarget.style.borderColor = "#475569";
        if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
      }}
      onMouseLeave={e => {
        if (!isActive) e.currentTarget.style.borderColor = "#2d3748";
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      {/* Active badge */}
      {isActive && (
        <div style={{
          position: "absolute", top: 8, right: 8,
          background: "#185fa5", borderRadius: 4,
          fontSize: 9, fontWeight: 700, color: "#fff",
          padding: "2px 6px", letterSpacing: "0.5px"
        }}>
          ACTIVE
        </div>
      )}

      {/* Emoji thumbnail */}
      <div style={{ fontSize: 30, marginBottom: 8 }}>
        {tpl.thumbnail}
      </div>

      {/* Template name */}
      <p style={{
        fontSize: 12, fontWeight: 700, color: "#e2e8f0",
        margin: 0, marginBottom: 4
      }}>
        {tpl.name}
      </p>

      {/* Font name */}
      <p style={{ fontSize: 10, color: "#64748b", margin: 0, marginBottom: 8 }}>
        {tpl.fontName}
      </p>

      {/* Layout badge + accent color dot in one row */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center", gap: 6
      }}>
        <span style={{
          fontSize: 9, padding: "2px 7px", borderRadius: 20, fontWeight: 700,
          letterSpacing: "0.4px",
          background: tpl.layout === "two-column"
            ? "rgba(52,211,153,0.12)" : "rgba(148,163,184,0.1)",
          color: tpl.layout === "two-column" ? "#34d399" : "#94a3b8",
          border: `1px solid ${tpl.layout === "two-column" ? "rgba(52,211,153,0.25)" : "rgba(148,163,184,0.15)"}`,
        }}>
          {tpl.layout === "two-column" ? "2-COL" : "1-COL"}
        </span>

        {/* Accent color dot */}
        <div style={{
          width: 10, height: 10, borderRadius: "50%",
          background: tpl.accentColor,
          border: "1.5px solid rgba(255,255,255,0.15)",
          flexShrink: 0,
        }} />
      </div>
    </div>
  );
}

