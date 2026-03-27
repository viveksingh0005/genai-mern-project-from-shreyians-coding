// src/components/ATSResumeBuilder.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { exportToPDF } from "../utils/exportPDF";
import Block from "../components/Block";
import {
  FONTS, ACCENT_COLORS, PAGE_SIZES,
  BLOCK_TYPES, DEFAULT_TEXT, uid
} from "../utils/constants";
import { TEMPLATES, getTemplateById } from "../templates";
import TemplateGallery from "../components/TemplateGallery";
import SingleColumn    from "../renderes/SingleColumn";
import TwoColumn       from "../renderes/TwoColumn";

// ── Link Modal ─────────────────────────────────────────
function LinkModal({ onAdd, onClose }) {
  const [text, setText] = useState("");
  const [url,  setUrl]  = useState("https://");

  const inp = {
    width: "100%", padding: "8px 10px", background: "#0f1117",
    border: "1.5px solid #2d3748", borderRadius: 6, color: "#e2e8f0",
    fontSize: 13, outline: "none", marginBottom: 8, fontFamily: "inherit"
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200
    }}>
      <div style={{
        background: "#1e2330", border: "1px solid #2d3748", borderRadius: 10,
        padding: "22px 26px", width: 300, fontFamily: "'Segoe UI',sans-serif"
      }}>
        <p style={{ fontWeight: 700, marginBottom: 14, color: "#e2e8f0", fontSize: 14 }}>
          Insert Link
        </p>
        <input
          value={text} onChange={e => setText(e.target.value)}
          placeholder="Display text (e.g. LinkedIn)" style={inp}
        />
        <input
          value={url} onChange={e => setUrl(e.target.value)}
          placeholder="URL (https://...)" style={inp}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            onClick={() => { if (url && url !== "https://") onAdd(text || url, url); }}
            style={{
              flex: 1, padding: "8px", background: "#185fa5", border: "none",
              borderRadius: 6, color: "#e2e8f0", fontWeight: 700,
              cursor: "pointer", fontSize: 13
            }}>
            Insert
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "8px", background: "#1e2330",
              border: "1.5px solid #2d3748", borderRadius: 6,
              color: "#e2e8f0", cursor: "pointer", fontSize: 13
            }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}




