<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import Sprite from "./sprite.svelte";
  import { characterDir, characterPos } from "../gamevalues";
  import { addCoord } from "../values";
  import { drawItemPanel } from "./ui";
  import type { Equip } from "../objects/equip";
  import type { Coord } from "../values";
  import { drawPropImg } from "../objects/prop";

  export let equip: Equip;
  $: equipPos = [-7, 0, 0, 7][$characterDir];
  const render: Render = ({ context, width, height }) => {
  const propCoord: Coord = [$characterPos.x + equipPos, $characterPos.y, 0, 0];
  const itemPropCoord: Coord = [width - 34, height - 114, equip.pos[2], equip.pos[3]]
  drawPropImg(context, {...equip, state: {...equip.state, pos: addCoord(equip.pos, propCoord)}});
  drawItemPanel(context, [width - 64, height - 144, 60, 60]);
  drawPropImg(context, {...equip, state: {...equip.state, pos: itemPropCoord}});
}
</script>

<Layer {render} />