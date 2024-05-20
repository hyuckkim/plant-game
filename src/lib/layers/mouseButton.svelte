<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { mouseButtons, type Coord } from "../values";
  import { drawMouseButton } from "./mouseButton";

  export let pos: Coord;
  export let buttons: mouseButtons;
</script>

<Layer
  render={({ context }) => {
    drawMouseButton(context, pos, buttons);
  }}
/>
