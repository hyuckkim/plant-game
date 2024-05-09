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
      r: 0,
      g: 0,
      b: 0
    }
  }
];