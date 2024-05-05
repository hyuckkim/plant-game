import { get, writable } from "svelte/store";
import { getRes } from "../assets/image";
import { spring } from "svelte/motion";
import { addProps, initializeProps, moveDays, newProp } from "./objects/prop";
import { latestT } from "./values";

export const maxHealth = 3000;
export const health = writable(maxHealth);
export const state = writable<"awake" | "sleep" | "none">("none");
export const statesEnteredTime = writable(0);
export const characterPos = spring({ x: 0, y: 0 }, {
  stiffness: 0.5
});
export const lastCharacterPos = writable({ x: 0, y: 0 });

export function reset() {
  health.set(maxHealth);
  statesEnteredTime.set(0);
  state.set("none");
  initializeProps();
  addProps(newProp({
    img: getRes("prop_bed"),
    source: [64, 0, 32, 64],
    pos: [80, 80, 48, 96],
    display: "always",
    onClick: () => {
      changeAwakenState(get(latestT))
      return true;
    }
  }));
  addProps(newProp({
    img: getRes("prop_house"),
    source: [89, 49, 205, 289],
    pos: [110, 110, 180, 260],
    layer: "roof",
  }));
  addFloor();
}

function addFloor() {
  const posDatas: [x: number, y: number, w: number, h: number][] = [
    [60, 50, 48, 48],
    [108, 50, 48, 48],
    [156, 50, 48, 48],
    [60, 98, 48, 48],
    [108, 98, 48, 48],
    [156, 98, 48, 48],
    [60, 146, 48, 48],
    [108, 146, 48, 48],
    [156, 146, 48, 48],
    [60, 194, 48, 48],
    [108, 194, 48, 48],
    [156, 194, 48, 48],
  ];
  posDatas.forEach(p => {
    addProps(newProp({
      img: getRes("prop_tile"),
      source: [192, 0, 32, 32],
      pos: p,
      layer: "floor",
    }));
  })
}

export function resetCharacterPos(x: number, y: number) {
  characterPos.set({x, y});
} 

export function changeAwakenState(time: number) {
  const current = get(state);
  lastCharacterPos.set(get(characterPos));
  if (current === "awake") {
    moveDays();
    state.set("sleep");
    statesEnteredTime.set(time);
  } else if (current === "sleep") {
    state.set("awake");
    statesEnteredTime.set(time);
  }
}
