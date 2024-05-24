<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { characterPos, health, initializeMaxHealth, maxHealth, resetTry, state } from "../gamevalues";
  import { HealthBarExtraHeight } from "../gamevalues";
  import { onMount } from "svelte";
  import { drawHealthBar } from "./ui";
  import { getCurrentProps, isAttached } from "../objects/prop";
  import { mouseX, mouseY, pos, rClick } from "../values";

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
    const { context, width, height } = canvas;
    const tempHealth = ($rClick && $state === "awake") ? Math.abs($pos.x + $pos.y - ($mouseX + $mouseY)) : 0;
    for (let m = $maxHealth, h = $health, t = tempHealth, j = 1; m > 0; m -= initializeMaxHealth, h -= initializeMaxHealth, t -= initializeMaxHealth, j++) {
      drawHealthBar(
        canvas,
        [
        marginX,
        height - 40 * j - marginY + $HealthBarExtraHeight,
        (width - marginX * 2) * (Math.min(m, initializeMaxHealth) / initializeMaxHealth),
        0,
      ],
      Math.min(h - tempHealth, initializeMaxHealth) / Math.min(m, initializeMaxHealth),
      Math.min(tempHealth, initializeMaxHealth) / Math.min(m, initializeMaxHealth)
      );
    }

    getCurrentProps()
      .filter((p) => isAttached(p, $characterPos.x, $characterPos.y))
      .forEach((p) => {
        p.ui(canvas, p.state);
      });

    if ($rClick) {
      context.save();
      context.font = `10px Verdana`;
      context.fillStyle = "#fffa";
      context.strokeStyle = "#fffa";
      context.lineWidth = 3;
      context.beginPath();
      context.moveTo($pos.x, $pos.y + 30);
      context.lineTo($mouseX, $mouseY + 30);
      context.fillText(`${Math.floor(Math.abs($pos.x - $mouseX))} x ${Math.floor(Math.abs($pos.y - $mouseY))}`, $mouseX + 5, $mouseY + 35);
      context.stroke();
      context.restore();
    }

    if ($resetTry) {
      context.save();
      const data = ['#0000', '#0003', '#0006', '#0009', '#000b'];
      context.fillStyle = data[$resetTry];
      context.fillRect(0, 0, width, height);
      context.restore();
    }
  }}
/>
