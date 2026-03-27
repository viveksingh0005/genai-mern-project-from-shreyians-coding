// src/templates/blocks.js
import { uid } from "../utils/constants";

export const nameBlock    = (text = "Your Full Name")                        => ({ id: uid(), type: "name",       text });
export const contactBlock = (text = "email@example.com  |  Phone  |  City") => ({ id: uid(), type: "contact",    text });
export const heading      = (text)                                           => ({ id: uid(), type: "heading",    text });
export const subheading   = (text)                                           => ({ id: uid(), type: "subheading", text });
export const bodyText     = (text)                                           => ({ id: uid(), type: "text",       text });
export const bullet       = (text)                                           => ({ id: uid(), type: "bullet",     text });
export const divider      = ()                                               => ({ id: uid(), type: "divider",    text: "" });