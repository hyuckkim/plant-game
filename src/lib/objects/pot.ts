import { getRes } from "../../assets/image";
import { drawExtendBar, drawPanel } from "../canvas/ui";
import { addProps, newProp } from "./prop";

export function makePot() {
  addProps(newProp({
    img: getRes("prop_furniture"),
    source: [1036, 646, 44, 82],
    pos: [150, 30, 53, 98],
    ui: (canvas, _) => {
      drawPanel(canvas, [200, 10, 120, 120]);
      drawExtendBar(canvas, [320, 20, 3, 0], 3, 1);
      drawExtendBar(canvas, [320, 60, 3, 0], 0, 2);
    }
  }));
}