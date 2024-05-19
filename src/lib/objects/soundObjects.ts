import { getRes } from "../../assets/image";
import { getSoundRes } from "../../assets/sound";
import { sfx } from "../gamevalues";
import { drawSprite } from "../layers/sprite";
import { makeGrabbableProp } from "./equip";
import { addProps, type Prop } from "./prop";

export function makeSoundObjects() {
  addProps(addBGMProp());
  addProps(addSFXProp());
}

function addBGMProp(): Prop {
  return makeGrabbableProp(
    ({ context, pos }, state) => {
      drawSprite(
        context,
        getRes("prop/furniture"),
        pos,
        [1000, 528, 114, 96],
        { x: state.reversed === 1, y: state.reversed === 1 }
      );
    },
    [1000, 528, 114, 96],
    [50, 600, 114, 96],
    [0, -20, 114, 96],
    { reversed: 0 },
    {
      onWheelUp: (state) => {
        if (state.reversed == 0) {
          getSoundRes("bgm").pause();
          state.reversed = 1;
        }
        return true;
      },
      onWheelDown: (state) => {
        if (state.reversed == 1) {
          getSoundRes("bgm").play();
          state.reversed = 0;
        }
        return true;
      }
    },
    "night"
  );
}

function addSFXProp(): Prop {
  return makeGrabbableProp(
    ({ context, pos }, state) => {
      drawSprite(
        context,
        getRes("prop/furniture"),
        pos,
        [1152, 910, 56, 26],
        { x: state.reversed === 1, y: state.reversed === 1 }
      );
    },
    [1152, 910, 56, 26],
    [150, 650, 56, 26],
    [0, 0, 56, 26],
    { reversed: 0 },
    {
      onWheelUp: (state) => {
        if (state.reversed == 0) {
          sfx.set(false);
          state.reversed = 1;
        }
        return true;
      },
      onWheelDown: (state) => {
        if (state.reversed == 1) {
          sfx.set(true);
          state.reversed = 0;
        }
        return true;
      }
    },
    "night"
  );
}