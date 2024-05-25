<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { createEventDispatcher } from "svelte";
  import { getText } from "../../../assets/text";
  import { drawPanelHorizontal } from "../ui";

  export let index: number;
  export let text: string;
  export let key: string;
  const dispatch = createEventDispatcher();

  export let pressed: boolean;
  let readyToclick = false;
</script>

<Layer render={({ context, width, height, time }) => {
  let actionText = getText(text);
  let keyText = key;
  if (key.startsWith("mouse") || key.startsWith("wheel")) {
    keyText = getText(key);
  }
  context.save();
  context.fillStyle = "white";
  context.font = `${20}px Verdana`;
  context.fillText(actionText, width / 2 - 180, height / 2 - 190 + index * 60);
  if (pressed) {
    drawPanelHorizontal(context, [width / 2, height / 2 - 222 + index * 60, 190, 48], {
      slices: [
        [634, 143, 24, 24],
        [659, 143, 23, 24],
        [756, 118, 47, 24],
      ],
      scale: 2
    });
  }
  else {
    drawPanelHorizontal(context, [width / 2, height / 2 - 222 + index * 60, 190, 48], {
      slices: [
        [634, 118, 24, 24],
        [659, 118, 23, 24],
        [756, 143, 47, 24],
      ],
      scale: 2
    });
  }
  context.fillText(keyText, width / 2 + 15, height / 2 - 190 + index * 60);
  context.fillStyle = "#0000";
  context.fillRect(width / 2 + 15, height / 2 - 220 + index * 60, 115, 40);
  context.restore();
}}
on:mousedown={() => {
  if (!pressed) readyToclick = true;
}}
on:mouseup={() => {
  if (readyToclick) dispatch('click');
  readyToclick = false;
}}
/>