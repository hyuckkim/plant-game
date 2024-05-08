import { get, writable } from "svelte/store";
import { getRes } from "../../assets/image";
import { drawExtendBar, drawPanel } from "../canvas/ui";
import { addProps, newProp } from "./prop";
import { type Grass } from "../data/grass";
import { drawSprite } from "../canvas/sprite";
import { latestT } from "../values";

export const maxWater = 3;
export const waterCount = writable(0);
export const potionCount = writable(0);

export const materials = writable<Grass[]>([]);
export const previousMaterials = writable<Grass[]>([]);
export const previousTime = writable(0);

export function initializePot() {
  waterCount.set(0);
  potionCount.set(0);

  materials.set([]);
  previousMaterials.set([]);
  previousTime.set(0);
}

export function makePot() {
  addProps(newProp({
    img: getRes("prop_furniture"),
    source: [1036, 646, 44, 82],
    pos: [150, 30, 53, 98],
    state: { tag: "pot" },
    ui: (canvas, _) => {
      canvas.context.save();
      drawPanel(canvas, [200, 10, 120, 120]);
      drawExtendBar(canvas, [320, 20, 3, 0], get(waterCount), 1);
      drawExtendBar(canvas, [320, 60, 3, 0], get(potionCount), 2);


      canvas.context.beginPath();
      canvas.context.rect(214, 24, 98, 98);
      canvas.context.clip();
      if (get(previousTime) !== 0 && canvas.time - get(previousTime) < 300) {
        const dt = canvas.time - get(previousTime);
        const m = get(previousMaterials);
        drawSprite(canvas.context, getRes(m[0].img), [260, 30 + dt / 300 * 120, 40, 40], m[0].source);
        drawSprite(canvas.context, getRes(m[1].img), [235, 60 + dt / 300 * 120, 40, 40], m[1].source);
        drawSprite(canvas.context, getRes(m[1].img), [285, 90 + dt / 300 * 120, 40, 40], m[2].source);
      } else {
        const m = get(materials);
        if (m.length >= 1) {
          drawSprite(canvas.context, getRes(m[0].img), [260, 30, 40, 40], m[0].source);
        }
        if (m.length >= 2) {
          drawSprite(canvas.context, getRes(m[1].img), [235, 60, 40, 40], m[1].source);
        }
        if (m.length >= 3) {
          drawSprite(canvas.context, getRes(m[2].img), [285, 90, 40, 40], m[2].source);
        }
      }
      canvas.context.closePath();
      canvas.context.restore();
    },
    onClick: () => {
      if (get(materials).length === 3) {
        previousMaterials.set(get(materials));
        materials.set([]);
        previousTime.set(get(latestT));
        potionCount.set(get(waterCount));
        waterCount.set(0);
      }
      return true;
    }
  }));

}

export function addGrass(grass: Grass): boolean {
  if (get(materials).length >= 3) return false;
  materials.set([...get(materials), grass]);
  return true;
}