<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import {
    type PotionDrop,
    potionDrop,
    potiondropResult,
  } from "../../data/potion";
  import { characterDir } from "../../gamevalues";
  import { checkDropToSeed } from "../../objects/plant";
  import { addProps } from "../../objects/prop";

  const render: Render = ({ context, time }) => {
    context.save();
    $potionDrop.forEach((p) => {
      context.fillStyle = `rgb(${p.potion.color.r} ${p.potion.color.g} ${p.potion.color.b} / ${Math.min(100, (p.time + 1000 - time) / 7)}%)`;
      context.fillRect(p.pos.x - 3, p.pos.y, 6, 6);
    });
    context.restore();

    const newPotionDrop: PotionDrop[] = [];
    $potionDrop.forEach((p) => {
      if (time - p.time > 1000) {
        if (p.pos.x > 188 || p.pos.y > 222) {
          const seed = checkDropToSeed(p.potion, p.pos);
          if (seed) addProps(seed);
          else $potiondropResult = [...$potiondropResult, p];
        }
        return;
      }
      if (typeof p.direction === "undefined") {
        newPotionDrop.push({ ...p, direction: $characterDir });
        return;
      }
      if (time - p.time > 300) {
        newPotionDrop.push(p);
        return;
      }
      switch (p.direction) {
        case 0:
          newPotionDrop.push({
            ...p,
            pos: { x: p.pos.x - 1, y: p.pos.y + (time - p.time) / 300 },
          });
          break;
        case 1:
          newPotionDrop.push({
            ...p,
            pos: { x: p.pos.x, y: p.pos.y + (time - p.time) / 300 + 1 },
          });
          break;
        case 2:
          newPotionDrop.push({
            ...p,
            pos: { x: p.pos.x, y: p.pos.y + (time - p.time) / 300 - 1 },
          });
          break;
        case 3:
          newPotionDrop.push({
            ...p,
            pos: { x: p.pos.x + 1, y: p.pos.y + (time - p.time) / 300 },
          });
          break;
      }
    });
    $potionDrop = newPotionDrop;
  };
</script>

<Layer {render} />
