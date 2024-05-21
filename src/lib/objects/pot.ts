import { get, writable } from "svelte/store";
import { getRes } from "../../assets/image";
import { drawExtendBar, drawItemPanel, drawPanel } from "../layers/ui";
import { addProps, newProp, type Prop } from "./prop";
import { type Grass } from "../data/grass";
import { drawSprite } from "../layers/sprite";
import { latestT } from "../values";
import { getPotion, type Potion } from "../data/potion";
import { createBottleData } from "./bottle";
import { playSoundSFX } from "../../assets/sound";

export const maxWater = 3;

export function makePot() {
  addProps(
    newProp({
      img: getRes("prop/furniture"),
      source: [1036, 646, 44, 82],
      pos: [150, 30, 53, 98],
      state: {
        tag: "pot",
        water: 0,
        potion: 0,
        
        potionTag: undefined,
        potionImage: undefined,
        materials: [],
        oldMaterials: [],
        oldTime: 0,
      },
      ui: (canvas, state) => {
        canvas.context.save();
        drawPanel(canvas, [200, 10, 120, 120]);
        drawExtendBar(canvas, [320, 20, 3, 0], state.water, 1);
        drawExtendBar(canvas, [320, 60, 3, 0], state.potion, 2);
        drawItemPanel(canvas, [324, 100, 60, 60]);

        if (state.potionTag) {
          drawSprite(
            canvas.context,
            state.potionImage,
            [354, 134, 40, 40],
            [0, 0, 16, 16]
          );
          drawSprite(
            canvas.context,
            getRes("prop/potion"),
            [354, 134, 40, 40],
            [96, 0, 16, 16]
          );
        }

        canvas.context.beginPath();
        canvas.context.rect(214, 24, 98, 98);
        canvas.context.clip();
        const isDropNow = state.oldTime !== 0 && canvas.time - state.oldTime < 300;
        if (isDropNow) {
          const dt = canvas.time - state.oldTime;
          const m = state.oldMaterials;
          drawSprite(
            canvas.context,
            getRes(m[0].img),
            [260, 30 + (dt / 300) * 120, 40, 40],
            m[0].source
          );
          drawSprite(
            canvas.context,
            getRes(m[1].img),
            [235, 60 + (dt / 300) * 120, 40, 40],
            m[1].source
          );
          drawSprite(
            canvas.context,
            getRes(m[2].img),
            [285, 90 + (dt / 300) * 120, 40, 40],
            m[2].source
          );
        } else {
          const m = state.materials;
          if (m.length >= 1) {
            drawSprite(
              canvas.context,
              getRes(m[0].img),
              [260, 30, 40, 40],
              m[0].source
            );
          }
          if (m.length >= 2) {
            drawSprite(
              canvas.context,
              getRes(m[1].img),
              [235, 60, 40, 40],
              m[1].source
            );
          }
          if (m.length >= 3) {
            drawSprite(
              canvas.context,
              getRes(m[2].img),
              [285, 90, 40, 40],
              m[2].source
            );
          }
        }
        canvas.context.closePath();
        canvas.context.restore();
      },
      onClick: (state) => {
        const material = state.materials;
        if (material.length === 3) {
          state.oldMaterials = material;
          const gotPotion = getPotion(
            material[0].dataNum + material[1].dataNum + material[2].dataNum
          );
          state.potionTag = gotPotion;
          if (gotPotion) {
            state.potionImage =
              createBottleData(
                gotPotion.color.r,
                gotPotion.color.g,
                gotPotion.color.b
              );
          }
          state.materials = [];
          state.oldTime = get(latestT);
          state.potion = state.water;
          state.water = 0;
          if (state.potion === 0) state.potionTag = undefined;
          playSoundSFX("prop/machine");
        }
        return true;
      },
    })
  );
}

export function addWater(pot: Prop): boolean {
  if (pot.state.water === maxWater) return false;
  pot.state.water += 1;
  return true;
}

export function addGrass(pot: Prop, grass: Grass): boolean {
  if (pot.state.materials.length >= 3) return false;
  pot.state.materials = [...pot.state.materials, grass];
  return true;
}

export function getMadenPotion(pot: Prop): Potion | undefined {
  const potion = pot.state.potionTag;
  if (potion) pot.state.potion -= 1;
  if (pot.state.potion === 0) pot.state.potionTag = undefined;
  return potion;
}
