<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { endingSequence, enteredEndingTime } from "../../gamevalues";
  import { drawMouseButton } from "../mouseButton";
  import { mouseButtons } from "../../values";
</script>

<Layer
  render={({ context, width, height, time }) => {
    context.fillStyle = "black";
    if ($endingSequence === 0) {
      context.save();
      context.fillRect(0, 0, width, (time - $enteredEndingTime) * 5);
      context.restore();
      if (time - $enteredEndingTime > 2000) {
        context.save();
        context.beginPath();
        drawMouseButton(context, [50, 50, 80, 90], mouseButtons.WheelDown);
        context.closePath();
        context.restore();
      }
    } else {
      context.fillRect(0, (time - $enteredEndingTime) * 5, width, height);
    }
  }}
/>
