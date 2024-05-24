<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { mouseButtons, type Coord } from "../values";
  import { drawMouseButton } from "./mouseButton";
  import { createEventDispatcher } from "svelte";

  export let pos: Coord;
  export let buttons: mouseButtons;

  const dispatch = createEventDispatcher();
</script>

<Layer
  render={({ context }) => {
    drawMouseButton(context, pos, buttons);
  }}
  on:click={() => dispatch('click')}
/>
