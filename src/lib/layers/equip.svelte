<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import { characterDir, characterPos } from "../gamevalues";
  import { addCoord } from "../values";
  import type { Equip } from "../objects/equip";
  import type { Coord } from "../values";
  import { drawPropImg } from "../objects/prop";

  export let equip: Equip;
  $: equipPos = [-7, 0, 0, 7][$characterDir];
  const render: Render = ({ context }) => {
  const propCoord: Coord = [$characterPos.x + equipPos, $characterPos.y, 0, 0];
  drawPropImg(context, {img: equip.img, state: {...equip.state, pos: addCoord(equip.pos, propCoord)}});
}
</script>

<Layer {render} />