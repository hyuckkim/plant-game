<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import { type PotionDrop, potionDrop, potiondropResult } from "../../data/potion";
  import { characterDir } from "../../gamevalues";

  const render: Render = ({ context, time }) => {
    context.save();
    $potionDrop.forEach(p => {
      context.fillStyle = `rgb(${p.potion.color.r} ${p.potion.color.g} ${p.potion.color.b} / ${Math.min(100, (p.time + 1000 - time) / (7))}%)`;
      context.fillRect(p.pos.x - 3, p.pos.y, 6, 6);
    });
    context.restore();

    const newPotionDrop: PotionDrop[] = [];
    $potionDrop.forEach(p => {
      if (time - p.time > 1000) $potiondropResult = [...$potiondropResult, p];
      else {
        if (typeof p.direction === "undefined") {
          newPotionDrop.push({...p, direction: $characterDir });
        }
        else {
          newPotionDrop.push(
            time - p.time > 300 ? p :
            p.direction === 0 ? {...p, pos: {x: p.pos.x - 1, y: p.pos.y + (time - p.time) / 300}} :
            p.direction === 1 ? {...p, pos: {x: p.pos.x, y: p.pos.y + (time - p.time) / 300 + 1}} :
            p.direction === 2 ? {...p, pos: {x: p.pos.x, y: p.pos.y + (time - p.time) / 300 - 1}} :
            p.direction === 3 ? {...p, pos: {x: p.pos.x + 1, y: p.pos.y + (time - p.time) / 300}} : p
          );
        }
      }
    });
    $potionDrop = newPotionDrop;
  }
</script>

<Layer {render} />