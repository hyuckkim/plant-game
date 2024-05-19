<script>
  import { Layer } from "svelte-canvas";
  import { getRes } from "../../../assets/image";

</script>
<Layer render={({ context, width, height }) => {
  context.save();
  context.imageSmoothingEnabled = false;
  for (let x = 0; x < width; x += 320) {
    for (let y = (-x / 40) % 8; y < height; y += 320) {
      context.drawImage(getRes("grass"), 0, 0, 128, 128, x, y, 320, 320);
    }
  }
  context.restore();
}} />