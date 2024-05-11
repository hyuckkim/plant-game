import { get, writable } from "svelte/store";
import { getRes } from "../../assets/image";
import { equips, makeGrabbableProp } from "./equip";
import { addProps, attachedTag, newProp, props } from "./prop";
import { potionDrop, type Potion } from "../data/potion";
import { getMadenPotion } from "./pot";
import { addCoord, latestT, type Coord } from "../values";
import { characterPos } from "../gamevalues";
import { drawSprite } from "../layers/sprite";

export const bottlePotion = writable<Potion | undefined>();
export const amountPotion = writable(10);
export const bottleImgData = writable<HTMLImageElement>();

function addNoise(pos: {x: number, y: number }) {
  return {x: pos.x + (Math.random() * 6 - 3), y: pos.y + (Math.random() * 6 - 3)};
}
export function makeBottle() {
  const bottle = makeGrabbableProp(
    ({ context, pos }) => {
      const bottle = get(bottlePotion);
      if (bottle) {
        context.save();
        context.beginPath();
        context.rect(pos[0] - pos[2] / 2, (pos[1] - pos[3] / 2) + pos[3] / 10 * (10 - get(amountPotion)), pos[2], pos[3] * get(amountPotion));
        context.clip();
        drawSprite(context, get(bottleImgData), pos, [0, 0, 16, 16]);
        context.closePath();
        context.restore();
      }
      drawSprite(context, getRes("prop_potion_empty"), pos, [96, 0, 16, 16]);
      
    },
    [96, 0, 16, 16],
    [75, 170, 40, 40],
    [0, 3, 40, 40],
    {},
    {
      onWheelDown: () => {
        const potion = get(bottlePotion);
        if (potion === undefined) {
          if (attachedTag("pot")) {
            const newPotion = getMadenPotion();
            bottlePotion.set(newPotion);
            if (newPotion) {
              bottleImgData.set(createBottleData(newPotion.color.r, newPotion.color.g, newPotion.color.b));
              amountPotion.set(10);
            }
          }
        } else {
          addNewPotionDrop(potion);
          amountPotion.set(get(amountPotion) - 1);
          if (get(amountPotion) === 0) bottlePotion.set(undefined);
        }
        return true;
      }
    }
  );

  addProps(newProp({
    img: getRes("prop_houseprop"),
    source: [0, 256, 32, 32],
    pos: [75, 180, 48, 48],
    layer: "floor",
  }))
  addProps(bottle);
}

export function getBottlePos(): Coord {
  const chara = get(characterPos);
  const equip = get(equips);
  if (equip && equip.img === getRes("prop_potion_empty")) {
    return addCoord([chara.x, chara.y, 0, 0], equip.pos);
  }
  else {
    return get(props)
      .filter(p => p.img === getRes("prop_potion_empty"))[0]
      .pos;
  }
}

export function createBottleData(r: number, g: number, b: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw Error("cannot create other canvas");
  ctx.clearRect(0, 0, 16, 16);
  ctx.drawImage(getRes("prop_potion_empty"), 96, 16, 16, 16, 0, 0, 16, 16);
  const data = ctx.getImageData(0, 0, 16, 16);
  for (let i = 0; i < data.width * data.height; i++) {
    data.data[i * 4 + 0] = r;
    data.data[i * 4 + 1] = g;
    data.data[i * 4 + 2] = b;
  }
  ctx.putImageData(data, 0, 0);
  const img = new Image();
  img.src = canvas.toDataURL("image/png");
  return img;
}

export function addNewPotionDrop(potion: Potion) {
  potionDrop.set([...get(potionDrop), { time: get(latestT), pos: addNoise(get(characterPos)), potion}]);
}