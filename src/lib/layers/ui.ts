import { getRes } from "../../assets/image";
import type { CanvasInfo, Coord } from "../values";

export function drawHealthBar(
  { context }: CanvasInfo,
  [x, y, w]: Coord,
  health: number,
  tempHealth: number,
) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(getRes("ui"), 259, 40, 9, 20, x - 18, y, 18, 40);
  context.drawImage(getRes("ui"), 284, 40, 23, 20, x, y, w, 40);
  context.drawImage(getRes("ui"), 323, 40, 9, 20, x + w, y, 18, 40);

  if (health > 0) {
    context.drawImage(getRes("ui"), 341, 40, 1, 14, x, y + 6, 2, 28);
    context.drawImage(
      getRes("ui"),
      350,
      40,
      7,
      14,
      x + 2,
      y + 6,
      w * health - 2,
      28
    );
    if (health === 1) {
      context.drawImage(getRes("ui"), 365, 40, 1, 14, x + w, y + 6, 2, 28);
    }
  }
  if (tempHealth > 0) {
    context.save();
    context.globalAlpha = 0.5;
    context.drawImage(
      getRes("ui"),
      350,
      40,
      7,
      14,
      x + w * health,
      y + 6,
      w * tempHealth - 2,
      28
    );
    if (health === 1) {
      context.drawImage(getRes("ui"), 365, 40, 1, 14, x + w, y + 6, 2, 28);
    }
    context.restore();
  }
  context.restore();
}

export function drawPanel(context: CanvasRenderingContext2D, [x, y, w, h]: Coord) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(getRes("ui"), 16, 40, 7, 7, x, y, 14, 14);
  context.drawImage(getRes("ui"), 49, 40, 7, 7, x + 14, y, w - 28, 14);
  context.drawImage(getRes("ui"), 107, 40, 7, 7, x + w - 14, y, 14, 14);

  context.drawImage(getRes("ui"), 478, 24, 7, 7, x, y + 14, 14, h - 28);
  context.drawImage(
    getRes("ui"),
    511,
    24,
    7,
    7,
    x + 14,
    y + 14,
    w - 28,
    h - 28
  );
  context.drawImage(
    getRes("ui"),
    569,
    24,
    7,
    7,
    x + w - 14,
    y + 14,
    14,
    h - 28
  );

  context.drawImage(getRes("ui"), 478, 105, 7, 7, x, y + h - 14, 14, 14);
  context.drawImage(
    getRes("ui"),
    511,
    105,
    7,
    7,
    x + 14,
    y + h - 14,
    w - 28,
    14
  );
  context.drawImage(
    getRes("ui"),
    569,
    105,
    7,
    7,
    x + w - 14,
    y + h - 14,
    14,
    14
  );
  context.restore();
}

export function drawItemPanel(context: CanvasRenderingContext2D, [x, y, w, h]: Coord) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(getRes("ui"), 30, 329, 6, 6, x, y, 12, 12);
  context.drawImage(getRes("ui"), 48, 329, 6, 6, x + 12, y, w - 24, 12);
  context.drawImage(getRes("ui"), 64, 329, 6, 6, x + w - 12, y, 12, 12);
  context.drawImage(getRes("ui"), 30, 346, 6, 6, x, y + 12, 12, h - 24);
  context.drawImage(
    getRes("ui"),
    48,
    346,
    6,
    6,
    x + 12,
    y + 12,
    w - 24,
    h - 24
  );
  context.drawImage(
    getRes("ui"),
    64,
    346,
    6,
    6,
    x + w - 12,
    y + 12,
    12,
    h - 24
  );
  context.drawImage(getRes("ui"), 30, 363, 6, 6, x, y + h - 12, 12, 12);
  context.drawImage(
    getRes("ui"),
    48,
    363,
    6,
    6,
    x + 12,
    y + h - 12,
    w - 24,
    12
  );
  context.drawImage(
    getRes("ui"),
    64,
    363,
    6,
    6,
    x + w - 12,
    y + h - 12,
    12,
    12
  );
  context.restore();
}

export function drawExtendBar(
  context: CanvasRenderingContext2D,
  [x, y, w]: Coord,
  health: number,
  color: number
) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(getRes("ui"), 522, 223, 10, 18, x, y, 20, 36);
  for (let i = 0; i < w; i++) {
    if (i === 0) {
      context.drawImage(
        getRes("ui"),
        533,
        223,
        8,
        18,
        x + 20 + i * 16,
        y,
        16,
        36
      );
      if (health > i) {
        context.drawImage(
          getRes("ui"),
          592,
          183 + color * 20,
          8,
          18,
          x + 20 + i * 16,
          y,
          16,
          36
        );
      }
    } else {
      context.drawImage(
        getRes("ui"),
        542,
        223,
        8,
        18,
        x + 20 + i * 16,
        y,
        16,
        36
      );
      if (health > i) {
        context.drawImage(
          getRes("ui"),
          601,
          183 + color * 20,
          8,
          18,
          x + 20 + i * 16,
          y,
          16,
          36
        );
      }
    }
  }
  context.drawImage(
    getRes("ui"),
    567,
    182 + color * 20,
    16,
    20,
    x + 20 + w * 16,
    y - 2,
    32,
    40
  );
  context.restore();
}
