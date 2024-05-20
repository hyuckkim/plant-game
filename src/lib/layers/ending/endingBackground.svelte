<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { characterPos, endingSequence, savedPosition } from "../../gamevalues";
  import GroundGrass from "../background/groundGrass.svelte";
  import { drawSprite } from "../sprite";
  import { getRes } from "../../../assets/image";

  let isFirstFrame = true;
</script>
<Layer render={({ context, width, height, time }) => {
  if ($endingSequence === 0) return;
  if (isFirstFrame) {
    isFirstFrame = false;
    $savedPosition = $characterPos;
  }
  context.save();
  context.fillStyle = "#1a5d90";
  context.fillRect(0, 0, width, height);
  context.beginPath();
  context.rect(0, $savedPosition.y - 100, width, height - ($savedPosition.y - 100));
  context.clip();
}}/>
<GroundGrass />
<Layer render={({ context, width, height, time }) => {
  context.beginPath();
  if ($endingSequence === 0) return;
  for (let i = -40; i < width; i += 80) {
    drawSprite(
      context,
      getRes("prop/pond"),
      [i, $savedPosition.y - 100, 80, 30],
      [31, 137, 40, 15],
      {x: false, y: false},
      {x: 0, y: 0}
    )
  }
  drawSprite(context, getRes("stone"), [$savedPosition.x - 30, $savedPosition.y - 70, 60, 58], [289, 251, 30, 29]);
  context.fillStyle = "white";
  context.font = `40px Brush Script MT`;
  context.fillText("The End", width - 130, height - 15);
  
  context.closePath();
  context.restore();
}} />