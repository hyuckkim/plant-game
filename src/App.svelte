<script lang="ts">
  import { onMount } from "svelte";
  import { loadGameImages } from "./assets/image";

  import License from "./lib/license/license.svelte";
  import Game from "./lib/game.svelte";

  let hash = window.location.hash;
  onMount(() => {
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
  {#await Promise.all([loadGameImages()])}
    <div class="loading">loading...</div>
  {:then}
    <Game />
  {/await}
{/if}

<style>
  .loading {
    background-color: #171705;
  }
</style>