<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { characterPos, health, maxHealth, state } from "../gamevalues";
  import { spring } from "svelte/motion";
  import { onMount } from "svelte";
  import { drawHealthBar } from "./ui";
  import { isAttached, nightProps, props } from "../objects/prop";

  const margin = 10;
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
      [margin, canvas.height - 40 - margin + $extraHeight, canvas.width - margin * 2, 0],
      $health / maxHealth
    );

    let currentProps =
      $state === "awake"
        ? $props
        : $state === "sleep"
        ? $nightProps
        : [];
    currentProps
      .filter(p => isAttached(p, $characterPos.x, $characterPos.y))
      .forEach(p => {
        p.ui(canvas, p.state);
      });
}}
/>
