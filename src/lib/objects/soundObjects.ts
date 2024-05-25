import { getSpriteRes } from "../../assets/image";
import { getSoundRes } from "../../assets/sound";
import { bgm, sfx } from "../gamevalues";
import { makeGrabbableProp } from "./equip";
import { addProps, type Prop, type PropState } from "./prop";

export function makeSoundObjects() {
  addProps(addBGMProp());
  addProps(addSFXProp());
}
function addBGMProp(): Prop {
  return makeGrabbableProp(
    (state: PropState) => getSpriteRes("prop/furniture", [1000, 528, 114, 96], { x: state.reversed, y: state.reversed }),
    [0, -20, 114, 96],
    { pos: [50, 600, 114, 96], reversed: (localStorage.getItem("bgm") === "false") },
    {
      onWheelUp: (state) => {
        if (state.reversed == false) {
          getSoundRes("bgm").pause();
          bgm.set(false);
          state.reversed = true;
        }
        return true;
      },
      onWheelDown: (state) => {
        if (state.reversed == true) {
          getSoundRes("bgm").play();
          bgm.set(true);
          state.reversed = false;
        }
        return true;
      },
    },
    "night"
  );
}

function addSFXProp(): Prop {
  return makeGrabbableProp(
    (state: PropState) => getSpriteRes("prop/furniture", [1152, 910, 56, 26], { x: state.reversed, y: state.reversed }),
    [0, 0, 56, 26],
    { pos: [150, 650, 56, 26], reversed: (localStorage.getItem("sfx") === "false") },
    {
      onWheelUp: (state) => {
        if (state.reversed == false) {
          sfx.set(false);
          state.reversed = true;
        }
        return true;
      },
      onWheelDown: (state) => {
        if (state.reversed == true) {
          sfx.set(true);
          state.reversed = false;
        }
        return true;
      },
    },
    "night"
  );
}
