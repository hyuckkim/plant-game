import { get, writable } from "svelte/store";

import GirlSheetImage from "./Girl-Sheet.png";
import TXTileset from "./TX Tileset Grass.png";
import UIPieces from "./ui_big_pieces.png";
import PixelArtHouse from "./pixel-art-house-export-2.png";
import RPGVXBed from "./RPG Maker VX - Beds.png";
import RPGTiles from "./RPG Maker Tiles.png";

export { GirlSheetImage, TXTileset, UIPieces, PixelArtHouse, RPGVXBed, RPGTiles };
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
  const imageSources = await Promise.all(
    [
      /////////////  Images  ///////////////
      GirlSheetImage,
      TXTileset,
      UIPieces,
      PixelArtHouse,
      RPGVXBed,
      RPGTiles,
      /////////////  Images  ///////////////
    ]
      .map((v) => {
        const element = new Image();
        element.src = v;

        return element;
      })
      .map(async (e) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          e.addEventListener("load", () => {
            resolve(e);
          });
          e.addEventListener("error", () => {
            reject(e);
          });
        });
      })
  );

  const imageData = {
    character: imageSources[0],
    tileset: imageSources[1],
    ui: imageSources[2],

    prop_house: imageSources[3],
    prop_bed: imageSources[4],
    prop_tile: imageSources[5],
  };
  resources.set(imageData);
  return imageData;
}
