<script lang="ts">
  import { Canvas } from "svelte-canvas";
  import { health, state, reset } from "./gamevalues";
  import { mouseX, mouseY } from "./values";

  import Background from "./layers/background.svelte";
  import Character from "./layers/character.svelte";
  import UI from "./layers/UI.svelte";
  import { onMount } from "svelte";
  import { click, wheelMove } from "./objects/prop";
  import ParticleWalk from "./layers/particle/particleWalk.svelte";
  import ParticleDrop from "./layers/particle/particleDrop.svelte";

  onMount(() => {
    reset();
  })
</script>
<Canvas
  style={$state !== "none" && $health > 0 ? "cursor:none" : ""}
  autoplay
  on:mousemove={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
  }}
  on:click={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
    if ($state === "none") {
      $state = "sleep";
    }
    else if ($health > 0) {
      click($mouseX, $mouseY);
    }
  }}
  on:wheel={(e) => {
    wheelMove(e.deltaY);
  }}
>
  <Background />
  {#if $state !== "none"}
  <ParticleWalk />
  <Character />
  <UI />
  <ParticleDrop />
  {/if}
</Canvas>