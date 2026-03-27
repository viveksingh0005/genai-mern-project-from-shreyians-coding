import { FONTS } from "../utils/constants"; // move your FONTS/SIZES out to constants.js

const uid = () => Math.random().toString(36).slice(2, 8);

export const gon = {
  id: "gon",
  name: "gon",
  thumbnail: "👔",
  font: FONTS[0],                          // Calibri
  sizes: { name: 24, heading: 12, body: 11 },
  accentColor: "#1a365d",
  blocks: [
    { id: uid(), type: "name",       text: "Your Full Vivek" },
    { id: uid(), type: "contact",    text: "email@example.com  |  Phone  |  City" },
    { id: uid(), type: "divider",    text: "" },
    { id: uid(), type: "heading",    text: "Professional Summary" },
    { id: uid(), type: "text",       text: "Results-driven professional with X years of experience." },
    { id: uid(), type: "divider",    text: "" },
    { id: uid(), type: "heading",    text: "Work Experience" },
    { id: uid(), type: "subheading", text: "Job Title — Company Name" },
    { id: uid(), type: "bullet",     text: "Key achievement 1\nKey achievement 2" },
    { id: uid(), type: "divider",    text: "" },
    { id: uid(), type: "heading",    text: "Education" },
    { id: uid(), type: "subheading", text: "Degree — University" },
    { id: uid(), type: "text",       text: "2018 – 2022" },
    { id: uid(), type: "divider",    text: "" },
    { id: uid(), type: "heading",    text: "Skills" },
    { id: uid(), type: "text",       text: "JavaScript · React · Node.js · Python" },
  ],
};