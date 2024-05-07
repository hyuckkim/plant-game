import { get, writable } from "svelte/store";
import { getRes } from "../../assets/image";
import { drawExtendBar, drawPanel } from "../canvas/ui";
import { addProps, newProp } from "./prop";

export const maxWater = 3;
export const waterCount = writable(0);
export const potionCount = writable(0);

export function makePot() {
  addProps(newProp({
    img: getRes("prop_furniture"),
    source: [1036, 646, 44, 82],
    pos: [150, 30, 53, 98],
    state: { tag: "pot" },
    ui: (canvas, _) => {
      drawPanel(canvas, [200, 10, 120, 120]);
      drawExtendBar(canvas, [320, 20, 3, 0], get(waterCount), 1);
      drawExtendBar(canvas, [320, 60, 3, 0], 0, 2);
    }
  }));
}