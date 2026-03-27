import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "../templates";

export default function TemplatesPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 700 }}>
          Choose Your Resume Template
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 8 }}>
          Professional & ATS-friendly templates
        </p>
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: 24,
        maxWidth: 1200,
        margin: "0 auto"
      }}>
        {TEMPLATES.map(tpl => (
          <TemplateCard key={tpl.id} tpl={tpl} navigate={navigate} />
        ))}
      </div>

    </div>
  );
}

// 🔹 Template Card
function TemplateCard({ tpl, navigate }) {
  return (
    <div
      onClick={() => navigate(`/template/${tpl.id}`)}
      style={{
        background: "#1e293b",
        borderRadius: 12,
        padding: 20,
        cursor: "pointer",
        transition: "0.3s",
        border: "1px solid #334155"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >

      {/* Thumbnail */}
      <div style={{
        height: 320,
        background: "#fff",
        borderRadius: 6,
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 40
      }}>
        {tpl.thumbnail}
      </div>

      {/* Info */}
      <h3 style={{ color: "#fff", fontSize: 16 }}>
        {tpl.name}
      </h3>

      <p style={{ color: "#94a3b8", fontSize: 12 }}>
        {tpl.layout === "two-column" ? "2 Column Layout" : "Single Column"}
      </p>

      {/* Accent */}
      <div style={{ marginTop: 10, display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ color: "#64748b", fontSize: 11 }}>Accent:</span>
        <div style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: tpl.accentColor
        }} />
      </div>
    </div>
  );
}