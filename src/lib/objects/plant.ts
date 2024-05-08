import { getRes } from "../../assets/image";
import { getGrass } from "../data/grass";
import { makeGrabbableProp } from "./equip";
import { addGrass } from "./pot";
import { type Prop } from "./prop";

export function generatePlant(): Prop {
  const length = randn_bm(0, 1200, 1);
  const angle = Math.random() * Math.PI / 2;
  const x = Math.cos(angle) * length;
  const y = Math.sin(angle) * length;

  return makeGrabbableProp(
    getRes("prop_flower_tile"),
    [96, 16, 16, 16],
    [x, y, 40, 40],
    [0, 0, 40, 40],
    {amountTime: 3},
    {
      onDayEnd: (state) => {
        if (typeof state.amountTime !== "number") return false;
        state.amountTime -= 1;
        if (state.amountTime === 0) return false;
        return true;
      },
      onWheelUp: (state) => {
        if (addGrass(getGrass("grass"))) return undefined;
        return true;
      }
    }
  );
}

const randn_bm = (min: number, max: number, skew: number) => {
  var u = 0, v = 0;
  while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
}