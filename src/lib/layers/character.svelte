<script lang="ts">
  import { latestT, mouseX, mouseY } from "../values";
  import {
    characterDir,
    characterPos,
    health,
    maxHealth,
    nowEnding,
    state,
  } from "../gamevalues";
  import { getRes } from "../../assets/image";

  import Sprite from "./sprite.svelte";
  import { equips } from "../objects/equip";
  import Equip from "./equip.svelte";
  import { pos } from "../values";

  const size = 60;
  const frames = {
    idle: [
      [4, 5, 6, 7],
      [0, 1, 2, 3],
      [12, 13, 14, 15],
      [8, 9, 10, 11],
    ],
    move: [
      [22, 23, 24, 25, 26, 27],
      [16, 17, 18, 19, 20, 21],
      [34, 35, 36, 37, 38, 39],
      [28, 29, 30, 31, 32, 33],
    ],
    die: [40, 41, 42, 43],
  };

  let lx = $mouseX,
    ly = $mouseY,
    dx = 0,
    dy = 0,
    dt = 0,
    ddt = 0;
  $: position = getDirectionFrame(dx, dy, $characterDir, $latestT);
  $: diedPosition = frames.die[Math.min(3, Math.floor(($latestT - ddt) / 160))];

  function getDirectionFrame(
    dx: number,
    dy: number,
    direction: number,
    time: number
  ) {
    if (dx * dx + dy * dy > 2) {
      dt = $latestT;
      const walkingEnoughDir = Math.abs(dx * 2.5) < Math.abs(dy) || Math.abs(dy * 2.5) < Math.abs(dx);
      const running = dx * dx + dy * dy > 10;
      if (walkingEnoughDir || running) {
        $characterDir = (dx < dy ? 2 : 0) + (dx < -dy ? 1 : 0);
      }
    }

    if ($latestT - dt < 500) {
      return frames.move[direction][Math.floor((time / 130) % 4)];
    } else {
      return frames.idle[direction][Math.floor((time / 270) % 4)];
    }
  }
</script>

{#if $health > 0}
  {#if $characterDir === 2 && $equips}
    <Equip equip={$equips} />
  {/if}
  <Sprite
    callback={({ time }) => {

      if ($state === "awake" && !$nowEnding)
        $health -= Math.abs(dx) + Math.abs(dy);
      else $health = Math.min($maxHealth, $health + (time - $latestT));

      (dx = lx - $characterPos.x), (dy = ly - $characterPos.y);
      (lx = $characterPos.x), (ly = $characterPos.y);

      $latestT = time;
      $characterPos = $pos;
    }}
    image={getRes("character")}
    source={[position * 24, 0, 24, 24]}
    render={[$characterPos.x, $characterPos.y, size, size]}
  />
  {#if $characterDir !== 2 && $equips}
    <Equip equip={$equips} />
  {/if}
{:else}
  <Sprite
    callback={({ time }) => {
      if (ddt === 0) ddt = time;
      $latestT = time;
    }}
    image={getRes("character")}
    source={[diedPosition * 24, 0, 24, 24]}
    render={[$characterPos.x, $characterPos.y, size, size]}
    flipped={{ x: dx > 0, y: false }}
  />
{/if}
