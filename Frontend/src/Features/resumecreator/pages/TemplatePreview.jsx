import { useParams, useNavigate } from "react-router-dom";
import { getTemplateById } from "../templates";

export default function TemplatePreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const template = getTemplateById(id);

  if (!template) return <p>Template not found</p>;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      padding: 40,
      color: "#fff"
    }}>

      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 30
      }}>
        <h2>{template.name}</h2>

        <button
          onClick={() => navigate("/templates")}
          style={{
            padding: "6px 12px",
            border: "1px solid #334155",
            background: "transparent",
            color: "#94a3b8",
            borderRadius: 6
          }}
        >
          Back
        </button>
      </div>

      {/* Layout */}
      <div style={{ display: "flex", gap: 40 }}>

        {/* Resume Preview */}
        <div style={{
          width: 400,
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          color: "#000"
        }}>
          <h1 style={{ fontFamily: template.font }}>
            John Doe
          </h1>
          <p style={{ color: template.accentColor }}>
            Software Engineer
          </p>
          <hr />
          <p>Sample preview content...</p>
        </div>

        {/* Details */}
        <div>
          <p><b>Font:</b> {template.fontName}</p>
          <p><b>Layout:</b> {template.layout}</p>

          <button
            onClick={() => navigate(`/editor/${template.id}`)}
            style={{
              marginTop: 20,
              padding: "10px 16px",
              background: "#185fa5",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Use This Template
          </button>
        </div>

      </div>
    </div>
  );
}