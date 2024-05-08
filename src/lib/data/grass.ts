import type { Resources } from "../../assets/image";
import type { Coord } from "../values"

export type Grass = {
  name: string,
  img: keyof Resources,
  source: Coord,
  dataNum: number,
}
export function getGrass(name: string) {
  const found = grass.filter(g => g.name === name)[0];
  if (!found) throw Error(`cannot found grass (${name})`);
  return found;
}
export const grass: Grass[] = [
  {
    name: "grass",
    img: "prop_flower_tile",
    source: [96, 16, 16, 16],
    dataNum: 0,
  }
]