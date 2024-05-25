import { getSpriteRes } from "../../assets/image";
import { makeGrabbableProp } from "./equip";
import { addWater } from "./pot";
import { addProps, attachedTag } from "./prop";
import { playSoundSFX } from "../../assets/sound";

export function makeBucket() {
  const bucketProp = makeGrabbableProp(
    (state) => {
      if (state.water) return getSpriteRes("prop/rpg", [294, 454, 20, 21]);
      else return getSpriteRes("prop/rpg", [326, 454, 20, 21]);
    },
    [0, 3, 30, 30],
    {pos: [210, 180, 30, 30], water: false},
    {
      onWheelUp: (state) => {
        if (!state.water && attachedTag("pond")) {
          playSoundSFX("prop/water_up");
          state.water = true;
        }
        return true;
      },
      onWheelDown: (state) => {
        if (state.water) {
          const pot = attachedTag("pot")?.[0];
          if (pot) {
            const watering = addWater(pot);
            if (!watering) return true;

            playSoundSFX("prop/water_down");
            state.water = false;
            return true;
          }
        }
        return true;
      },
    }
  );
  addProps(bucketProp);
}
