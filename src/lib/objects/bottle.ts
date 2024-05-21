import { get, writable } from "svelte/store";
import { getRes } from "../../assets/image";
import { makeGrabbableProp } from "./equip";
import { addProps, attachedTag, newProp } from "./prop";
import { potionDrop, type Potion } from "../data/potion";
import { getMadenPotion } from "./pot";
import { latestT } from "../values";
import { characterPos, health, initializeMaxHealth, maxHealth } from "../gamevalues";
import { drawSprite } from "../layers/sprite";
import { playSoundSFX } from "../../assets/sound";

export const drinkedPotions = writable<{ [potion: number]: number }>({});

export function initializeBottle() {
  drinkedPotions.set({});
}

function addNoise(pos: { x: number; y: number }) {
  return {
    x: pos.x + (Math.random() * 6 - 3),
    y: pos.y + (Math.random() * 6 - 3),
  };
}
export function makeBottle() {
  const bottle = makeGrabbableProp(
    ({ context, pos }, state) => {
      if (state.potion) {
        context.save();
        context.beginPath();
        context.rect(
          pos[0] - pos[2] / 2,
          pos[1] - pos[3] / 2 + (pos[3] / 10) * (10 - state.quantity),
          pos[2],
          pos[3] * state.quantity
        );
        context.clip();
        drawSprite(context, state.image, pos, [0, 0, 16, 16]);
        context.closePath();
        context.restore();
      }
      drawSprite(context, getRes("prop/potion"), pos, [96, 0, 16, 16]);
    },
    [96, 0, 16, 16],
    [0, 3, 40, 40],
    {
      pos: [75, 170, 40, 40],
      potion: undefined,
      quantity: 0,
      image: undefined,
    },
    {
      onWheelDown: (state) => {
        const potion = state.potion;
        if (potion === undefined) {
          const pot = attachedTag("pot")?.[0];
          if (pot) {
            const newPotion = getMadenPotion(pot);
            state.potion = newPotion;
            if (newPotion) {
              state.image = createBottleData(
                newPotion.color.r,
                newPotion.color.g,
                newPotion.color.b
              );
              state.quantity = 10;
              playSoundSFX("prop/water_up");
            }
          }
        } else {
          addNewPotionDrop(potion);
          state.quantity -= 1;
          if (state.quantity === 0) state.potion = undefined;
        }
        return true;
      },
      onWheelUp: (state) => {
        const potion = state.potion;
        if (potion !== undefined) {
          if (potion.id % 3 === 0) {
            drinkedPotions.set({
              ...get(drinkedPotions),
              [potion.id]: Math.min(
                10,
                (get(drinkedPotions)[potion.id] ?? 0) + 1
              ),
            });
            maxHealth.set(
              initializeMaxHealth +
                (initializeMaxHealth *
                  Object.values(get(drinkedPotions)).reduce(
                    (pre, curr) => pre + curr,
                    0
                  )) /
                  80
            );
            state.quantity -= 1;
            if (state.quantity === 0) state.potion = undefined;
          } else {
            health.set(Math.min(get(health) + 1000, get(maxHealth)));
            state.quantity -= 1;
            if (state.quantity === 0) state.potion = undefined;
          }
        }
        return true;
      },
    }
  );

  addProps(
    newProp({
      img: getRes("prop/rpg"),
      source: [0, 256, 32, 32],
      state: { pos: [75, 180, 48, 48]},
      layer: "floor",
    })
  );
  addProps(bottle);
}

export function createBottleData(r: number, g: number, b: number) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw Error("cannot create other canvas");
  ctx.clearRect(0, 0, 16, 16);
  ctx.drawImage(getRes("prop/potion"), 96, 16, 16, 16, 0, 0, 16, 16);
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
  const pos = addNoise(get(characterPos));
  potionDrop.set([...get(potionDrop), { time: get(latestT), pos, potion }]);
}
