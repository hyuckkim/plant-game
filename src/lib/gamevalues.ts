import { writable } from "svelte/store";
import { initializeProps } from "./objects/prop";
import { settingHouseProps } from "./objects/house";
import { equips, initializeEquips } from "./objects/equip";
import { initializePot } from "./objects/pot";
import { initializeBottle } from "./objects/bottle";

export const maxHealth = writable(3000);
export const health = writable(3000);
export const state = writable<"awake" | "sleep">("sleep");
export const statesEnteredTime = writable(0);
export const characterPos = writable({x: 0, y: 0});
export const characterDir = writable(0);
export const lastCharacterPos = writable({ x: 0, y: 0 });
export const sfx = writable(true);

export function reset() {
  health.set(3000);
  statesEnteredTime.set(0);
  state.set("sleep");
  equips.set(undefined);
  sfx.set(true);

  initializeProps();
  initializeEquips();
  initializePot();
  initializeBottle();
  
  settingHouseProps();
}
