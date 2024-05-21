<script lang="ts">
  import { onMount } from "svelte";
  import { loadGameImages } from "./assets/image";

  import License from "./lib/license/license.svelte";
  import Game from "./lib/game.svelte";
  import { loadGameSounds } from "./assets/sound";
  import Skeleton from "./lib/layers/skeleton.svelte";

  let hash = window.location.hash;
  let mouseMoved = false;
  onMount(() => {
    mouseMoved = false;
    const changeHash = () => {
      hash = window.location.hash;
    };
    window.addEventListener("hashchange", changeHash);
    window.addEventListener("click", () => {
      mouseMoved = true;
    });
    return () => {
      window.removeEventListener("hashchange", changeHash);
    };
  });
</script>

{#if hash === "#license"}
  <License />
{:else if !mouseMoved}
  <Skeleton />
{:else}
  {#await Promise.all([loadGameImages(), loadGameSounds()])}
    <Skeleton />
  {:then}
    <Game />
  {/await}
{/if}
