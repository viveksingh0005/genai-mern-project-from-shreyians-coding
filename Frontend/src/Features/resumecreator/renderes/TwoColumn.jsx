// src/components/renderers/TwoColumn.jsx

import Block from "../components/Block";
function Column({ blocks, selId, font, sizes, accentColor,
                  onSelect, onChange, onDelete, onMoveUp, onMoveDown }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {blocks.map(b => (
        <Block
          key={b.id} block={b} isSelected={selId === b.id}
          font={font} sizes={sizes} accentColor={accentColor}
          onSelect={() => onSelect(b.id)}
          onChange={text => onChange(b.id, text)}
          onDelete={() => onDelete(b.id)}
          onMoveUp={() => onMoveUp(b.id)}
          onMoveDown={() => onMoveDown(b.id)}
        />
      ))}
    </div>
  );
}

export default function TwoColumn({
  leftBlocks, rightBlocks, selId, font, sizes, accentColor,
  onSelect, onChange, onDelete, onMoveUp, onMoveDown,
  leftWidth = "35%"   // ← control the split, e.g. 35/65
}) {
  const colProps = { selId, font, sizes, accentColor,
                     onSelect, onChange, onDelete, onMoveUp, onMoveDown };
  return (
    <div style={{ display: "flex", gap: 0, height: "100%" }}>

      {/* Left column — usually narrower, sidebar feel */}
      <div style={{
        width: leftWidth, flexShrink: 0,
        borderRight: `2px solid ${accentColor}`,
        paddingRight: 20, marginRight: 20,
      }}>
        <Column blocks={leftBlocks} {...colProps} />
      </div>

      {/* Right column — main content */}
      <div style={{ flex: 1 }}>
        <Column blocks={rightBlocks} {...colProps} />
      </div>

    </div>
  );
}