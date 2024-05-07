<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import { getRes } from "../../assets/image";
  import {
    characterPos,
    characterReady,
    health,
    lastCharacterPos,
    state,
    statesEnteredTime,
  } from "../gamevalues";
  import { drawSprite } from "./sprite";
  import {
    isAttached,
    props,
    nightProps,
    yesterdayProps,
    type Prop,
  } from "../objects/prop";
  import { mouseX, mouseY } from "../values";

  const roundPos = { x: 80, y: 80 };
  const leapRadius = (start: number, now: number) => {
    const end = start + 600;
    return Math.min((now - start) / (end - start), 1);
  };

  const drawGress: Render = ({ context, width, height, time }) => {
    context.imageSmoothingEnabled = false;
    for (let x = 0; x < width; x += 320) {
      for (let y = (-x / 40) % 8; y < height; y += 320) {
        context.drawImage(getRes("tileset"), 0, 0, 128, 128, x, y, 320, 320);
      }
    }
  };

  const drawTodayProps: Render = ({ context, width, height, time }) => {
    if ($state === "none") return;
    if ($state === "sleep") return;

    context.save();
    if (!isFullyChanged(time)) {
      clipDayCircle({ context, width, height, time });
    }

    drawLayeredProps($props, $characterPos, context);
    context.restore();
  };

  const drawYesterdayProps: Render = ({ context, width, height, time }) => {
    if ($state === "none") return;
    if ($state === "awake" && isFullyChanged(time)) return;

    context.save();
    if ($state === "awake") {
      clipDayCircle({ context, width, height, time }, true);
    }
    drawLayeredProps($yesterdayProps, $lastCharacterPos, context);
    context.restore();
  };
  const drawNightProps: Render = ({ context, width, height, time }) => {
    if ($state === "none") return;
    if (($state === "awake") && isFullyChanged(time)) return;
    context.save();
    if (!isFullyChanged(time)) {
      if ($state === "awake") {
        clipDayCircle({ context, width, height, time }, true);
      } else if ($state === "sleep") {
        clipDayCircle({ context, width, height, time });
      }
    }

    drawLayeredProps($nightProps, $characterPos, context);
    context.restore();
  };

  function isFullyChanged(time: number) {
    return (
      leapRadius($statesEnteredTime, time) === 1 || $statesEnteredTime === 0
    );
  }

  type CanvasInfo = {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    time: number;
  };
  function clipDayCircle(
    { context, width, height, time }: CanvasInfo,
    reversed: boolean = false
  ) {
    const radius = leapRadius($statesEnteredTime, time);
    context.beginPath();
    if (reversed) {
      context.rect(0, 0, width, height);
    }
    context.arc(roundPos.x, roundPos.y, radius * (width + height), 0, 360);
    context.clip("evenodd");
  }

  function drawLayeredProps(
    props: Prop[],
    pos: { x: number; y: number },
    context: CanvasRenderingContext2D
  ) {
    props
      .filter((p) => p.layer === "floor")
      .forEach((p) => {
        drawSprite(context, p.img, p.pos, p.source, p.flipped);
      });
    props
      .filter((p) => p.layer === "normal")
      .forEach((p) => {
        drawSprite(context, p.img, p.pos, p.source, p.flipped);
      });
    props
      .filter((p) => p.layer === "roof")
      .forEach((p) => {
        if ($state === "sleep" || isAttached(p, pos.x, pos.y)) {
          context.globalAlpha = 0.2;
        }
        drawSprite(context, p.img, p.pos, p.source, p.flipped);
        context.globalAlpha = 1;
      });
  }

  const fillShadow: Render = ({ context, width, height, time }) => {
    context.fillStyle = "#000c";
    const radius = leapRadius($statesEnteredTime, time);
    if ($state === "sleep" || $state === "none") {
      context.beginPath();
      if (isFullyChanged(time)) {
        context.rect(0, 0, width, height);
      } else {
        context.arc(roundPos.x, roundPos.y, radius * (width + height), 0, 360);
      }
      context.fill();
    } else if (!isFullyChanged(time)) {
      clipDayCircle({ context, width, height, time }, true);
      context.rect(0, 0, width, height);
      context.fill();
    }
  };
</script>

<Layer
  render={(canvas) => {
    canvas.context.save();
    drawGress(canvas);
    drawTodayProps(canvas);
    drawYesterdayProps(canvas);
    fillShadow(canvas);
    drawNightProps(canvas);
    canvas.context.restore();
    
    if ($health > 0) {
      $characterPos = { x: $mouseX, y: $mouseY };
      if ($characterPos.x === $mouseX && $characterPos.y === $mouseY) {
        $characterReady = true;
      }
    }
  }}
/>
