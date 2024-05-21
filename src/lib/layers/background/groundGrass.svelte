<script>
  import { Layer } from "svelte-canvas";
  import { getRes } from "../../../assets/image";
</script>

<Layer
  render={({ context, width, height }) => {
    context.save();
    context.imageSmoothingEnabled = false;
    for (let x = 0; x < width; x += 320) {
      for (let y = (-x / 40) % 8; y < height; y += 320) {
        context.drawImage(getRes("grass"), 0, 0, 128, 128, x, y, 320, 320);
      }
    }
    for (let i = 0; i < 3; i++) {
      context.drawImage(getRes("grass"), 0, 127 + i * 16, 16, 64, -5 + i * 64, -5, 32, 128);
      context.drawImage(getRes("grass"), 16, 127 + i * 16, 16, 64, 27 + i * 64, -21, 32, 128);
      context.drawImage(getRes("grass"), 32, 127 + i * 16, 16, 64, -5 + i * 64, 123, 32, 128);
      context.drawImage(getRes("grass"), 48, 127 + i * 16, 16, 64, 27 + i * 64, 107, 32, 128);
    }
      context.drawImage(getRes("grass"), 32, 159, 16, 64, 27 + 3 * 64, 43, 32, 128);
      context.drawImage(getRes("grass"), 16, 127, 16, 64, -5 + 3 * 64, -37, 32, 128);
      context.drawImage(getRes("grass"), 0, 127, 16, 64, -5 + 3 * 64, 95, 32, 128);
    context.restore();
  }}
/>
