<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { drawSprite } from "../sprite";
  import { getRes } from "../../../assets/image";
  import { createEventDispatcher } from "svelte";
  import { getText } from "../../../assets/text";

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
    drawSprite(context, getRes("ui"), [width / 2, height / 2 - 200 + index * 60, 56, 56], [634, 143, 24, 24], {x: false, y: false}, {x: 0, y: 0.5});
    drawSprite(context, getRes("ui"), [width / 2 + 56, height / 2 - 200 + index * 60, 24, 56], [659, 143, 23, 24], {x: false, y: false}, {x: 0, y: 0.5});
    drawSprite(context, getRes("ui"), [width / 2 + 190 - 110, height / 2 - 200 + index * 60, 110, 56], [756, 118, 47, 24], {x: false, y: false}, {x: 0, y: 0.5});
  }
  else {
    drawSprite(context, getRes("ui"), [width / 2, height / 2 - 200 + index * 60, 56, 56], [634, 118, 24, 24], {x: false, y: false}, {x: 0, y: 0.5});
    drawSprite(context, getRes("ui"), [width / 2 + 56, height / 2 - 200 + index * 60, 24, 56], [659, 118, 23, 24], {x: false, y: false}, {x: 0, y: 0.5});
    drawSprite(context, getRes("ui"), [width / 2 + 190 - 110, height / 2 - 200 + index * 60, 110, 56], [756, 143, 47, 24], {x: false, y: false}, {x: 0, y: 0.5});
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