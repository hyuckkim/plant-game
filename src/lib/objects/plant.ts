import { get } from "svelte/store";
import { getSpriteRes } from "../../assets/image";
import { getGrass, type Grass } from "../data/grass";
import {
  getRandomPotionGrass,
  potiondropResult,
  type Potion,
} from "../data/potion";
import { makeGrabbableProp } from "./equip";
import { addGrass } from "./pot";
import { addProps, attachedTag, Prop } from "./prop";
import { playSoundSFX } from "../../assets/sound";
import { statistic } from "../layers/ending/ending";
import { random } from "../random";

export function generatePlant(): Prop {
  const length = randn_bm(0, 1200, 1);
  const angle = (random() * Math.PI) / 2;
  const x = Math.cos(angle) * length;
  const y = Math.sin(angle) * length;

  if (random() > 0.75) return generateGrassProp(getGrass(getRandomPlantId()), x, y);
  else return generateGrassProp(getGrass("grass"), x, y);
}

export function getRandomPlantId() {
  return ["red", "orange", "yellow", "skyblue", "blue", "purple", "white"][Math.floor(random() * 7)];
}

export function checkDropToSeed(potion: Potion, pos: { x: number, y: number }): Prop | undefined {
  const arr = get(potiondropResult);
  const result: typeof arr = [];
  const used: typeof arr = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].potion !== potion) {
      result.push(arr[i]);
      continue;
    }
    if (attached(pos, arr[i].pos)) {
      used.push(arr[i]);
    }
    if (used.length === 3) break;
  }
  if (used.length !== 3) result.push(...used);
  potiondropResult.set(result);
  
  if (used.length === 3) return new Prop({
    img: getSpriteRes("grass", [152, 111, 4, 4]),
    state: {tag: "seed", potion, pos: [pos.x, pos.y, 8, 8]},
    onDayEnd: (state) => {
      addProps(new Prop(generateGrassProp(
        getRandomPotionGrass(state.potion),
        state.pos[0],
        state.pos[1]
      )))
      return false;
    }
  })
}

function attached(
  { x: x1, y: y1 }: { x: number; y: number },
  { x: x2, y: y2 }: { x: number; y: number },
  range: number = 20
) {
  return (
    x1 - x2 < range && x2 - x1 < range && y1 - y2 < range && y2 - y1 < range
  );
}

export function generateGrassProp(grass: Grass, x: number, y: number): Prop {
  return makeGrabbableProp(
    getSpriteRes(grass.img, grass.source),
    [0, 0, 40, 40],
    { pos: [x, y, 40, 40], amountTime: 3 },
    {
      onDayEnd: (state) => {
        if (typeof state.amountTime !== "number") return false;
        state.amountTime -= 1;
        if (state.amountTime === 0) return false;
        return true;
      },
      onWheelUp: (state) => {
        const pot = attachedTag("pot")?.[0];
        if (pot) {
          const done = addGrass(pot, grass);
          if (!done) return true;
          
          statistic.grass++;
          playSoundSFX("prop/plant");
          return undefined;
        }
        return true;
      },
    }
  );
}

const randn_bm = (min: number, max: number, skew: number) => {
  var u = 0,
    v = 0;
  while (u === 0) u = random(); //Converting [0,1) to (0,1)
  while (v === 0) v = random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) num = randn_bm(min, max, skew); // resample between 0 and 1 if out of range
  num = Math.pow(num, skew); // Skew
  num *= max - min; // Stretch to fill range
  num += min; // offset to min
  return num;
};
