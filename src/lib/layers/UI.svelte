<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { characterPos, health, initializeMaxHealth, maxHealth } from "../gamevalues";
  import { HealthBarExtraHeight } from "../gamevalues";
  import { onMount } from "svelte";
  import { drawHealthBar } from "./ui";
  import { getCurrentProps, isAttached } from "../objects/prop";

  const marginX = 20;
  const marginY = 5;

  onMount(() => {
    setTimeout(() => {
      $HealthBarExtraHeight = 0;
    }, 0);
  });
</script>

<Layer
  render={(canvas) => {
    for (let m = $maxHealth, h = $health, j = 1; m > 0; m -= initializeMaxHealth, h -= initializeMaxHealth, j++) {
      drawHealthBar(
        canvas,
        [
        marginX,
        canvas.height - 40 * j - marginY + $HealthBarExtraHeight,
        (canvas.width - marginX * 2) * (Math.min(m, initializeMaxHealth) / initializeMaxHealth),
        0,
      ],
      Math.min(h, initializeMaxHealth) / Math.min(m, initializeMaxHealth)
      );
    }

    getCurrentProps()
      .filter((p) => isAttached(p, $characterPos.x, $characterPos.y))
      .forEach((p) => {
        p.ui(canvas, p.state);
      });
  }}
/>
