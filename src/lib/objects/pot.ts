import { get, writable } from "svelte/store";
import { getRes } from "../../assets/image";
import { drawExtendBar, drawItemPanel, drawPanel } from "../layers/ui";
import { addProps, newProp } from "./prop";
import { type Grass } from "../data/grass";
import { drawSprite } from "../layers/sprite";
import { latestT } from "../values";
import { getPotion, type Potion } from "../data/potion";
import { createBottleData } from "./bottle";
import { playSoundSFX } from "../../assets/sound";

export const maxWater = 3;
export const waterCount = writable(0);
export const potionCount = writable(0);

export const materials = writable<Grass[]>([]);
export const previousMaterials = writable<Grass[]>([]);
export const previousTime = writable(0);
export const madenPotion = writable<Potion | undefined>(undefined);
export const potPotionData = writable<HTMLImageElement>();

export function initializePot() {
  waterCount.set(0);
  potionCount.set(0);

  materials.set([]);
  previousMaterials.set([]);
  previousTime.set(0);
  madenPotion.set(undefined);
}

export function makePot() {
  addProps(
    newProp({
      img: getRes("prop/furniture"),
      source: [1036, 646, 44, 82],
      pos: [150, 30, 53, 98],
      state: { tag: "pot" },
      ui: (canvas, _) => {
        canvas.context.save();
        drawPanel(canvas, [200, 10, 120, 120]);
        drawExtendBar(canvas, [320, 20, 3, 0], get(waterCount), 1);
        drawExtendBar(canvas, [320, 60, 3, 0], get(potionCount), 2);
        drawItemPanel(canvas, [324, 100, 60, 60]);

        const potion = get(madenPotion);
        if (potion) {
          drawSprite(
            canvas.context,
            get(potPotionData),
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
        if (get(previousTime) !== 0 && canvas.time - get(previousTime) < 300) {
          const dt = canvas.time - get(previousTime);
          const m = get(previousMaterials);
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
          const m = get(materials);
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
      onClick: () => {
        const material = get(materials);
        if (material.length === 3) {
          previousMaterials.set(material);
          const gotPotion = getPotion(
            material[0].dataNum + material[1].dataNum + material[2].dataNum
          );
          madenPotion.set(gotPotion);
          if (gotPotion) {
            potPotionData.set(
              createBottleData(
                gotPotion.color.r,
                gotPotion.color.g,
                gotPotion.color.b
              )
            );
          }
          materials.set([]);
          previousTime.set(get(latestT));
          potionCount.set(get(waterCount));
          waterCount.set(0);
          if (get(potionCount) === 0) madenPotion.set(undefined);
          playSoundSFX("prop/machine");
        }
        return true;
      },
    })
  );
}

export function addGrass(grass: Grass): boolean {
  if (get(materials).length >= 3) return false;
  materials.set([...get(materials), grass]);
  return true;
}

export function getMadenPotion(): Potion | undefined {
  const potion = get(madenPotion);
  if (potion) potionCount.set(get(potionCount) - 1);
  if (get(potionCount) === 0) madenPotion.set(undefined);
  return potion;
}
