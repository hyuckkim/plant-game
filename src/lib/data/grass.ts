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
    img: "prop/flower",
    source: [96, 16, 16, 16],
    dataNum: 0,
  },
  {
    name: "red",
    img: "prop/flower",
    source: [112, 144, 16, 16],
    dataNum: 1,
  },
  {
    name: "orange",
    img: "prop/flower",
    source: [94, 112, 16, 16],
    dataNum: 4,
  },
  {
    name: "yellow",
    img: "prop/flower",
    source: [64, 65, 16, 16],
    dataNum: 16,
  },
  {
    name: "skyblue",
    img: "prop/flower",
    source: [32, 96, 16, 16],
    dataNum: 64,
  },
  {
    name: "blue",
    img: "prop/flower",
    source: [48, 96, 16, 16],
    dataNum: 256,
  },
  {
    name: "purple",
    img: "prop/flower",
    source: [96, 0, 16, 16],
    dataNum: 1024,
  },
  {
    name: "white",
    img: "prop/flower",
    source: [64, 32, 16, 16],
    dataNum: 4096,
  },
];