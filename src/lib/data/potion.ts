import { writable } from "svelte/store";

export type Potion = {
  id: number,
  color: {r: number, g: number, b: number},
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
    }
  }
];

export const potionDrop = writable<{
  time: number,
  pos: { x: number, y: number },
  potion: Potion,
  direction?: number,
}[]>([]);