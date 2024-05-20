import { get, writable } from "svelte/store";

import GirlSheetImage from "./image/Girl-Sheet.png";
import TXTileset from "./image/TX Tileset Grass.png";
import TXProp from "./image/TX Props.png";
import UIPieces from "./image/ui_big_pieces.png";
import PixelArtHouse from "./image/pixel-art-house-export-2.png";
import RPGTileC from "./image/RPG Maker VX - Tile C.png";
import RPGTiles from "./image/RPG Maker Tiles.png";
import FlowerTile from "./image/flower.png";
import EmptyPotions from "./image/rpg_potions_16x16_overlay.png";
import Pond from "./image/WaterAndFire.png";
import Furniture from "./image/100 furniture sprites.png";

export {
  GirlSheetImage,
  TXTileset,
  TXProp,
  UIPieces,
  PixelArtHouse,
  RPGTileC,
  RPGTiles,
  FlowerTile,
  EmptyPotions,
  Pond,
  Furniture,
};
export type Resources = Awaited<ReturnType<typeof loadGameImages>>;
export const resources = writable<Resources>();

export function getRes(name: keyof Resources): HTMLImageElement {
  const resource = get(resources);
  if (!resource) throw new Error("Resources is not loaded");

  const found = resource[name];
  if (!found) throw new Error(`Resource ${name} is missing`);

  return found;
}

export async function loadGameImages() {
  const images = [
    { img: GirlSheetImage, name: "character" },
    { img: TXTileset, name: "grass" },
    { img: TXProp, name: "stone" },
    { img: UIPieces, name: "ui" },
    { img: PixelArtHouse, name: "prop/house" },
    { img: RPGTileC, name: "prop/rpg" },
    { img: RPGTiles, name: "prop/rpgtile" },
    { img: FlowerTile, name: "prop/flower" },
    { img: EmptyPotions, name: "prop/potion" },
    { img: Pond, name: "prop/pond" },
    { img: Furniture, name: "prop/furniture"  },
  ] as const;
  type res = typeof images[number]['name'];

  const imageSources = await Promise.all(
      images.map((v) => {
        const element = new Image();
        element.src = v.img;

        return {img: element, name: v.name};
      })
      .map(async (e) => {
        return new Promise<{ img: HTMLImageElement, name: string}>((resolve, reject) => {
          e.img.addEventListener("load", () => {
            resolve({ img: e.img, name: e.name });
          });
          e.img.addEventListener("error", () => {
            reject(e);
          });
        });
      })
  );
  
  const imageData = imageSources.reduce<Partial<{[K in res]: HTMLImageElement}>>((pre, curr) => {
    return {...pre, [curr.name]: curr.img};
  }, {});
  resources.set(imageData);
  return imageData;
}
