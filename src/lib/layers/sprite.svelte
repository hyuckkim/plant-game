<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import { drawSprite } from "./sprite";
  import type { Coord } from "../values";

  export let callback: Render = () => {};

  export let image: CanvasImageSource;
  export let render: Coord;
  export let source: Coord;
  export let flipped: {
    x: boolean;
    y: boolean;
  } = { x: false, y: false };
  export let pos: {
    x: number;
    y: number;
  } = { x: 0.5, y: 0.5 };
</script>

<Layer
  render={({ context, width, height, time }) => {
    callback({ context, width, height, time });
    drawSprite(context, image, render, source, flipped, pos);
  }}
/>
