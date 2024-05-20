<script lang="ts">
  import { Canvas, Layer } from "svelte-canvas";
  import MouseButton from "./mouseButton.svelte";
  import { mouseButtons, mouseX, mouseY } from "../values";
</script>

<Canvas on:mousemove={(e) => {
  $mouseX = e.pageX;
  $mouseY = e.pageY;
}}>
  <Layer render={({ context, width, height }) => {
    context.save();
    context.fillStyle = "#171705";
    context.fillRect(0, 0, width, height);
    context.restore();
  }} />
  <MouseButton pos={[300, 300, 200, 300]} buttons={mouseButtons.Left} />
</Canvas>