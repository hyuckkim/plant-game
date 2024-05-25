<script lang="ts">
  import { Layer } from "svelte-canvas";
  import { drawPropImg, isAttached, type Prop } from "../../objects/prop";
  import type { CanvasInfo } from "../../values";
  import { characterPos, state } from "../../gamevalues";

  const roundPos = { x: 80, y: 80 };

  export let props: Prop[];
  export let clipCircle: number = 0;
  export let clip: boolean = false;
  export let clipReversed: boolean = false;

  function clipDayCircle(
    { context, width, height, time }: CanvasInfo,
    reversed: boolean = false
  ) {
    context.beginPath();
    if (reversed) {
      context.rect(0, 0, width, height);
    }
    if (clipCircle > 0) {
      context.arc(
        roundPos.x,
        roundPos.y,
        clipCircle * (width + height),
        0,
        360
      );
      context.clip("evenodd");
    }
  }
  function drawLayeredProps(
    props: Prop[],
    pos: { x: number; y: number },
    context: CanvasRenderingContext2D
  ) {
    props
      .filter((p) => p.layer === "floor")
      .forEach((p) => {
        drawPropImg(context, p);
      });
    props
      .filter((p) => p.layer === "normal")
      .forEach((p) => {
        drawPropImg(context, p);
      });
    props
      .filter((p) => p.layer === "roof")
      .forEach((p) => {
        if ($state === "sleep" || isAttached(p, pos.x, pos.y)) {
          context.globalAlpha = 0.2;
        }
        drawPropImg(context, p);
        context.globalAlpha = 1;
      });
  }
</script>

<Layer
  render={({ context, width, height, time }) => {
    context.save();
    if (clip) clipDayCircle({ context, width, height, time }, clipReversed);

    drawLayeredProps(props, $characterPos, context);
    context.restore();
  }}
/>
