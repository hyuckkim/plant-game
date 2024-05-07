import { get, writable } from "svelte/store";

import GirlSheetImage from "./Girl-Sheet.png";
import TXTileset from "./TX Tileset Grass.png";
import UIPieces from "./ui_big_pieces.png";
import PixelArtHouse from "./pixel-art-house-export-2.png";
import RPGTileC from "./RPG Maker VX - Tile C.png";
import RPGTiles from "./RPG Maker Tiles.png";
import FlowerTile from "./flower.png";
import FlowerItem from "./flower & hurb.png";
import Potions from "./potions.png";
import EmptyPotions from "./rpg_potions_16x16_overlay.png";
import Pond from "./WaterAndFire.png";

export {
  GirlSheetImage,
  TXTileset,
  UIPieces,
  PixelArtHouse,
  RPGTileC,
  RPGTiles,
  FlowerTile,
  FlowerItem,
  Potions,
  EmptyPotions,
  Pond,
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
  const imageSources = await Promise.all(
    [
      /////////////  Images  ///////////////
      GirlSheetImage,
      TXTileset,
      UIPieces,
      PixelArtHouse,
      RPGTileC,
      RPGTiles,
      FlowerTile,
      FlowerItem,
      Potions,
      EmptyPotions,
      Pond,
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
    prop_houseprop: imageSources[4],
    prop_tile: imageSources[5],
    prop_flower_tile: imageSources[6],
    prop_flower_item: imageSources[7],
    prop_potion: imageSources[8],
    prop_potion_empty: imageSources[9],
    prop_pond: imageSources[10],
  };
  resources.set(imageData);
  return imageData;
}
