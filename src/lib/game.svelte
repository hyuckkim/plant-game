<script lang="ts">
  import { onMount } from "svelte";
  import { Canvas } from "svelte-canvas";
  import {
    health,
    reset,
    bgm,
    resetTry,
    seed,
    seedText,
  } from "./gamevalues";
  import { mouseX, mouseY, pos, rClick } from "./values";

  import Background from "./layers/background.svelte";
  import Character from "./layers/character.svelte";
  import UI from "./layers/UI.svelte";
  import ParticleWalk from "./layers/particle/particleWalk.svelte";
  import ParticleDrop from "./layers/particle/particleDrop.svelte";
  
  import { click, wheelMove } from "./objects/prop";
  import { getSoundRes } from "../assets/sound";
  import { resources } from "../assets/image";
  import { soundResources } from "../assets/sound";
  import Cursor from "./layers/cursor.svelte";
  import { generateSeed, seedToNumber } from "./random";

  export let res;
  export let soundRes;
  export let userSeed: string;

  onMount(() => {
    $resources = res;
    $soundResources = soundRes;
    $pos = { x: $mouseX, y: $mouseY };
    $seedText = userSeed === "" ? generateSeed() : userSeed;
    $seed = seedToNumber($seedText);

    reset();
    if ($bgm) {
      getSoundRes("bgm").volume(0.5);
      getSoundRes("bgm").play();
      getSoundRes("bgm").loop(true);
    }
    
    const localKeyData = localStorage.getItem("control");
    if (localKeyData) {
      keyData = JSON.parse(localKeyData);
    }
    const keydownEvent = (e: KeyboardEvent) => {
      keyDown(e.key);
    }
    addEventListener('keydown', keydownEvent);
    const keyupEvent = (e: KeyboardEvent) => {
      keyUp(e.key);
    }
    addEventListener('keyup', keyupEvent);

    return () => {
      getSoundRes("bgm").pause();
      removeEventListener('keydown', keydownEvent);
      removeEventListener('keyup', keyupEvent);
    };
  });

  function keyDown(key: string) {
    if (key === keyData[0].key) { }
    if (key === keyData[1].key) { }
    if (key === keyData[2].key) { }
    if (key === keyData[3].key) { }
    if (key === keyData[4].key) {
      $rClick = true;
    }
  }
  function keyUp(key: string) {
    if (key === keyData[0].key) {
      if (!$rClick) $pos = { x: $mouseX, y: $mouseY };
    }
    if (key === keyData[1].key) {
      if ($health > 0) {
        click($pos.x, $pos.y);
      } else {
        $resetTry++;
        if ($resetTry === 5) {
          getSoundRes("bgm").volume(0.5);
          reset();
        }
      }
    }
    if (key === keyData[2].key) {
      wheelMove(-1);
    }
    if (key === keyData[3].key) {
      wheelMove(1);
    }
    if (key === keyData[4].key) {
      $rClick = false;
    }
  }
  let keyData = [
  { action: "move", key: "mouse_-1" },
  { action: "interact", key: "mouse_0" },
  { action: "equip_interact_1", key: "wheel_0" },
  { action: "equip_interact_2", key: "wheel_1" },
  { action: "measuring", key: "mouse_2" },
  ];
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
    keyUp("mouse_-1");
  }}
  on:mousedown={(e) => {
    keyDown("mouse_-1");
    keyDown(`mouse_${e.button}`);
  }}
  on:mouseup={(e) => {
    $mouseX = e.x;
    $mouseY = e.y;
    keyUp("mouse_-1");
    keyUp(`mouse_${e.button}`);
  }}
  on:wheel={(e) => {
    keyUp(`wheel_${e.deltaY < 0 ? 0 : 1}`);
    e.preventDefault();
  }}
>
  <Background />
  <ParticleWalk />
  <Character />
  <ParticleDrop />
  <UI />
  {#if keyData[0].key !== "mouse_-1"}
    <Cursor />
  {/if}
</Canvas>
