<script>
  import { Canvas, Layer } from "svelte-canvas";
  import { loadProgress } from "../values";

</script>

<Canvas>
  <Layer
    render={({ context, width, height }) => {
      context.save();
      context.fillStyle = "#171705";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "white";
      context.font = "40px Verdana";
      context.fillText(`Load Assets (${$loadProgress} / 19)`, (width - context.measureText("Click to start...").width) / 2, height / 2 + 250);
      context.restore();
    }}
  />
</Canvas>