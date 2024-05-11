<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { characterPos, health, maxHealth } from "../gamevalues";
  import { spring } from "svelte/motion";
  import { onMount } from "svelte";
  import { drawHealthBar } from "./ui";
  import { getCurrentProps, isAttached } from "../objects/prop";

  const marginX = 20;
  const marginY = 5;
  const extraHeight = spring(300);

  onMount(() => {
    setTimeout(() => {
      $extraHeight = 0;
    }, 0);
  })
</script>

<Layer
  render={(canvas) => {
    drawHealthBar(
      canvas, 
      [marginX, canvas.height - 40 - marginY + $extraHeight, canvas.width - marginX * 2, 0],
      Math.min($health, 3000) / Math.min($maxHealth, 3000)
    );
    if ($maxHealth > 3000) {
      drawHealthBar(
        canvas, 
        [marginX, canvas.height - 80 - marginY - marginY + $extraHeight, (canvas.width - marginX * 2) * ($maxHealth - 3000) / 3000, 0],
        Math.min($health - 3000, 3000) / Math.min($maxHealth - 3000, 3000)
      );
    }

    getCurrentProps()
      .filter(p => isAttached(p, $characterPos.x, $characterPos.y))
      .forEach(p => {
        p.ui(canvas, p.state);
      });
}}
/>
