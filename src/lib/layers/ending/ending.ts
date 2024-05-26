import { get } from "svelte/store";
import { maxHealth, initializeMaxHealth, generatedEnding, request } from "../../gamevalues";
import { Prop } from "../../objects/prop";
import { getRes, getSpriteRes } from "../../../assets/image";
import { drawItemPanel, drawPanel, drawThreeItemPanel } from "../ui";
import { getText } from "../../../assets/text";
import { drawSprite } from "../sprite";
import { getGrass } from "../../data/grass";
import { getRandomPlantId } from "../../objects/plant";

export const requireEnding = () => 
  get(maxHealth) === initializeMaxHealth * 2 && !get(generatedEnding)

export function endingObject(): [Prop, Prop] | undefined {
  if (get(generatedEnding) === true) return undefined;
  generatedEnding.set(true);
  const trophy = new Prop({
    img: getSpriteRes("prop/furniture", [420, 674, 30, 54]),
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

  const moreUI = new Prop({
    img: getSpriteRes("prop/rpg", [259, 482, 26, 29]),
    state: { pos: [220, 50, 39, 43]},
    ui: ({ context }, state) => {
      let drawLine = 44;
      const drawText = (text: string, size: number = 16) => {
        context.font = `${size}px Verdana`;
        context.fillText(text, 263, drawLine + size / 2);
        drawLine += size;
      }
      drawPanel(context, [
        state.pos[0] + 30,
        state.pos[1] - 30,
        200,
        250
      ]);
      context.save();
      context.fillStyle = "white";
      drawText(getText("endless_title"), 30);
      drawText(getText("endless_text_1"));
      drawText(getText("endless_text_2"));
      drawText("");
      drawText("");
      drawText("");
      drawText(getText("ending_day", statistic.day));
      drawText(getText("ending_more", statistic.more));
      drawThreeItemPanel(context, [state.pos[0] + 44, state.pos[1] + 144, 172, 60]);
      drawSprite(context, getRes("prop/flower"), [state.pos[0] + 74, state.pos[1] + 174, 40, 40], getGrass(get(request)[0]).source);
      drawSprite(context, getRes("prop/flower"), [state.pos[0] + 126, state.pos[1] + 174, 40, 40], getGrass(get(request)[1]).source);
      drawSprite(context, getRes("prop/flower"), [state.pos[0] + 178, state.pos[1] + 174, 40, 40], getGrass(get(request)[2]).source);
      context.restore();
    }
  });

  request.set([
    getRandomPlantId(),
    getRandomPlantId(),
    getRandomPlantId()
  ]);
  return [trophy, moreUI];
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
  more: 0,
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
    more: 0,
  };
}