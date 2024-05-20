<script lang="ts">
  import {
    GirlSheetImage,
    TXTileset,
    UIPieces,
    RPGTileC,
    RPGTiles,
    PixelArtHouse,
    FlowerTile,
    EmptyPotions,
    Pond,
  } from "../../assets/image";
  import { WaterUpSFX, backgroundMusic } from "../../assets/sound";
  import AudioText from "./audioText.svelte";
  import SourceText from "./sourceText.svelte";
</script>

<button on:click={() => { window.location.hash = "";}}>return to game</button>
<div>
  <SourceText
    href="https://immunitys.itch.io/pixel-top-down-character"
    img={GirlSheetImage}
    >Simple Top Down Character
  </SourceText>
  <SourceText
    href="https://cainos.itch.io/pixel-art-top-down-basic"
    img={TXTileset}
    >Pixel Art Top down - Basic
  </SourceText>
  <SourceText
    href="https://opengameart.org/content/golden-ui-bigger-than-ever-edition"
    img={UIPieces}
    >Golden UI - Bigger Than Ever Edition
  </SourceText>
  <SourceText
    href="https://www.deviantart.com/ayene-chan/art/RPG-Maker-Tiles-255998841"
    img={RPGTiles}
    >RPG Maker Tiles
  </SourceText>
  <SourceText
    href="https://www.deviantart.com/ayene-chan/art/RPG-Maker-VX-Tile-C-458385708"
    img={RPGTileC}
    >RPG Maker VX - Tile C
  </SourceText>
  <SourceText href="https://diogo-vernier.itch.io/rpg-house" img={PixelArtHouse}
    >RPG House
  </SourceText>
  <SourceText
    href="https://btl-games.itch.io/pixel-art-fauna-asset-pack"
    img={FlowerTile}
    >100 hand picked pixel flowers
  </SourceText>
  <SourceText
    href="https://opengameart.org/content/rpg-potions-16x16"
    img={EmptyPotions}
    >RPG Potions 16x16 overlay
  </SourceText>
  <SourceText
    href="https://opengameart.org/content/lpc-animated-water-and-fire"
    img={Pond}
    >[LPC] Animated Water and Fire
  </SourceText>
  <AudioText
    href="https://potat0master.itch.io/free-background-music-for-visual-novels-bgm-pack-1"
    sound={backgroundMusic}
    >Free Background Music for Visual Novels
  </AudioText>
  <AudioText
    href="https://nox-sound-design.itch.io/essentials-series-sfx-nox-sound"
    sound={WaterUpSFX}
    >Essentials Series - Free Sound Effect
  </AudioText>
</div>

<style>
  div {
    padding: 40px 20px;
    background: #eee;
  }
  button {
    padding: 20px 10px;
    height: 30px;
    background: #eee;
  }
</style>
