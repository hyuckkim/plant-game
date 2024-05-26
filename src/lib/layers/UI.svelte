<script lang="ts">
  import { Layer, type Render } from "svelte-canvas";
  import {
    characterPos,
    health,
    initializeMaxHealth,
    maxHealth,
    resetTry,
    seedText,
    state,
  } from "../gamevalues";
  import { HealthBarExtraHeight } from "../gamevalues";
  import { onMount } from "svelte";
  import { drawHealthBar, drawItemPanel } from "./ui";
  import { drawPropImg, getCurrentProps } from "../objects/prop";
  import { mouseX, mouseY, pos, rClick, type Coord } from "../values";
  import { equips } from "../objects/equip";
  import { drawSprite } from "./sprite";
  import { getRes } from "../../assets/image";

  const marginX = 20;
  const marginY = 5;

  onMount(() => {
    setTimeout(() => {
      $HealthBarExtraHeight = 0;
    }, 0);
  });

  const renderHealthBar: Render = (canvas) => {
    const { width, height } = canvas;
    const tempHealth =
      $rClick && $state === "awake"
        ? Math.abs($pos.x + $pos.y - ($mouseX + $mouseY))
        : 0;
    for (
      let m = $maxHealth, h = $health, t = tempHealth, j = 1;
      m > 0;
      m -= initializeMaxHealth,
        h -= initializeMaxHealth,
        t -= initializeMaxHealth,
        j++
    ) {
      drawHealthBar(
        canvas,
        [
          marginX,
          height - 40 * j - marginY + $HealthBarExtraHeight,
          (width - marginX * 2) *
            (Math.min(m, initializeMaxHealth) / initializeMaxHealth),
          0,
        ],
        Math.min(h - tempHealth, initializeMaxHealth) /
          Math.min(m, initializeMaxHealth),
        Math.min(tempHealth, initializeMaxHealth) /
          Math.min(m, initializeMaxHealth)
      );
    }
  }

  const renderAttachedUI: Render = (canvas) => {
    getCurrentProps()
      .filter((p) => p.isAttached($characterPos.x, $characterPos.y))
      .forEach((p) => {
        p.ui(canvas, p.state);
    });
  }

  const renderDistanceUI: Render = ({ context }) => {
    context.save();
    context.font = `10px Verdana`;
    context.fillStyle = "#fffa";
    context.strokeStyle = "#fffa";
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo($pos.x, $pos.y + 30);
    context.lineTo($mouseX, $mouseY + 30);
    context.fillText(
      `${Math.floor(Math.abs($pos.x - $mouseX))} x ${Math.floor(Math.abs($pos.y - $mouseY))}`,
      $mouseX + 5,
      $mouseY + 35
    );
    context.stroke();
    context.restore();
  }

  const renderSeedText: Render = ({ context, width, height }) => {
    context.save();
    context.font = `10px Verdana`;
    context.fillStyle = "#fffa";
    context.fillText(
      `seed: ${$seedText}`,
      width - context.measureText(`seed: ${$seedText}`).width - 5,
      15
    );
    context.restore();
  }

  const renderItemPanel: Render = ({ context, width, height }) => {
    drawSprite(context, getRes("ui"), [width, height - 114, 10, 36], [116, 333, 5, 18], { x: false, y: false}, {x: 1, y: 0.5});
    drawItemPanel(context, [width - 66, height - 144, 60, 60]);
    if ($equips) {
      const itemPropCoord: Coord = [width - 34, height - 114, $equips.pos[2], $equips.pos[3]];
      drawPropImg(context, {img: $equips.img, state: {...$equips.state, pos: itemPropCoord}});
    }
  }

  const renderResetDark: Render = ({ context, width, height }) => {
    context.save();
    const data = ["#0000", "#0003", "#0006", "#0009", "#000b"];
    context.fillStyle = data[$resetTry];
    context.fillRect(0, 0, width, height);
    context.restore();
  }
</script>
<Layer
  render={(canvas) => {
    renderHealthBar(canvas);
    renderAttachedUI(canvas);
    renderSeedText(canvas);
    renderItemPanel(canvas);
    if ($rClick) renderDistanceUI(canvas);
    if ($resetTry) renderResetDark(canvas);
  }}
/>
