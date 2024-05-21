import { writable } from "svelte/store";
import { addProps, initializeProps } from "./objects/prop";
import { settingHouseProps } from "./objects/house";
import { equips, initializeEquips } from "./objects/equip";
import { initializeBottle } from "./objects/bottle";
import { spring } from "svelte/motion";
import { particles } from "./particle";
import { generatePlant } from "./objects/plant";

export const initializeMaxHealth = 5000;
export const maxHealth = writable(initializeMaxHealth);
export const health = writable(initializeMaxHealth);
export const state = writable<"awake" | "sleep">("sleep");
export const statesEnteredTime = writable(0);
export const characterPos = writable({ x: 0, y: 0 });
export const characterDir = writable(0);
export const lastCharacterPos = writable({ x: 0, y: 0 });
export const sfx = writable(true);

export const generatedEnding = writable(false);
export const gotEnding = writable(false);
export const nowEnding = writable(false);
export const enteredEndingTime = writable(0);
export const endingSequence = writable(0);
export const savedPosition = writable({ x: 0, y: 0 });

export const HealthBarExtraHeight = spring(300);
export function reset() {
  health.set(initializeMaxHealth);
  statesEnteredTime.set(0);
  state.set("sleep");
  equips.set(undefined);
  particles.set([]);
  sfx.set(true);

  initializeProps();
  initializeEquips();
  initializeBottle();

  settingHouseProps();
  [
    generatePlant(),
    generatePlant(),
    generatePlant(),
    generatePlant(),
    generatePlant(),
  ].forEach((p) => {
    addProps(p);
  });
}
