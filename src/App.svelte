<script lang="ts">
  import { onMount } from "svelte";
  import { loadGameImages } from "./assets/image";

  import License from "./lib/license/license.svelte";
  import Game from "./lib/game.svelte";
  import { loadGameSounds } from "./assets/sound";
  import Skeleton from "./lib/layers/skeleton.svelte";
  import Loading from "./lib/layers/loading.svelte";

  let hash = window.location.hash;
  let mouseMoved = false;
  let seed: string = "";
  onMount(() => {
    mouseMoved = false;
    const changeHash = () => {
      hash = window.location.hash;
    };
    window.addEventListener("hashchange", changeHash);
    return () => {
      window.removeEventListener("hashchange", changeHash);
    };
  });
</script>

{#if hash === "#license"}
  <License />
{:else}
{#await Promise.all([loadGameImages(), loadGameSounds()])}
  <Loading />
{:then [res, soundRes]}
  {#if mouseMoved}
  <Game {res} {soundRes} userSeed={seed} />
  {:else}
  <Skeleton on:start={(e) => {
    mouseMoved = true;
    seed = e.detail.seed;
  }}/>
  {/if}
{/await}
{/if}