function LeftPanel({
  font, setFont, sizes, setSizes,
  accentColor, setAccentColor,
  pageSize, setPageSize,
  onAddBlock, onShowLinkModal,
  onShowGallery,
}) {
  const sec = (title, children) => (
    <div style={{ padding: "11px 12px 10px", borderBottom: "1px solid #2d3748" }}>
      <p style={{
        fontSize: 12, fontWeight: 700, letterSpacing: "2px",
        textTransform: "uppercase", color: "#64748b", marginBottom: 9
      }}>
        {title}
      </p>
      {children}
    </div>
  );

  return (
    <div style={{
      width: 220, minWidth: 220, background: "#1a1f2e",
      borderRight: "1px solid #2d3748", overflowY: "auto",
      fontFamily: "'Segoe UI',sans-serif"
    }}>
      {/* Logo */}
      <div style={{
        padding: "13px 12px", borderBottom: "1px solid #2d3748",
        display: "flex", gap: 9, alignItems: "center"
      }}>
        <div style={{
          width: 28, height: 28, background: "#185fa5", borderRadius: 6,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 15, color: "#fff", flexShrink: 0
        }}>
          R
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>Resume Builder</p>
          <p style={{ fontSize: 10, color: "#34d399", letterSpacing: 1 }}>ATS FRIENDLY</p>
        </div>
      </div>

      {/* Templates button */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid #2d3748" }}>
        <button
          onClick={onShowGallery}
          style={{
            width: "100%", padding: "8px", background: "rgba(24,95,165,0.15)",
            border: "1px solid #185fa5", borderRadius: 6, color: "#60a5fa",
            fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: "'Segoe UI',sans-serif"
          }}>
          🎨 Choose Template
        </button>
      </div>

      {/* Add Block */}
      {sec("Add Block",
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {BLOCK_TYPES.map(bt => (
            <button key={bt.type}
              onClick={() => bt.type === "link" ? onShowLinkModal() : onAddBlock(bt.type)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "transparent", border: "1px solid #2d3748",
                borderRadius: 6, padding: "6px 9px", cursor: "pointer",
                color: "#e2e8f0", fontSize: 12, textAlign: "left"
              }}>
              <span style={{ width: 16, textAlign: "center", fontWeight: 700 }}>{bt.icon}</span>
              {bt.label}
            </button>
          ))}
        </div>
      )}

      {/* Font */}
      {sec("Font",
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {FONTS.map(f => (
            <button key={f.name} onClick={() => setFont(f)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: font.name === f.name ? "rgba(24,95,165,0.2)" : "transparent",
                border: `1px solid ${font.name === f.name ? "#185fa5" : "#2d3748"}`,
                borderRadius: 6, padding: "6px 9px", cursor: "pointer",
                color: "#e2e8f0", fontFamily: f.val, fontSize: 12
              }}>
              {f.name}
              <span style={{
                fontSize: 9, background: "rgba(52,211,153,0.15)", color: "#34d399",
                padding: "2px 5px", borderRadius: 3, fontWeight: 700,
                fontFamily: "'Segoe UI',sans-serif"
              }}>
                {f.tag}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Font Size */}
      {sec("Font Size",
        <div>
          {[
            ["Name",    sizes.name,    18, 34, "name"],
            ["Heading", sizes.heading, 10, 16, "heading"],
            ["Body",    sizes.body,     9, 13, "body"],
          ].map(([lbl, val, mn, mx, key]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
              <span style={{ fontSize: 11, color: "#94a3b8", width: 55, flexShrink: 0 }}>{lbl}</span>
              <input type="range" min={mn} max={mx} value={val}
                onChange={e => setSizes(s => ({ ...s, [key]: Number(e.target.value) }))}
                style={{ flex: 1, accentColor: "#185fa5" }}
              />
              <span style={{ fontSize: 11, width: 22, textAlign: "right", color: "#e2e8f0" }}>{val}</span>
            </div>
          ))}
          <p style={{ fontSize: 10, color: "#475569" }}>ATS recommended: Body 10–12pt</p>
        </div>
      )}

      {/* Accent Color */}
      {sec("Accent Color",
        <div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 9 }}>
            {ACCENT_COLORS.map(c => (
              <div key={c} onClick={() => setAccentColor(c)}
                style={{
                  width: 22, height: 22, borderRadius: "50%", background: c,
                  cursor: "pointer",
                  border: accentColor === c ? "2.5px solid #e2e8f0" : "2px solid transparent",
                  transform: accentColor === c ? "scale(1.2)" : "scale(1)",
                  transition: "transform .1s"
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 11, color: "#94a3b8" }}>Custom:</span>
            <input type="color" value={accentColor} onChange={e => setAccentColor(e.target.value)}
              style={{ width: 30, height: 22, border: "none", background: "none", cursor: "pointer", padding: 0 }}
            />
            <span style={{ fontSize: 11, color: "#64748b" }}>{accentColor}</span>
          </div>
        </div>
      )}

      {/* Page Size */}
      {sec("Page Size",
        <div>
          <div style={{ display: "flex", gap: 6 }}>
            {PAGE_SIZES.map(s => (
              <button key={s.label} onClick={() => setPageSize(s)}
                style={{
                  padding: "4px 12px", borderRadius: 20, cursor: "pointer",
                  fontSize: 12, fontFamily: "inherit",
                  border: `1px solid ${pageSize.label === s.label ? "#185fa5" : "#2d3748"}`,
                  background: pageSize.label === s.label ? "rgba(24,95,165,0.2)" : "transparent",
                  color: pageSize.label === s.label ? "#60a5fa" : "#e2e8f0",
                  fontWeight: pageSize.label === s.label ? 700 : 400
                }}>
                {s.label}
              </button>
            ))}
          </div>
          <p style={{ fontSize: 10, color: "#475569", marginTop: 7 }}>A4 & Letter most ATS-safe</p>
        </div>
      )}
    </div>
  );
}


// ── Root App ───────────────────────────────────────────
export default function ATSResumeBuilder() {
// ── Load saved resume from localStorage ──
const loadSavedData = () => {
  try {
    const data = localStorage.getItem("resumeData");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

const saved = loadSavedData();
  // ── Load first template as starting point ──
const { id } = useParams();

const selectedTemplate = getTemplateById(id) || TEMPLATES[0];
const firstTemplate = selectedTemplate;
const firstFont     = FONTS.find(f => f.name === firstTemplate.fontName) ?? FONTS[0];

// ── Give every block a fresh uid on first load ──────────
const initBlocks = (tpl) => {
  if (tpl.layout === "two-column") {
    return {
      blocks:      [],
      leftBlocks:  tpl.leftBlocks.map(b => ({ ...b, id: uid() })),
      rightBlocks: tpl.rightBlocks.map(b => ({ ...b, id: uid() })),
    };
  }
  return {
    blocks:      tpl.blocks.map(b => ({ ...b, id: uid() })),
    leftBlocks:  [],
    rightBlocks: [],
  };
};

const initial = initBlocks(firstTemplate);

const [activeTemplateId, setActiveTemplateId] = useState(saved?.activeTemplateId || firstTemplate.id);
const [layout, setLayout] = useState(saved?.layout || firstTemplate.layout || "single");

const [blocks, setBlocks] = useState(saved?.blocks || initial.blocks);
const [leftBlocks, setLeftBlocks] = useState(saved?.leftBlocks || initial.leftBlocks);
const [rightBlocks, setRightBlocks] = useState(saved?.rightBlocks || initial.rightBlocks);

const [selId, setSelId] = useState(null);
const [font, setFont] = useState(saved?.font || firstFont);
const [sizes, setSizes] = useState(saved?.sizes || { ...firstTemplate.sizes });
const [accentColor, setAccentColor] = useState(saved?.accentColor || firstTemplate.accentColor);
const [pageSize, setPageSize] = useState(saved?.pageSize || PAGE_SIZES[0]);

const [showLink, setShowLink] = useState(false);
const [showGallery, setShowGallery] = useState(false);
const [exporting, setExporting] = useState(false);

useEffect(() => {
  const data = {
    activeTemplateId,
    layout,
    blocks,
    leftBlocks,
    rightBlocks,
    font,
    sizes,
    accentColor,
    pageSize,
  };

  localStorage.setItem("resumeData", JSON.stringify(data));
}, [
  activeTemplateId,
  layout,
  blocks,
  leftBlocks,
  rightBlocks,
  font,
  sizes,
  accentColor,
  pageSize
]);
  const paperRef = useRef(null);

  // ── Apply a template ───────────────────────
  const applyTemplate = useCallback((tpl) => {
    const hasContent =
      blocks.some(b => b.text?.trim()) ||
      leftBlocks.some(b => b.text?.trim()) ||
      rightBlocks.some(b => b.text?.trim());

    if (hasContent) {
      const ok = window.confirm(
        `Switch to "${tpl.name}"? Your current content will be replaced.`
      );
      if (!ok) return;
    }

    const fontObj = FONTS.find(f => f.name === tpl.fontName) ?? FONTS[0];

    setActiveTemplateId(tpl.id);
    setLayout(tpl.layout ?? "single");
    setFont(fontObj);
    setSizes({ ...tpl.sizes });
    setAccentColor(tpl.accentColor);
    setSelId(null);

    if (tpl.layout === "two-column") {
      setLeftBlocks(tpl.leftBlocks.map(b => ({ ...b, id: uid() })));
      setRightBlocks(tpl.rightBlocks.map(b => ({ ...b, id: uid() })));
      setBlocks([]);
    } else {
      setBlocks(tpl.blocks.map(b => ({ ...b, id: uid() })));
      setLeftBlocks([]);
      setRightBlocks([]);
    }

    setShowGallery(false);
  }, [blocks, leftBlocks, rightBlocks]);

  // ── Block operations (work for all layouts) ─
  const updateText = useCallback((id, text) => {
    setBlocks(bs      => bs.map(b => b.id === id ? { ...b, text } : b));
    setLeftBlocks(bs  => bs.map(b => b.id === id ? { ...b, text } : b));
    setRightBlocks(bs => bs.map(b => b.id === id ? { ...b, text } : b));
  }, []);

  const deleteBlock = useCallback((id) => {
    setBlocks(bs      => bs.filter(b => b.id !== id));
    setLeftBlocks(bs  => bs.filter(b => b.id !== id));
    setRightBlocks(bs => bs.filter(b => b.id !== id));
    setSelId(null);
  }, []);

  const moveUp = useCallback((id) => {
    const move = bs => {
      const i = bs.findIndex(b => b.id === id);
      if (i <= 0) return bs;
      const n = [...bs]; [n[i - 1], n[i]] = [n[i], n[i - 1]]; return n;
    };
    setBlocks(move); setLeftBlocks(move); setRightBlocks(move);
  }, []);

  const moveDown = useCallback((id) => {
    const move = bs => {
      const i = bs.findIndex(b => b.id === id);
      if (i === -1 || i >= bs.length - 1) return bs;
      const n = [...bs]; [n[i], n[i + 1]] = [n[i + 1], n[i]]; return n;
    };
    setBlocks(move); setLeftBlocks(move); setRightBlocks(move);
  }, []);

  // ── Add block (inserts after selected, or at end) ─
  const addBlock = useCallback((type) => {
    const nb = { id: uid(), type, text: DEFAULT_TEXT[type] };

    if (layout === "two-column") {
      // For two-column: check which column has the selected block
      // If selected block is in left → insert there, else insert in right
      const inLeft = leftBlocks.some(b => b.id === selId);
      if (inLeft) {
        setLeftBlocks(bs => {
          const i = bs.findIndex(b => b.id === selId);
          const n = [...bs]; n.splice(i + 1, 0, nb); return n;
        });
      } else {
        setRightBlocks(bs => {
          const i = bs.findIndex(b => b.id === selId);
          const at = i === -1 ? bs.length : i + 1;
          const n = [...bs]; n.splice(at, 0, nb); return n;
        });
      }
    } else {
      setBlocks(bs => {
        const i = bs.findIndex(b => b.id === selId);
        const at = i === -1 ? bs.length : i + 1;
        const n = [...bs]; n.splice(at, 0, nb); return n;
      });
    }

    setSelId(nb.id);
  }, [layout, selId, leftBlocks]);

  // ── Add link block ─────────────────────────
  const addLink = useCallback((text, url) => {
    const nb = { id: uid(), type: "link", text: `${text}|||${url}` };

    if (layout === "two-column") {
      const inLeft = leftBlocks.some(b => b.id === selId);
      if (inLeft) {
        setLeftBlocks(bs => {
          const i = bs.findIndex(b => b.id === selId);
          const n = [...bs]; n.splice(i + 1, 0, nb); return n;
        });
      } else {
        setRightBlocks(bs => {
          const i = bs.findIndex(b => b.id === selId);
          const at = i === -1 ? bs.length : i + 1;
          const n = [...bs]; n.splice(at, 0, nb); return n;
        });
      }
    } else {
      setBlocks(bs => {
        const i = bs.findIndex(b => b.id === selId);
        const at = i === -1 ? bs.length : i + 1;
        const n = [...bs]; n.splice(at, 0, nb); return n;
      });
    }

    setSelId(nb.id);
    setShowLink(false);
  }, [layout, selId, leftBlocks]);

  // ── Shared props passed to both renderers ──
  const rendererProps = {
    selId, font, sizes, accentColor,
    onSelect:   setSelId,
    onChange:   updateText,
    onDelete:   deleteBlock,
    onMoveUp:   moveUp,
    onMoveDown: moveDown,
    BlockComponent: Block,   // pass Block down so renderers don't import it separately
  };

  // ── Render ─────────────────────────────────
  return (
    <div style={{
      display: "flex", height: "100vh", background: "#0f1117",
      overflow: "hidden", fontFamily: "'Segoe UI',sans-serif"
    }}>

      {/* Left Panel */}
      <LeftPanel
        font={font}               setFont={setFont}
        sizes={sizes}             setSizes={setSizes}
        accentColor={accentColor} setAccentColor={setAccentColor}
        pageSize={pageSize}       setPageSize={setPageSize}
        onAddBlock={addBlock}
        onShowLinkModal={() => setShowLink(true)}
        onShowGallery={() => setShowGallery(true)}
      />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Toolbar */}
        <div style={{
          background: "#1a1f2e", borderBottom: "1px solid #2d3748",
          padding: "9px 18px", display: "flex", alignItems: "center",
          gap: 12, flexShrink: 0
        }}>
          <span style={{ fontSize: 12, color: "#64748b" }}>
            {layout === "two-column"
              ? `${leftBlocks.length + rightBlocks.length} blocks · 2-column`
              : `${blocks.length} blocks`
            } · {pageSize.label} · {font.name}
          </span>
          <div style={{ flex: 1 }} />

          {/* Download PDF button */}
          <button
  onClick={() => {
    localStorage.removeItem("resumeData");
    window.location.reload();
  }}
  style={{
    padding: "6px 12px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 700
  }}
>
  Reset
</button>
          <button
            onClick={async () => {
              setExporting(true);
              await exportToPDF(paperRef, "my-resume.pdf");
              setExporting(false);
            }}
            disabled={exporting}
            style={{
              padding: "6px 16px",
              background: exporting ? "#334155" : "#185fa5",
              border: "none", borderRadius: 6, color: "#e2e8f0",
              fontSize: 12, fontWeight: 700,
              cursor: exporting ? "not-allowed" : "pointer",
              minWidth: 130,
            }}>
            {exporting ? "Generating..." : "Download PDF"}
          </button>
        </div>

        {/* Canvas area */}
        <div
          style={{
            flex: 1, overflow: "auto", display: "flex",
            justifyContent: "center", padding: "32px 16px", background: "#0f1117"
          }}
          onClick={e => { if (e.target === e.currentTarget) setSelId(null); }}
        >
          {/* Paper */}
          <div
            ref={paperRef}
            onClick={e => { if (e.target === e.currentTarget) setSelId(null); }}
            style={{
              width:      pageSize.width + "px",
              minWidth:   pageSize.width + "px",
              minHeight:  pageSize.width * 1.41 + "px",
              background: "#fff",
              padding:    "48px 56px",
              boxShadow:  "0 6px 32px rgba(0,0,0,0.4)",
              borderRadius: 2,
              boxSizing:  "border-box",
            }}
          >
            {layout === "two-column" ? (
              <TwoColumn
                leftBlocks={leftBlocks}
                rightBlocks={rightBlocks}
                {...rendererProps}
              />
            ) : (
              <SingleColumn
                blocks={blocks}
                {...rendererProps}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLink && (
        <LinkModal
          onAdd={addLink}
          onClose={() => setShowLink(false)}
        />
      )}

      {showGallery && (
        <TemplateGallery
          currentId={activeTemplateId}
          onSelect={applyTemplate}
          onClose={() => setShowGallery(false)}
        />
      )}

      <style>{`@media print { body > * { display:none!important; } }`}</style>
    </div>
  );
}