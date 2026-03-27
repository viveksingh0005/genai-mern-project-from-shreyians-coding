import { nameBlock, contactBlock, heading,
         subheading, bodyText, bullet, divider } from "./blocks";

const zoro = {
  id:          "zoro",
  name:        "zoro",
  thumbnail:   "💻",
  layout:      "two-column",    // ← different renderer kicks in
  fontName:    "Tahoma",
  sizes:       { name: 24, heading: 12, body: 10 },
  accentColor: "#185fa5",

  // TWO-column templates split blocks into left and right
  leftBlocks: [
    heading("Skills"),
    bodyText("JavaScript · TypeScript · React"),
    bodyText("Node.js · Express · PostgreSQL"),
    bodyText("Docker · AWS · Git · Linux"),
    divider(),
    heading("Education"),
    subheading("B.Tech — CS"),
    bodyText("University  |  2016 – 2020"),
    divider(),
    heading("Certifications"),
    bullet("AWS Solutions Architect\nGoogle Cloud Professional"),
    divider(),
    heading("Languages"),
    bodyText("English · Hindi"),
  ],

  rightBlocks: [
    heading("Work Experience"),
    subheading("Senior Engineer — Company"),
    bodyText("2021 – Present"),
    bullet("Built microservices handling 1M req/day.\nReduced DB query time by 60%.\nMentored 3 junior engineers."),
    divider(),
    subheading("Software Engineer — Startup"),
    bodyText("2020 – 2021"),
    bullet("Shipped 4 features in first month.\nWrote 80% test coverage from scratch."),
    divider(),
    heading("Projects"),
    subheading("Open Source Project"),
    bodyText("github.com/you/project"),
    bullet("What it does\nTech stack used"),
  ],
};

export default zoro;