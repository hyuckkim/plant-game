<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { Layer } from "svelte-canvas";
  import { getRes } from "../../../assets/image";
  import { drawSprite } from "../sprite";

  const dispatch = createEventDispatcher();
  export let index: number;
</script>

<Layer render={({ context, width, height }) => {
  drawSprite(context, getRes("ui"), [width / 2 + 162, height / 2 - 200 + index * 60, 34, 34], [48, 105, 14, 14], {x: false, y: false}, {x: 0.5, y: 0.5});
    drawSprite(context, getRes("ui"), [width / 2 + 162, height / 2 - 200 + index * 60, 34, 34], [97, 137, 14, 14], {x: false, y: false}, {x: 0.5, y: 0.5});
}}
on:click={() => dispatch('click')}
/>