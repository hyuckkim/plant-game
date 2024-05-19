import { getRes } from "../../assets/image";
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
    state: { page: 1},
    ui: (canvas, state) => {
      canvas.context.save();
      drawPanel(canvas, [x - 150, y + 30, 300, 150]);
      canvas.context.restore();

      if (state.page === 1) {
        drawMouseButton(canvas.context, [x - 110, y + 60, 80, 100], mouseButtons.Left);
      }
      if (state.page === 2) {
        drawMouseButton(canvas.context, [x - 110, y + 60, 80, 100], mouseButtons.WheelUp);
        drawMouseButton(canvas.context, [x + 20, y + 60, 80, 100], mouseButtons.WheelDown);
      }
    },
    onClick: (state) => {
      if (state.page == 1) state.page = 2;
      else if (state.page == 2) state.page = 1;
      return true;
    }
  });
}
function book2(x: number, y: number): Prop {
  return newProp({
    img: getRes("prop/rpg"),
    source: [169, 291, 18, 10],
    pos: [x, y, 36, 20],
    display: "night",
    state: { page: 1},
    ui: (canvas, state) => {
      canvas.context.save();
      drawPanel(canvas, [x - 150, y + 30, 300, 150]);

      if (state.page === 1) {
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 100, y + 120, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 70, y + 115, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 85, y + 95, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("prop/rpg"),
          [x - 15, y + 110, 30, 31],
          [294, 454, 20, 21],
        );
        drawSprite(
          canvas.context,
          getRes("ui"),
          [x + 45, y + 110, 14, 16],
          [134, 124, 6, 8],
        );
        drawSprite(
          canvas.context,
          getRes("prop/furniture"),
          [x + 115, y + 100, 44, 82],
          [1036, 646, 44, 82],
        );
      }
      if (state.page === 2) {
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 100, y + 75, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 70, y + 75, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 40, y + 75, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("ui"),
          [x, y + 80, 14, 16],
          [134, 124, 6, 8],
        );
        drawSprite(
          canvas.context,
          getRes("ui"),
          [x + 60, y + 80, 50, 40],
          [308, 40, 25, 20],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 100, y + 120, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 70, y + 120, 32, 32],
          [48, 112, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x - 40, y + 120, 32, 32],
          [96, 16, 16, 16],
        );
        drawSprite(
          canvas.context,
          getRes("ui"),
          [x, y + 125, 14, 16],
          [134, 124, 6, 8],
        );
        drawSprite(
          canvas.context,
          getRes("ui"),
          [x + 60, y + 125, 50, 40],
          [308, 40, 25, 20],
        );
        drawSprite(
          canvas.context,
          getRes("ui"),
          [x + 52, y + 125, 32, 28],
          [358, 40, 8, 14],
        );
      }
      if (state.page === 3) {
        canvas.context.fillStyle = "#21501D";
        canvas.context.fillRect(x - 62, y + 120, 6, 6);
        canvas.context.fillRect(x - 70, y + 116, 6, 6);
        canvas.context.fillRect(x - 64, y + 124, 6, 6);
        canvas.context.fillRect(x - 68, y + 126, 6, 6);
        drawSprite(
          canvas.context,
          getRes("ui"),
          [x, y + 120, 14, 16],
          [134, 124, 6, 8],
        );
        drawSprite(
          canvas.context,
          getRes("prop/flower"),
          [x + 70, y + 120, 32, 32],
          [48, 112, 16, 16],
        );
      }
      canvas.context.restore();
    },
    onClick: (state) => {
      if (state.page == 1) state.page = 2;
      else if (state.page == 2) state.page = 3;
      else if (state.page == 3) state.page = 1;
      return true;
    }
  });
}
function book3(x: number, y: number): Prop {
  return newProp({
    img: getRes("prop/rpg"),
    source: [169, 291, 18, 10],
    pos: [x, y, 36, 20],
    display: "night",
    ui: (canvas) => {
      canvas.context.save();
      drawPanel(canvas, [x - 130, y + 30, 100, 60]);
      canvas.context.restore();

      canvas.context.fillText("Thanks to...", x - 110, y + 60);
      canvas.context.fillText("(reset game)", x - 110, y + 70);
    },
    onClick: () => {
      window.location.hash = "#license";
      return true;
    }
  });
}