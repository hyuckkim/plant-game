<script lang="ts">
  import { Layer } from "svelte-canvas";
  import Sprite from "./sprite.svelte";
  import { characterDir, characterPos } from "../gamevalues";
  import { addCoord } from "../values";
  import { drawItemPanel } from "./ui";
  import type { Equip } from "../objects/equip";

  export let equip: Equip;
  $: equipPos = [-7, 0, 0, 7][$characterDir];
  let w: number, h: number;
</script>

{#if typeof equip.img === "function"}
  <Layer
    render={({ context }) => {
      if (typeof equip.img === "function") {
        equip.img(
          {
            context,
            pos: addCoord(equip.pos, [
              $characterPos.x + equipPos,
              $characterPos.y,
              0,
              0,
            ]),
          },
          equip.state
        );
      }
    }}
  />
  <Layer
    render={({ context, width, height }) => {
      w = width;
      h = height;
      drawItemPanel(context, [w - 64, h - 144, 60, 60]);
      if (typeof equip.img === "function") {
        equip.img(
          {
            context,
            pos: [width - 40, height - 120, equip.pos[2], equip.pos[3]],
          },
          equip.state
        );
      }
    }}
  />
{:else}
  <Sprite
    image={equip.img}
    source={equip.source}
    render={addCoord(equip.pos, [
      $characterPos.x + equipPos,
      $characterPos.y,
      0,
      0,
    ])}
  />
  <Layer render={({context, width, height }) => {
    w = width;
    h = height;
    drawItemPanel(context, [w - 64, h - 144, 60, 60]);
  }} />
  <Sprite
    image={equip.img}
    source={equip.source}
    render={[w - 34, h - 114, equip.pos[2], equip.pos[3]]}
  />
{/if}