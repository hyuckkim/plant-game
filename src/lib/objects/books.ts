import { getRes } from "../../assets/image";
import { getText } from "../../assets/text";
import { drawMouseButton } from "../layers/mouseButton";
import { drawSprite } from "../layers/sprite";
import { drawPanel } from "../layers/ui";
import { mouseButtons } from "../values";
import { addProps, newProp, type Prop } from "./prop";

export function makeBooks() {
  addProps(book1(300, 50));
  addProps(book2(400, 50));
  addProps(book3(500, 50));
}

function book1(x: number, y: number): Prop {
  return newProp({
    img: getRes("prop/rpg"),
    source: [169, 291, 18, 10],
    pos: [x, y, 36, 20],
    display: "night",
    state: { page: 1 },
    ui: ({ context }, state) => {
      context.save();
      drawPanel(context, [x - 150, y + 30, 300, 150]);
      context.font = "12px Verdana";
      context.fillStyle = "white";
      if (state.page === 1) {
        context.fillText(getText("b1_1_1"), x - 130, y + 55);
        drawMouseButton(
          context,
          [x - 110, y + 80, 80, 80],
          mouseButtons.Left
        );
      }
      if (state.page === 2) {
        context.fillText(getText("b1_2_1"), x - 130, y + 55);
        context.fillText(getText("b1_2_2"), x - 130, y + 68);
        drawMouseButton(
          context,
          [x - 110, y + 80, 80, 80],
          mouseButtons.WheelUp
        );
        drawMouseButton(
          context,
          [x + 20, y + 80, 80, 80],
          mouseButtons.WheelDown
        );
      }
      context.restore();
    },
    onClick: (state) => {
      if (state.page == 1) state.page = 2;
      else if (state.page == 2) state.page = 1;
      return true;
    },
  });
}
function book2(x: number, y: number): Prop {
  return newProp({
    img: getRes("prop/rpg"),
    source: [169, 291, 18, 10],
    pos: [x, y, 36, 20],
    display: "night",
    state: { page: 1 },
    ui: ({ context }, state) => {
      context.save();
      drawPanel(context, [x - 150, y + 30, 300, 150]);
      context.font = "12px Verdana";
      context.fillStyle = "white";

      if (state.page === 1) {
        context.fillText(getText("b2_1_1"), x - 130, y + 55);
        context.fillText(getText("b2_1_2"), x - 130, y + 68);
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 100, y + 120, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 70, y + 115, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 85, y + 95, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("prop/rpg"),
          [x - 15, y + 110, 30, 31],
          [294, 454, 20, 21]
        );
        drawSprite(
          context,
          getRes("ui"),
          [x + 45, y + 110, 14, 16],
          [134, 124, 6, 8]
        );
        drawSprite(
          context,
          getRes("prop/furniture"),
          [x + 115, y + 100, 44, 82],
          [1036, 646, 44, 82]
        );
        drawSprite(
          context,
          getRes("prop/potion"),
          [x + 130, y + 130, 32, 32],
          [96, 0, 16, 16] 
        );
      }
      if (state.page === 2) {
        context.fillText(getText("b2_2_1"), x - 130, y + 55);
        context.fillText(getText("b2_2_2"), x - 130, y + 68);
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 100, y + 90, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 70, y + 90, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 40, y + 90, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("ui"),
          [x, y + 95, 14, 16],
          [134, 124, 6, 8]
        );
        drawSprite(
          context,
          getRes("ui"),
          [x + 60, y + 95, 50, 40],
          [308, 40, 25, 20]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 100, y + 135, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 70, y + 135, 32, 32],
          [48, 112, 16, 16]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x - 40, y + 135, 32, 32],
          [96, 16, 16, 16]
        );
        drawSprite(
          context,
          getRes("ui"),
          [x, y + 140, 14, 16],
          [134, 124, 6, 8]
        );
        drawSprite(
          context,
          getRes("ui"),
          [x + 60, y + 140, 50, 40],
          [308, 40, 25, 20]
        );
        drawSprite(
          context,
          getRes("ui"),
          [x + 52, y + 140, 32, 28],
          [358, 40, 8, 14]
        );
      }
      if (state.page === 3) {
        context.fillText(getText("b2_3_1"), x - 130, y + 55);
        context.fillText(getText("b2_3_2"), x - 130, y + 68);

        context.fillStyle = "#21501D";
        context.fillRect(x - 62, y + 120, 6, 6);
        context.fillRect(x - 70, y + 116, 6, 6);
        context.fillRect(x - 64, y + 124, 6, 6);
        context.fillRect(x - 68, y + 126, 6, 6);
        drawSprite(
          context,
          getRes("ui"),
          [x, y + 120, 14, 16],
          [134, 124, 6, 8]
        );
        drawSprite(
          context,
          getRes("prop/flower"),
          [x + 70, y + 120, 32, 32],
          [48, 112, 16, 16]
        );
      }
      context.restore();
    },
    onClick: (state) => {
      if (state.page == 1) state.page = 2;
      else if (state.page == 2) state.page = 3;
      else if (state.page == 3) state.page = 1;
      return true;
    },
  });
}
function book3(x: number, y: number): Prop {
  return newProp({
    img: getRes("prop/rpg"),
    source: [169, 291, 18, 10],
    pos: [x, y, 36, 20],
    display: "night",
    ui: ({ context }) => {
      context.save();
      drawPanel(context, [x - 130, y + 30, 100, 60]);

      context.font = "10px Verdana";
      context.fillStyle = "white";
      context.fillText("Thanks to...", x - 110, y + 60);
      context.fillText("(reset game)", x - 110, y + 70);
      context.restore();
    },
    onClick: () => {
      window.location.hash = "#license";
      return true;
    },
  });
}
