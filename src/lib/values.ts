import { get, writable } from "svelte/store";

export const mouseX = writable(0);
export const mouseY = writable(0);
export const latestT = writable(0);

export type Coord = [x: number, y: number, w: number, h: number];
export function addCoord(a: Coord, b: Coord): Coord {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}