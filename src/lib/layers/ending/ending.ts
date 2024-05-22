import { get } from "svelte/store";
import { maxHealth, initializeMaxHealth, generatedEnding, HealthBarExtraHeight, enteredEndingTime, nowEnding, endingSequence, characterPos, gotEnding } from "../../gamevalues";
import { newProp, type Prop } from "../../objects/prop";
import { getRes } from "../../../assets/image";
import { latestT } from "../../values";
import { changeAwakenState } from "../../objects/house";

export const requireEnding = () => 
  get(maxHealth) === initializeMaxHealth * 2 && !get(generatedEnding)

export function endingObject(): Prop | undefined {
  if (get(generatedEnding) === true) return undefined;
  generatedEnding.set(true);
  return newProp({
    img: getRes("ui"),
    source: [116, 140, 8, 6],
    state: { pos: [300, 40, 16, 12]},
    onClick: () => {
      nowEnding.set(true);
      enteredEndingTime.set(get(latestT));
      HealthBarExtraHeight.set(300);
      return false;
    },
  });
}

export const isEndEndingClick = () =>
  get(nowEnding) && get(endingSequence) === 1 && get(characterPos).y > window.innerHeight - 50;

export function endEnding() {
  nowEnding.set(false);
  gotEnding.set(true);
  changeAwakenState(get(latestT));
}