import { getRes, getSpriteRes } from "../../assets/image";
import { makeGrabbableEquip, makeGrabbableProp } from "./equip";
import { addWater } from "./pot";
import { addProps, attachedTag } from "./prop";
import { playSoundSFX } from "../../assets/sound";
import { statistic } from "../layers/ending/ending";

export function makeBucket() {
  const justBucket = makeGrabbableEquip(
    getSpriteRes("prop/rpg", [326, 454, 20, 21]),
    [0, 3, 30, 30],
    {pos: [0, 3, 30, 30]},
    {
      onWheelUp: () => {
        if (attachedTag("pond")) {
          playSoundSFX("prop/water_up");
          statistic.water++;
          return waterBucket;
        }
        return true;
      },
    }
  );
  const waterBucket = makeGrabbableEquip(
    getSpriteRes("prop/rpg", [294, 454, 20, 21]),
    [0, 3, 30, 30],
    {pos: [0, 3, 30, 30]},
    {
      onWheelDown: () => {
        const pot = attachedTag("pot")?.[0];
        if (pot) {
          const watering = addWater(pot);
          if (!watering) return true;

          playSoundSFX("prop/water_down");
          return justBucket;
        }
        return true;
      },
    }
  );
  const bucketProp = makeGrabbableProp(
    getSpriteRes("prop/rpg", [326, 454, 20, 21]),
    [0, 3, 30, 30],
    {pos: [210, 180, 30, 30]},
    {
      onWheelUp: () => {
        if (attachedTag("pond")) {
          playSoundSFX("prop/water_up");
          return waterBucket;
        }
        return true;
      },
    }
  );
  addProps(bucketProp);
}
