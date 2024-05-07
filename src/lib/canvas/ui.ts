import { getRes } from "../../assets/image";
import type { CanvasInfo, Coord } from "../values";

export function drawHealthBar(
  { context }: CanvasInfo,
  [x, y, w]: Coord,
  health: number
) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(
    getRes("ui"), 259, 40, 9, 20,
    x, y, 18, 40
  );
  context.drawImage(
    getRes("ui"), 284, 40, 23, 20,
    x + 18, y, w - 36, 40
  );
  context.drawImage(
    getRes("ui"), 323, 40, 9, 20,
    x + w - 18, y, 18, 40
  );

  if (health > 0) {
    context.drawImage(
      getRes("ui"), 341, 40, 1, 14,
      x + 18, y + 6, 2, 28
    );
    context.drawImage(
      getRes("ui"), 350, 40, 7, 14,
      x + 20, y + 6, (w - 36) * health, 28
    );
    if (health === 1) {
      context.drawImage(
        getRes("ui"), 365, 40, 1, 14,
        x + w - 18, y + 6, 2, 28
      );
    }
  }
  context.restore();
}

export function drawPanel(
  { context }: CanvasInfo,
  [x, y, w, h]: Coord
) {
  context.save();
  context.imageSmoothingEnabled = false;
  context.drawImage(
    getRes("ui"), 16, 40, 7, 7,
    x, y, 14, 14
  );
  context.drawImage(
    getRes("ui"), 49, 40, 7, 7,
    x + 14, y, w - 28, 14
  );
  context.drawImage(
    getRes("ui"), 107, 40, 7, 7,
    x + w - 14, y, 14, 14
  );

  context.drawImage(
    getRes("ui"), 478, 24, 7, 7,
    x, y + 14, 14, h - 28
  );
  context.drawImage(
    getRes("ui"), 511, 24, 7, 7,
    x + 14, y + 14, w - 28, h - 28
  );
  context.drawImage(
    getRes("ui"), 569, 24, 7, 7,
    x + w - 14, y + 14, 14, h - 28
  );
  
  context.drawImage(
    getRes("ui"), 478, 105, 7, 7,
    x, y + h - 14, 14, 14
  );
  context.drawImage(
    getRes("ui"), 511, 105, 7, 7,
    x + 14, y + h - 14, w - 28, 14
  );
  context.drawImage(
    getRes("ui"), 569, 105, 7, 7,
    x + w - 14, y + h - 14, 14, 14
  );
  context.restore();
}