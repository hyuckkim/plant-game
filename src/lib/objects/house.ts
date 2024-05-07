import { get } from "svelte/store";
import { getRes } from "../../assets/image";
import { addProps, dayEnd, dayStarted, newProp } from "./prop";
import { characterPos, lastCharacterPos, state, statesEnteredTime } from "../gamevalues";
import { latestT, type Coord } from "../values";
import { generatePlant } from "./plant";

export function settingHouseProps() {
  makeHouse();
  makeRoof();
  makeFloor();
  makePond();
}
function makeHouse() {
  addProps(newProp({
    img: getRes("prop_houseprop"),
    source: [0, 192, 32, 64],
    pos: [80, 80, 48, 96],
    display: "always",
    onClick: () => {
      changeAwakenState(get(latestT));
      return true;
    }
  }));
}
function changeAwakenState(time: number) {
  const current = get(state);
  lastCharacterPos.set(get(characterPos));
  if (current === "awake") {
    state.set("sleep");
    statesEnteredTime.set(time);
    dayEnd();

    addProps(generatePlant());
    addProps(generatePlant());
    addProps(generatePlant());
  } else if (current === "sleep") {
    state.set("awake");
    statesEnteredTime.set(time);
    dayStarted();
  }
}
function makeRoof() {
  addProps(newProp({
    img: getRes("prop_house"),
    source: [89, 49, 205, 289],
    pos: [110, 110, 180, 260],
    layer: "roof",
  }));
}
function makeFloor() {
  const posDatas: Coord[] = [
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

function makePond() {
  addProps(newProp({
    img: getRes("prop_pond"),
    source: [9, 70, 81, 78],
    pos: [900, 720, 162, 156],
    layer: "floor",
  }))
}