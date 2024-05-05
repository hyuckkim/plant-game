<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { health, maxHealth } from "../gamevalues";
  import { getRes } from "../../assets/image";
  import { spring } from "svelte/motion";
  import { onMount } from "svelte";

  const margin = 10;
  const extraHeight = spring(300);

  onMount(() => {
    setTimeout(() => {
      $extraHeight = 0;
    }, 0);
  })
</script>

<Layer
  render={({ context, width, height, time }) => {
    context.save();
    context.imageSmoothingEnabled = false;
    context.drawImage(
      getRes("ui"),
      259,
      40,
      9,
      20,
      margin,
      height - margin - 40 + $extraHeight,
      18,
      40
    );
    context.drawImage(
      getRes("ui"),
      284,
      40,
      23,
      20,
      margin + 18,
      height - margin - 40 + $extraHeight,
      width - 36 - margin * 2,
      40
    );
    context.drawImage(
      getRes("ui"),
      323,
      40,
      9,
      20,
      width - margin - 20,
      height - margin - 40 + $extraHeight,
      18,
      40
    );

    if ($health > 0) {
      context.drawImage(
        getRes("ui"),
        341,
        40,
        1,
        14,
        margin + 18,
        height - margin - 34 + $extraHeight,
        2,
        28
      );
      context.drawImage(
        getRes("ui"),
        350,
        40,
        7,
        14,
        margin + 20,
        height - margin - 34 + $extraHeight,
        ((width - margin - 50) * $health) / maxHealth,
        28
      );
      if ($health === maxHealth) {
        context.drawImage(
          getRes("ui"),
          365,
          40,
          1,
          14,
          width - margin - 20,
          height - margin - 34 + $extraHeight,
          2,
          28
        );
      }
    }
    context.restore();
  }}
/>
