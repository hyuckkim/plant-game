<script lang="ts">
  import { Layer } from "svelte-canvas";

  const roundPos = { x: 80, y: 80 };

  export let clip = false;
  export let clipCircle: number = 0;
  export let clipReversed = false;  
</script>

<Layer render = {({ context, width, height }) => {
  context.save();
  context.fillStyle = "#000c";
  context.beginPath();
    console.log(clip, clipReversed);
  if (clip) {
    context.ellipse(roundPos.x, roundPos.y, clipCircle * (width + height), clipCircle * (width + height), 0, 0, 360);
    if (clipReversed) {
      context.rect(0, 0, width, height);
    }
    context.clip("evenodd");
  }
  context.rect(0, 0, width, height);
  context.fill();
  context.closePath();
  context.restore();
}} />