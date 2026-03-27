export const uid = () => Math.random().toString(36).slice(2, 8);

export const FONTS = [
  { name: "Calibri",         val: "Calibri, sans-serif",      tag: "Best" },
  { name: "Georgia",         val: "Georgia, serif",           tag: "Classic" },
  { name: "Garamond",        val: "Garamond, serif",          tag: "Elegant" },
  { name: "Tahoma",          val: "Tahoma, sans-serif",       tag: "Clean" },
  { name: "Verdana",         val: "Verdana, sans-serif",      tag: "Safe" },
  { name: "Times New Roman", val: "'Times New Roman', serif", tag: "Formal" },
];

export const ACCENT_COLORS = [
  "#1a365d","#185fa5","#2d6a4f",
  "#6b2737","#4a4e69","#7b3f00","#000000"
];

export const PAGE_SIZES = [
  { label: "A4",     width: 794  },
  { label: "Letter", width: 816  },
];

export const BLOCK_TYPES = [
  { type: "name",       label: "Your Name",      icon: "A" },
  { type: "contact",    label: "Contact Info",   icon: "@" },
  { type: "heading",    label: "Section Heading",icon: "H" },
  { type: "subheading", label: "Sub Heading",    icon: "h" },
  { type: "text",       label: "Body Text",      icon: "T" },
  { type: "bullet",     label: "Bullet List",    icon: "•" },
  { type: "link",       label: "Link",           icon: "~" },
  { type: "divider",    label: "Divider Line",   icon: "—" },
];

export const DEFAULT_TEXT = {
  name:       "Your Name",
  contact:    "email@example.com  |  Phone  |  City",
  heading:    "Section Heading",
  subheading: "Job Title — Company",
  text:       "Start typing here...",
  bullet:     "First bullet\nSecond bullet",
  link:       "",
  divider:    "",
};