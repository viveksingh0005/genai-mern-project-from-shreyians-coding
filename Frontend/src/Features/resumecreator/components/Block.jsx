// src/components/Block.jsx
import { useEffect, useRef } from "react";

export default function Block({
  block, isSelected, font, sizes, accentColor,
  onSelect, onChange, onDelete, onMoveUp, onMoveDown
}) {
  const taRef = useRef(null);

  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = "auto";
      taRef.current.style.height = taRef.current.scrollHeight + "px";
    }
  }, [block.text, isSelected]);

  const ta = (extra = {}) => ({
    width: "100%", border: "none", outline: "none", resize: "none",
    background: "transparent", fontFamily: font.val,
    lineHeight: 1.55, overflow: "hidden", display: "block", ...extra,
  });

  const Controls = () => (
    <div style={{
      position: "absolute", top: -1, right: -1, display: "flex", gap: 1,
      background: "#1e2330", border: "1px solid #2d3748",
      borderRadius: "0 3px 0 5px", padding: "1px 3px"
    }}>
      {[["↑", onMoveUp], ["↓", onMoveDown]].map(([lbl, fn]) => (
        <button key={lbl}
          onMouseDown={e => { e.preventDefault(); e.stopPropagation(); fn(); }}
          style={{
            background: "none", border: "none", color: "#94a3b8",
            cursor: "pointer", fontSize: 11, padding: "1px 4px"
          }}>
          {lbl}
        </button>
      ))}
      <button
        onMouseDown={e => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
        style={{
          background: "none", border: "none", color: "#f87171",
          cursor: "pointer", fontSize: 11, padding: "1px 4px"
        }}>
        ✕
      </button>
    </div>
  );

  const wrap = (children, extra = {}) => (
    <div
      onClick={onSelect}
      style={{
        position: "relative",
        border: `1.5px dashed ${isSelected ? "#378add" : "transparent"}`,
        borderRadius: 3, cursor: "text", ...extra
      }}>
      {isSelected && <Controls />}
      {children}
    </div>
  );

  switch (block.type) {

    case "name":
      return wrap(
        <textarea ref={taRef} value={block.text}
          onChange={e => onChange(e.target.value)} rows={1}
          style={ta({ fontSize: sizes.name + "pt", fontWeight: 700, color: accentColor, textAlign: "center" })}
        />
      );

    case "contact":
      return wrap(
        <textarea ref={taRef} value={block.text}
          onChange={e => onChange(e.target.value)} rows={1}
          style={ta({ fontSize: sizes.body + "pt", color: "#555", textAlign: "center" })}
        />
      );

    case "heading":
      return wrap(
        <textarea ref={taRef} value={block.text}
          onChange={e => onChange(e.target.value)} rows={1}
          style={ta({
            fontSize: sizes.heading + "pt", fontWeight: 700,
            color: accentColor, textTransform: "uppercase", letterSpacing: "0.5px"
          })}
        />,
        { marginTop: 6 }
      );

    case "subheading":
      return wrap(
        <textarea ref={taRef} value={block.text}
          onChange={e => onChange(e.target.value)} rows={1}
          style={ta({ fontSize: (sizes.body + 1) + "pt", fontWeight: 700, color: "#1a1a1a" })}
        />
      );

    case "text":
      return wrap(
        <textarea ref={taRef} value={block.text}
          onChange={e => onChange(e.target.value)} rows={1}
          style={ta({ fontSize: sizes.body + "pt", color: "#333" })}
        />
      );

    case "bullet":
      return wrap(
        isSelected ? (
          <div>
            <p style={{ fontSize: 10, color: "#4f8ef7", marginBottom: 3, fontFamily: "'Segoe UI',sans-serif" }}>
              One bullet per line ↵
            </p>
            <textarea ref={taRef} value={block.text}
              onChange={e => onChange(e.target.value)}
              style={ta({ fontSize: sizes.body + "pt", color: "#333", whiteSpace: "pre-wrap" })}
            />
          </div>
        ) : (
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {block.text.split("\n").filter(l => l.trim()).map((line, i) => (
              <li key={i} style={{
                fontSize: sizes.body + "pt", color: "#333",
                fontFamily: font.val, lineHeight: 1.55, marginBottom: 2
              }}>
                {line}
              </li>
            ))}
          </ul>
        )
      );

    case "link": {
      const [linkText, linkUrl] = block.text.split("|||");
      return wrap(
        <a href={linkUrl} target="_blank" rel="noopener noreferrer"
          style={{
            fontSize: sizes.body + "pt", color: accentColor,
            fontFamily: font.val, textDecoration: "underline"
          }}>
          {linkText || linkUrl}
        </a>
      );
    }

    case "divider":
      return wrap(
        <div style={{ padding: "4px 0" }}>
          <hr style={{ border: "none", borderTop: `2px solid ${accentColor}`, margin: 0 }} />
        </div>
      );

    default: return null;
  }
}