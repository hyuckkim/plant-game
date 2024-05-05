<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import { drawSprite } from "./sprite";

  export let callback: Render = () => {};

  export let image: CanvasImageSource;
  export let render: [x: number, y: number, w: number, h: number];
  export let source: [x: number, y: number, w: number, h: number];
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
