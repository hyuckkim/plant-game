import { writable } from "svelte/store";

export type Particle = {
  x: number;
  y: number;
  t: number;
};

export const particles = writable<Particle[]>([]);
