<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { potionDrop } from "../../data/potion";
  import { characterDir } from "../../gamevalues";

</script>

<Layer render={({ context,  time }) => {
  context.save();
  $potionDrop.forEach(p => {
    console.log((p.time + 1000 - time) / (7));
    context.fillStyle = `rgb(${p.potion.color.r} ${p.potion.color.g} ${p.potion.color.b} / ${Math.min(100, (p.time + 1000 - time) / (7))}%)`;
    context.fillRect(p.pos.x - 3, p.pos.y, 6, 6);
  });
  context.restore();

  $potionDrop = $potionDrop.filter(p => time - p.time < 1000)
    .map(p => typeof p.direction === "undefined" ? {...p, direction: $characterDir } 
    : time - p.time > 300 ? p :
    p.direction === 0 ? {...p, pos: {x: p.pos.x - 1, y: p.pos.y + (time - p.time) / 300}} :
    p.direction === 1 ? {...p, pos: {x: p.pos.x, y: p.pos.y + (time - p.time) / 300 + 1}} :
    p.direction === 2 ? {...p, pos: {x: p.pos.x, y: p.pos.y + (time - p.time) / 300 - 1}} :
    p.direction === 3 ? {...p, pos: {x: p.pos.x + 1, y: p.pos.y + (time - p.time) / 300}} : p);
}}
/>