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
  import { getSoundRes } from "../assets/sound";

  onMount(() => {
    reset();
    getSoundRes("bgm").volume(0.5);
    getSoundRes("bgm").play();
    getSoundRes("bgm").loop(true);

    return () => {
      getSoundRes("bgm").pause();
    }
  })
</script>
<Canvas
  style={$health > 0 ? "cursor:none" : ""}
  autoplay
  on:mousemove={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
  }}
  on:click={async (e) => {
    $mouseX = e.x;
    $mouseY = e.y;
    if ($health > 0) {
      click($mouseX, $mouseY);
    }
  }}
  on:wheel={(e) => {
    wheelMove(e.deltaY);
  }}
>
  <Background />
  <ParticleWalk />
  <Character />
  <ParticleDrop />
  <UI />
</Canvas>