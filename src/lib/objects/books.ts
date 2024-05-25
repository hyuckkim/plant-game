import { getRes, getSpriteRes } from "../../assets/image";
import { getText } from "../../assets/text";
import { statistic } from "../layers/ending/ending";
import { drawMouseButton } from "../layers/mouseButton";
import { drawSprite } from "../layers/sprite";
import { drawPanel } from "../layers/ui";
import { mouseButtons } from "../values";
import { addProps, Prop } from "./prop";

const defaultControlData = `[{"action":"move","key":"mouse_-1"},{"action":"interact","key":"mouse_0"},{"action":"equip_interact_1","key":"wheel_0"},{"action":"equip_interact_2","key":"wheel_1"},{"action":"measuring","key":"mouse_2"}]`;
export function makeBooks() {
  if (localStorage.getItem("control") === defaultControlData ||localStorage.getItem("control") === null) {
    addProps(book_mouse(300, 50));
  }
  addProps(book_health(360, 50));
  addProps(book_potion(420, 50));
  addProps(book_license(480, 50));
}

function book_mouse(x: number, y: number): Prop {
  return new Prop({
    img: getSpriteRes("prop/rpg", [169, 291, 18, 10]),
    display: "night",
    state: { pos: [x, y, 36, 20], page: 1 },
    ui: ({ context }, state) => {
      if (state.page === 1) {
        drawBookBackground(context, {x, y}, getText("b1_1_1"));
        drawMouseButton(
          context,
          [x - 110, y + 80, 80, 80],
          mouseButtons.Left
        );
      }
      if (state.page === 2) {
        drawBookBackground(context, {x, y}, getText("b1_2_1"), getText("b1_2_2"));
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
      if (state.page === 3) {
        drawBookBackground(context, {x, y}, getText("b1_3_1"), getText("b1_3_2"));
        drawMouseButton(
          context,
          [x + 20, y + 80, 80, 80],
          mouseButtons.Right
        );
      }
    },
    onClick: (state) => {
      statistic.book++;
      if (state.page == 1) state.page = 2;
      else if (state.page == 2) state.page = 3;
      else if (state.page == 3) state.page = 1;
      return true;
    },
  });
}
function book_health(x: number, y: number): Prop {
  return new Prop({
    img: getSpriteRes("prop/rpg", [169, 291, 18, 10]),
    display: "night",
    state: { pos: [x, y, 36, 20], page: 1 },
    ui: ({ context }, state) => {
      if (state.page === 1) {
        drawBookBackground(context, {x, y}, getText("bh_1_1"), getText("bh_1_2"));
        drawSprite(context, getRes("ui"), [x + 90, y + 150, 40, 40], [1032, 0, 24, 24]);
        drawSprite(context, getRes("ui"), [x + 90, y + 150, 40, 40], [1032, 0, 24, 24]);
        context.drawImage(getRes("ui"), 259, 40, 9, 20, x - 120, y + 140, 9, 20);
        context.drawImage(getRes("ui"), 284, 40, 23, 20, x - 111, y + 140, 20, 20);
        context.drawImage(getRes("ui"), 323, 40, 9, 20, x - 91, y + 140, 9, 20);
        drawSprite(context, getRes("character"), [x + 90, y + 150, 40, 40], [1032, 0, 24, 24]);
      }
      if (state.page === 2) {
        drawBookBackground(context, {x, y}, getText("bh_2_1"), getText("bh_2_2"));
        drawSprite(context, getRes("prop/rpg"), [x + 90, y + 120, 32, 64], [0, 192, 32, 64]);
      }
    },
    onClick: (state) => {
      statistic.book++;
      if (state.page == 1) state.page = 2;
      else if (state.page == 2) state.page = 1;
      return true;
    },
  });
}
function book_potion(x: number, y: number): Prop {
  return new Prop({
    img: getSpriteRes("prop/rpg", [169, 291, 18, 10]),
    display: "night",
    state: { pos: [x, y, 36, 20], page: 1 },
    ui: ({ context }, state) => {
      if (state.page === 1) {
        drawBookBackground(context, {x, y}, getText("b2_1_1"), getText("b2_1_2"));
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
        drawBookBackground(context, {x, y}, getText("b2_2_1"), getText("b2_2_2"));
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
        drawBookBackground(context, {x, y}, getText("b2_3_1"), getText("b2_3_2"));
        context.save();
        context.fillStyle = "#21501D";
        context.fillRect(x - 62, y + 120, 6, 6);
        context.fillRect(x - 70, y + 116, 6, 6);
        context.fillRect(x - 64, y + 124, 6, 6);
        context.fillRect(x - 68, y + 126, 6, 6);
        context.restore();
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
    },
    onClick: (state) => {
      statistic.book++;
      if (state.page == 1) state.page = 2;
      else if (state.page == 2) state.page = 3;
      else if (state.page == 3) state.page = 1;
      return true;
    },
  });
}
function book_license(x: number, y: number): Prop {
  return new Prop({
    img: getSpriteRes("prop/rpg", [169, 291, 18, 10]),
    state: {pos: [x, y, 36, 20]},
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

function drawBookBackground(context: CanvasRenderingContext2D, {x, y}: {x: number, y: number}, text1: string, text2?: string) {
  context.save();
  drawPanel(context, [x - 150, y + 30, 300, 150]);

  context.font = "12px Verdana";
  context.fillStyle = "white";
  context.fillText(text1, x - 130, y + 55);
  if (text2) context.fillText(text2, x - 130, y + 68);
  context.restore();
}