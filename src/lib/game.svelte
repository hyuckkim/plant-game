<script lang="ts">
  import { onMount } from "svelte";
  import { Canvas } from "svelte-canvas";
  import {
    health,
    reset,
    characterDir,
    bgm,
  } from "./gamevalues";
  import { latestT, mouseX, mouseY, pos, rClick } from "./values";

  import Background from "./layers/background.svelte";
  import Character from "./layers/character.svelte";
  import UI from "./layers/UI.svelte";
  import ParticleWalk from "./layers/particle/particleWalk.svelte";
  import ParticleDrop from "./layers/particle/particleDrop.svelte";
  
  import { click, wheelMove } from "./objects/prop";
  import { getSoundRes } from "../assets/sound";
  import { resources } from "../assets/image";
  import { soundResources } from "../assets/sound";

  export let res;
  export let soundRes;

  onMount(() => {
    $resources = res;
    $soundResources = soundRes;
    $pos = { x: $mouseX, y: $mouseY };

    reset();
    if ($bgm) {
      getSoundRes("bgm").volume(0.5);
      getSoundRes("bgm").play();
      getSoundRes("bgm").loop(true);
    }

    return () => {
      getSoundRes("bgm").pause();
    };
  });
</script>

<Canvas
  style={$health > 0 ? "cursor:none" : ""}
  autoplay
  on:contextmenu={(e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }}
  on:mousemove={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
    
    if (!$rClick) $pos = { x: $mouseX, y: $mouseY };
  }}
  on:mousedown={(e) => {
    if (e.button === 2) {
      $rClick = true;
    }
  }}
  on:mouseup={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
    if (e.button === 0) {
      if ($health > 0) {
        click($mouseX, $mouseY);
      }
    }
    if (e.button === 2) {
      $rClick = false;
    }
    if (!$rClick) $pos = { x: $mouseX, y: $mouseY };
  }}
  on:wheel={(e) => {
    wheelMove(e.deltaY);
    e.preventDefault();
  }}
>
  <Background />
  <ParticleWalk />
  <Character />
  <ParticleDrop />
  <UI />
</Canvas>
