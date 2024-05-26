import { writable } from "svelte/store";
import { addProps, initializeProps } from "./objects/prop";
import { settingHouseProps } from "./objects/house";
import { equips, initializeEquips } from "./objects/equip";
import { spring } from "svelte/motion";
import { particles } from "./particle";
import { generatePlant } from "./objects/plant";
import { initializeStatistic } from "./layers/ending/ending";

export const initializeMaxHealth = 5000;
export const maxHealth = writable(initializeMaxHealth);
export const health = writable(initializeMaxHealth);
export const state = writable<"awake" | "sleep">("sleep");
export const statesEnteredTime = writable(0);
export const characterPos = writable({ x: 0, y: 0 });
export const characterDir = writable(0);
export const lastCharacterPos = writable({ x: 0, y: 0 });
export const resetTry = writable(0);
export const drinkedPotions = writable<{ [potion: number]: number }>({});
export const request = writable<[string, string, string]>(["red", "red", "red"]);

export const seedText = writable("");
export const seed = writable(0);

export const bgm = writable((localStorage.getItem("bgm") !== "false"));
bgm.subscribe(v => {
  localStorage.setItem("bgm", v ? "true" : "false");
});
export const sfx = writable((localStorage.getItem("sfx") !== "false"));
sfx.subscribe(v => {
  localStorage.setItem("sfx", v ? "true" : "false");
});

export const generatedEnding = writable(false);
export const savedPosition = writable({ x: 0, y: 0 });
export const HealthBarExtraHeight = spring(300);

export function reset() {
  maxHealth.set(initializeMaxHealth);
  health.set(initializeMaxHealth);
  statesEnteredTime.set(0);
  state.set("sleep");
  equips.set(undefined);
  particles.set([]);
  resetTry.set(0);
  generatedEnding.set(false);
  savedPosition.set({ x: 0, y: 0 });
  drinkedPotions.set({});
  initializeStatistic();

  initializeProps();
  initializeEquips();

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
