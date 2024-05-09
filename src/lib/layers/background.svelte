<script lang="ts">
  import { Layer } from "svelte-canvas";
  import {
    characterPos,
    characterReady,
    health,
    state,
    statesEnteredTime,
  } from "../gamevalues";
  import {
    props,
    nightProps,
    yesterdayProps,
  } from "../objects/prop";
  import { mouseX, mouseY } from "../values";
  import GroundGrass from "./background/groundGrass.svelte";
  import GroundProp from "./background/groundProp.svelte";
  import GroundShadow from "./background/groundShadow.svelte";

  const leapRadius = (start: number, now: number) => {
    const end = start + 600;
    return Math.min((now - start) / (end - start), 1);
  };

  let isFullyChanged = true;
  let circleRadius = 0;
  let gottenStatus = "none";
</script>

<Layer
  render={({ time }) => {
    circleRadius = leapRadius($statesEnteredTime, time);
    isFullyChanged = circleRadius === 1 || $statesEnteredTime === 0;
    gottenStatus = $state;

    if ($health > 0) {
      $characterPos = { x: $mouseX, y: $mouseY };
      if ($characterPos.x === $mouseX && $characterPos.y === $mouseY) {
        $characterReady = true;
      }
    }
  }}
/>

<GroundGrass />
{#if gottenStatus === "awake"}
  <GroundProp props={$props}
  clip={!isFullyChanged}
  clipCircle={circleRadius} />
{/if}
{#if gottenStatus === "sleep"}
  <GroundProp props={$yesterdayProps} />
{:else if gottenStatus === "awake" && !isFullyChanged}
<GroundProp props={$yesterdayProps} clip clipReversed
  clipCircle={circleRadius} />
{/if}

{#if gottenStatus !== "awake" || !isFullyChanged}
  <GroundShadow clip={!isFullyChanged} clipReversed={gottenStatus === "awake"}
  clipCircle={circleRadius} />
{/if}
{#if !isFullyChanged}
  <GroundProp props={$nightProps} clip clipReversed={gottenStatus === "awake"}
  clipCircle={circleRadius} />
{:else if gottenStatus === "sleep"}
  <GroundProp props={$nightProps} />
{/if}
