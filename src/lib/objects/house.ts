import { get } from "svelte/store";
import { getSpriteRes } from "../../assets/image";
import { addProps, dayEnd, dayStarted, Prop } from "./prop";
import {
  characterPos,
  lastCharacterPos,
  state,
  statesEnteredTime,
} from "../gamevalues";
import { latestT, type Coord } from "../values";
import { generatePlant } from "./plant";
import { makePot } from "./pot";
import { makeBucket } from "./bucket";
import { makeBottle } from "./bottle";
import { makeBooks } from "./books";
import { getSoundRes, playSoundSFX } from "../../assets/sound";
import { makeSoundObjects } from "./soundObjects";
import { endingObject, requireEnding, statistic } from "../layers/ending/ending";
import { getPotion, potiondropResult } from "../data/potion";

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
    new Prop({
      img: getSpriteRes("prop/rpg", [0, 192, 32, 64]),
      display: "always",
      state: {pos: [80, 80, 48, 96]},
      click_order: -1,
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
    potiondropResult.set([]);
    dayEnd();
    [
      generatePlant(),
      generatePlant(),
      generatePlant(),
      generatePlant(),
      generatePlant(),
    ].forEach((p) => {
      addProps(p);
    });
    if (requireEnding()) {
      const obj = endingObject();
      if (obj !== undefined) addProps(obj);
    }
    getSoundRes("bgm").volume(0.5);
  } else if (current === "sleep") {
    state.set("awake");
    statesEnteredTime.set(time);
    dayStarted();
    getSoundRes("bgm").volume(1);
    statistic.day++;
  }
}
function makeRoof() {
  addProps(
    new Prop({
      img: getSpriteRes("prop/house", [89, 49, 205, 289]),
      state: { pos: [110, 110, 180, 260]},
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
      new Prop({
        img: getSpriteRes("prop/rpgtile", [192, 0, 32, 32]),
        state: { pos: p },
        layer: "floor",
      })
    );
  });
}

function makePond() {
  addProps(
    new Prop({
      img: getSpriteRes("prop/pond", [9, 70, 81, 78]),
      layer: "floor",
      state: { pos: [800, 670, 162, 156], tag: "pond", watering: 1 },
      onDayEnd: (state) => {
        state.watering = 1;
        return true;
      }
    })
  );
}
export function pondWatering(p: Prop) {
  if (p.state.watering === 1) {
    p.state.watering = 0;
    return getPotion(-1);
  }
  return undefined;
}