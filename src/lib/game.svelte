<script lang="ts">
  import { Canvas } from "svelte-canvas";
  import { health, state, reset, resetCharacterPos } from "./gamevalues";
  import { mouseX, mouseY } from "./values";

  import Background from "./canvas/background.svelte";
  import Character from "./canvas/character.svelte";
  import Healthbar from "./canvas/healthbar.svelte";
  import { onMount } from "svelte";
  import { click } from "./objects/prop";

  onMount(() => {
    reset();
  })
</script>
<Canvas
  style={$state !== "none" && $health > 0 ? "cursor:none" : ""}
  layerEvents
  autoplay
  on:mousemove={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
  }}
  on:click={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
    if ($state === "none") {
      resetCharacterPos($mouseX, $mouseY);
      $state = "sleep";
    }
    else if ($health > 0) {
      click($mouseX, $mouseY);
    }
  }}
>
  <Background />
  {#if $state !== "none"}
    <Character />
    <Healthbar />
  {/if}
</Canvas>