<script lang="ts">
  import { Canvas } from "svelte-canvas";
  import {
    health,
    reset,
    nowEnding,
    endingSequence,
    enteredEndingTime,
    characterDir,
    characterPos,
    gotEnding,
  } from "./gamevalues";
  import { latestT, mouseX, mouseY } from "./values";

  import Background from "./layers/background.svelte";
  import Character from "./layers/character.svelte";
  import UI from "./layers/UI.svelte";
  import { onMount } from "svelte";
  import { click, wheelMove } from "./objects/prop";
  import ParticleWalk from "./layers/particle/particleWalk.svelte";
  import ParticleDrop from "./layers/particle/particleDrop.svelte";
  import { getSoundRes } from "../assets/sound";
  import EndingOverlay from "./layers/ending/endingOverlay.svelte";
  import EndingBackground from "./layers/ending/endingBackground.svelte";
  import { changeAwakenState } from "./objects/house";
  import { resources } from "../assets/image";
  import { soundResources } from "../assets/sound";

  export let res;
  export let soundRes;

  onMount(() => {
    $resources = res;
    $soundResources = soundRes;

    reset();
    getSoundRes("bgm").volume(0.5);
    getSoundRes("bgm").play();
    getSoundRes("bgm").loop(true);

    return () => {
      getSoundRes("bgm").pause();
    };
  });
</script>

<Canvas
  style={$health > 0 && !($nowEnding && $endingSequence === 0)
    ? "cursor:none"
    : ""}
  autoplay
  on:mousemove={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
  }}
  on:click={async (e) => {
    $mouseX = e.x;
    $mouseY = e.y;
    if (
      $nowEnding &&
      $endingSequence === 1 &&
      $characterPos.y > window.innerHeight - 50
    ) {
      $nowEnding = false;
      $gotEnding = true;
      changeAwakenState($latestT);
    } else {
      if ($health > 0) {
        click($mouseX, $mouseY);
      }
    }
  }}
  on:wheel={(e) => {
    if ($nowEnding && $endingSequence === 0) {
      $endingSequence = 1;
      $enteredEndingTime = $latestT;
      $characterDir = 2;
    } else {
      wheelMove(e.deltaY);
    }
    e.preventDefault();
  }}
>
  <Background />
  {#if $nowEnding}
    <EndingBackground />
  {/if}
  <ParticleWalk />
  <Character />
  <ParticleDrop />
  {#if $nowEnding}
    <EndingOverlay />
  {:else}
    <UI />
  {/if}
</Canvas>
