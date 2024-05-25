import { spring } from "svelte/motion";
import { writable } from "svelte/store";

export const mouseX = writable(0);
export const mouseY = writable(0);
export const pos = spring(
  { x: 0, y: 0 },
  {
    stiffness: 0.5,
  }
);
export const rClick = writable(false);
export const latestT = writable(0);

export type Coord = [x: number, y: number, w: number, h: number];
export function addCoord(a: Coord, b: Coord): Coord {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]];
}
export type CanvasInfo = {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  time: number;
};

export enum mouseButtons {
  None = 0,
  Left = 1 << 0,
  Right = 1 << 1,
  WheelUp = 1 << 2,
  WheelDown = 1 << 3,
}
