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
    color: { r: 33, g: 80, b: 29 },
    grass: ["red", "orange", "yellow", "skyblue", "blue", "purple", "white"]
  },
  {
    id: 2,
    color: { r: 108, g: 0, b: 17 },
    grass: ["red"]
  },
  {
    id: 3,
    color: { r: 216, g: 0, b: 35 },
    grass: ["red", "orange"]
  },
  {
    id: 8,
    color: { r: 171, g: 94, b: 23 },
    grass: ["orange"]
  },
  {
    id: 12,
    color: { r: 255, g: 143, b: 40 },
    grass: ["orange", "yellow"]
  },
  {
    id: 32,
    color: { r: 186, g: 137, b: 0 },
    grass: ["yellow"]
  },
  {
    id: 48,
    color: { r: 255, g: 195, b: 0 },
    grass: ["yellow", "skyblue"]
  },
  {
    id: 128,
    color: { r: 84, g: 163, b: 163 },
    grass: ["skyblue"]
  },
  {
    id: 192,
    color: { r: 84, g: 209, b: 209 },
    grass: ["skyblue", "blue"]
  },
  {
    id: 512,
    color: { r: 43, g: 18, b: 127 },
    grass: ["blue"]
  },
  {
    id: 768,
    color: { r: 83, g: 40, b: 225 },
    grass: ["blue", "purple"]
  },
  {
    id: 2048,
    color: { r: 90, g: 16, b: 115 },
    grass: ["purple"]
  },
  {
    id: 3072,
    color: { r: 94, g: 17, b: 121 },
    grass: ["purple", "white"]
  },
  {
    id: 8192,
    color: { r: 179, g: 194, b: 229 },
    grass: ["white"]
  },
  {
    id: 12288,
    color: { r: 247, g: 249, b: 252 },
    grass: ["white", "red"]
  },
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