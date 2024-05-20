import { get } from "svelte/store";
import { getRes } from "../../assets/image";
import { addProps, dayEnd, dayStarted, newProp } from "./prop";
import {
  HealthBarExtraHeight,
  characterPos,
  enteredEndingTime,
  generatedEnding,
  health,
  lastCharacterPos,
  maxHealth,
  nowEnding,
  state,
  statesEnteredTime,
} from "../gamevalues";
import { latestT, type Coord } from "../values";
import { generatePlant, resolvePotionDropResult } from "./plant";
import { makePot } from "./pot";
import { makeBucket } from "./bucket";
import { makeBottle } from "./bottle";
import { makeBooks } from "./books";
import { getSoundRes, playSoundSFX } from "../../assets/sound";
import { makeSoundObjects } from "./soundObjects";

export function settingHouseProps() {
  makeHouse();
  makeRoof();
  makeFloor();
  makePond();
  makePot();
  makeBucket();
  makeBottle();
  makeBooks();
  makeSoundObjects();
}
function makeHouse() {
  addProps(
    newProp({
      img: getRes("prop/rpg"),
      source: [0, 192, 32, 64],
      pos: [80, 80, 48, 96],
      display: "always",
      onClick: () => {
        changeAwakenState(get(latestT));
        if (get(state) === "awake") playSoundSFX("prop/house");
        else playSoundSFX("prop/house_close");
        return true;
      },
    })
  );
}
export function changeAwakenState(time: number) {
  const current = get(state);
  lastCharacterPos.set(get(characterPos));
  if (current === "awake") {
    state.set("sleep");
    statesEnteredTime.set(time);
    dayEnd();
    [
      generatePlant(),
      generatePlant(),
      generatePlant(),
      ...resolvePotionDropResult(),
    ].forEach((p) => {
      addProps(p);
    });
    if (get(maxHealth) === 6000 && !get(generatedEnding)) {
      generatedEnding.set(true);
      addProps(
        newProp({
          img: getRes("ui"),
          source: [116, 140, 8, 6],
          pos: [300, 40, 16, 12],
          onClick: () => {
            nowEnding.set(true);
            enteredEndingTime.set(get(latestT));
            HealthBarExtraHeight.set(300);
            return false;
          },
        })
      );
    }
    getSoundRes("bgm").volume(0.5);
  } else if (current === "sleep") {
    state.set("awake");
    statesEnteredTime.set(time);
    dayStarted();
    getSoundRes("bgm").volume(1);
  }
}
function makeRoof() {
  addProps(
    newProp({
      img: getRes("prop/house"),
      source: [89, 49, 205, 289],
      pos: [110, 110, 180, 260],
      layer: "roof",
    })
  );
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
  posDatas.forEach((p) => {
    addProps(
      newProp({
        img: getRes("prop/rpgtile"),
        source: [192, 0, 32, 32],
        pos: p,
        layer: "floor",
      })
    );
  });
}

function makePond() {
  addProps(
    newProp({
      img: getRes("prop/pond"),
      source: [9, 70, 81, 78],
      pos: [800, 670, 162, 156],
      layer: "floor",
      state: { tag: "pond" },
    })
  );
}
