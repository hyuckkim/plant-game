<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { particles } from "../../particle";
  import { characterPos } from "../../gamevalues";
  import { attachedTag } from "../../objects/prop";
  import { playSoundSFX } from "../../../assets/sound";

  const maximumTime = 800;
  const maximumSize = 10;
  const xSize = 2;
  const footY = 25;

  let movements = 0;
  let latestCharacterPos = { x: 0, y: 0 };
</script>

<Layer
  render={({ context, time }) => {
    $particles = $particles.filter((p) => time - p.t < maximumTime);
    $particles.forEach((n) => {
      const lt = time - n.t;
      if (maximumTime - lt < 0) return;

      context.save();
      context.beginPath();
      context.ellipse(
        n.x,
        n.y + footY,
        ((maximumTime - lt) / maximumTime) * maximumSize * xSize,
        ((maximumTime - lt) / maximumTime) * maximumSize,
        0,
        0,
        2 * Math.PI
      );
      context.strokeStyle = "#fff2";
      context.lineWidth = 2;
      context.stroke();
      context.restore();
      context.closePath();
    });

    movements +=
      Math.abs($characterPos.x - latestCharacterPos.x) +
      Math.abs($characterPos.y - latestCharacterPos.y);

    if (movements > 100) {
      $particles = [
        ...$particles,
        {
          x: $characterPos.x,
          y: $characterPos.y,
          t: time,
        },
      ];
      if (attachedTag("pond")) playSoundSFX("step/water");
      else playSoundSFX("step/grass");

      movements %= 100;
    }
    latestCharacterPos = $characterPos;
  }}
/>
