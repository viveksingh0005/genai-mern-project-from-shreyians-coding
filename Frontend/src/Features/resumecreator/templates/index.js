import { classic }    from "./classic";
import techTwoCol from "./tech-two-col";
import { gojo } from "./gojo";
import { goku } from "./goku";
import { gon } from "./gon";
import { gun } from "./gun";
import { hamza_ali } from "./hamza-ali";
import { ichigo } from "./ichigo";
import { kenpachi } from "./kenpachi";
import { killua } from "./killua";
import { luffy } from "./luffy";
import { mighty } from "./mighty";
import { naruto} from "./naruto";
import { one } from "./one";
import { sasuke } from "./sasuke";
import sungjinwoo from "./sung-jin-woo";
import tanjiro from "./tanjiro";
import yuji from "./yuji";
import zoro from "./zoro";

// import { modern }     from "./modern";
// import { executive }  from "./executive";
// ... import all 20

export const TEMPLATES = [
  classic,
  techTwoCol,
  one,
  gojo,
  goku,
  gon,
  gun,
  hamza_ali,
  ichigo,
  kenpachi,
  killua,
  luffy,
  mighty,
  naruto,
  one,
  sasuke,
  sungjinwoo,
  tanjiro,
 
  yuji,
  zoro



];

export const getTemplateById = (id) =>
  TEMPLATES.find(t => t.id === id) ?? TEMPLATES[0];