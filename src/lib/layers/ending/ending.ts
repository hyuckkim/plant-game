import { get } from "svelte/store";
import { maxHealth, initializeMaxHealth, generatedEnding } from "../../gamevalues";
import { newProp, type Prop } from "../../objects/prop";
import { getRes } from "../../../assets/image";
import { drawPanel } from "../ui";
import { getText } from "../../../assets/text";

export const requireEnding = () => 
  get(maxHealth) === initializeMaxHealth * 2 && !get(generatedEnding)

export function endingObject(): Prop | undefined {
  if (get(generatedEnding) === true) return undefined;
  generatedEnding.set(true);
  return newProp({
    img: getRes("prop/furniture"),
    source: [420, 674, 30, 54],
    state: { pos: [75, 152, 30, 54], ...statistic},
    ui: ({ context }, state) => {
      let drawLine = 207;
      const drawText = (text: string, size: number = 16) => {
        context.font = `${size}px Verdana`;
        context.fillText(text, 35, drawLine + size / 2);
        drawLine += size;
      }
      drawPanel(context, [
        state.pos[0] - 50,
        state.pos[1] + 30,
        350,
        300
      ]);
      context.save();
      context.fillStyle = "white";
      drawText(getText("ending"), 36);
      drawText("");
      drawText("");
      drawText(getText("ending_time", convertMillisecondsToTime(state.timems)));
      drawText(getText("ending_day", state.day));
      drawText(getText("ending_move", Math.trunc(state.move * 100) / 100));
      drawText(getText("ending_water", state.water));
      drawText(getText("ending_grass", state.grass));
      drawText(getText("ending_potion_drink", state.potion_drink));
      drawText(getText("ending_potion_seed", state.potion_seed));
      drawText(getText("ending_healing_sleep", Math.trunc(state.healing_sleep * 100) / 100));
      drawText(getText("ending_healing_potion", Math.trunc(state.healing_potion * 100) / 100));
      drawText(getText("ending_book", state.book));
      drawText("");
      drawText(getText("ending_thanks"));
      context.restore();
    },
    display: "always"
  });
}
function convertMillisecondsToTime(milliseconds: number) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const millisecondsPart = milliseconds % 1000;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}.${millisecondsPart.toString().padStart(3, '0')}`;
  return formattedTime;
}

export let statistic = {
  timems: 0,
  day: 0,
  move: 0,
  water: 0,
  grass: 0,
  potion_drink: 0,
  potion_seed: 0,
  healing_sleep: 0,
  healing_potion: 0,
  book: 0,
}
export function initializeStatistic() {
  statistic = {
    timems: 0,
    day: 0,
    move: 0,
    water: 0,
    grass: 0,
    potion_drink: 0,
    potion_seed: 0,
    healing_sleep: 0,
    healing_potion: 0,
    book: 0,
  };
}