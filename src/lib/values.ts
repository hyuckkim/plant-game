import { get, writable } from "svelte/store";

export const mouseX = writable(0);
export const mouseY = writable(0);
export const latestT = writable(0);
