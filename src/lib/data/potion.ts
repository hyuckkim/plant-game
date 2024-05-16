import { writable } from "svelte/store";
import { getGrass, type Grass } from "./grass";

export type Potion = {
  id: number,
  color: {r: number, g: number, b: number},
  grass: string[]
}

export function getPotion(id: number): Potion {
  const catched = potion.filter(p => p.id === id)[0];
  if (catched) return catched;
  return potion.filter(p => p.id === 0)[0];
}

export const potion: Potion[] = [
  {
    id: 0,
    color: {
      r: 33,
      g: 80,
      b: 29
    },
    grass: ["red", "orange", "yellow"]
  }
];
export function getRandomPotionGrass(p: Potion): Grass {
  const names = p.grass;
  return getGrass(names[Math.floor(Math.random() * names.length)]);
}

export const potionDrop = writable<{
  time: number,
  pos: { x: number, y: number },
  potion: Potion,
  direction?: number,
}[]>([]);

export const potiondropResult = writable<{
  potion: Potion,
  pos: { x: number, y: number },
}[]>([]);