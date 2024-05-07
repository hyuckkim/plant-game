import { writable } from "svelte/store";
import { spring } from "svelte/motion";
import { initializeProps } from "./objects/prop";
import { settingHouseProps } from "./objects/house";
import { initializeEquips } from "./objects/equip";

export const maxHealth = 3000;
export const health = writable(maxHealth);
export const state = writable<"awake" | "sleep" | "none">("none");
export const statesEnteredTime = writable(0);
export const characterPos = spring({ x: 0, y: 0 }, {
  stiffness: 0.5
});
export const characterReady = writable(false);
export const lastCharacterPos = writable({ x: 0, y: 0 });

export function reset() {
  health.set(maxHealth);
  statesEnteredTime.set(0);
  state.set("none");

  initializeProps();
  initializeEquips();
  
  settingHouseProps();
}
