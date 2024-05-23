import { get } from "svelte/store";
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
      state: {
        tag: "pot",
        water: 0,
        potion: 0,
        pos: [150, 30, 53, 98],
        
        potionTag: undefined,
        potionImage: undefined,
        materials: [],
        oldMaterials: [],
        oldTime: 0,
      },
      ui: ({ context, time }, state) => {
        context.save();
        drawPanel(context, [200, 10, 120, 120]);
        drawExtendBar(context, [320, 20, 3, 0], state.water, 1);
        drawExtendBar(context, [320, 60, 3, 0], state.potion, 2);
        drawItemPanel(context, [324, 100, 60, 60]);

        if (state.potionTag) {
          drawSprite(
            context,
            state.potionImage,
            [354, 134, 40, 40],
            [0, 0, 16, 16]
          );
          drawSprite(
            context,
            getRes("prop/potion"),
            [354, 134, 40, 40],
            [96, 0, 16, 16]
          );
        }

        context.beginPath();
        context.rect(214, 24, 98, 98);
        context.clip();
        const isDropNow = state.oldTime !== 0 && time - state.oldTime < 300;
        if (isDropNow) {
          const dt = time - state.oldTime;
          const m = state.oldMaterials;
          drawSprite(
            context,
            getRes(m[0].img),
            [260, 30 + (dt / 300) * 120, 40, 40],
            m[0].source
          );
          drawSprite(
            context,
            getRes(m[1].img),
            [235, 60 + (dt / 300) * 120, 40, 40],
            m[1].source
          );
          drawSprite(
            context,
            getRes(m[2].img),
            [285, 90 + (dt / 300) * 120, 40, 40],
            m[2].source
          );
        } else {
          const m = state.materials;
          if (m.length >= 1) {
            drawSprite(
              context,
              getRes(m[0].img),
              [260, 30, 40, 40],
              m[0].source
            );
          }
          if (m.length >= 2) {
            drawSprite(
              context,
              getRes(m[1].img),
              [235, 60, 40, 40],
              m[1].source
            );
          }
          if (m.length >= 3) {
            drawSprite(
              context,
              getRes(m[2].img),
              [285, 90, 40, 40],
              m[2].source
            );
          }
        }
        context.closePath();
        context.restore();
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
              createBottleData(gotPotion.color);
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
