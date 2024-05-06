<script lang="ts">
  import { addCoord, latestT, mouseX, mouseY, type Coord } from "../values";
  import { characterPos, health, maxHealth, state } from "../gamevalues";
  import { getRes } from "../../assets/image";

  import Sprite from "./sprite.svelte";
  import { equips } from "../objects/equip";

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
    dir = 0,
    ddt = 0;
  $: position = getDirectionFrame(dx, dy, dir, $latestT);
  $: diedPosition = frames.die[Math.min(3, Math.floor(($latestT - ddt) / 160))];

  $: equipPos = dir === 0 ? -7
    : dir === 1 ? 0
    : dir === 2 ? 0
    : 7;
  
  function getDirectionFrame(
    dx: number,
    dy: number,
    direction: number,
    time: number
  ) {
    if (dx * dx + dy * dy > 0.5) {
      dir = (dx < dy ? 2 : 0) + (dx < -dy ? 1 : 0);
      dt = $latestT;
    }

    if ($latestT - dt < 500) {
      return frames.move[direction][Math.floor((time / 130) % 4)];
    } else {
      return frames.idle[direction][Math.floor((time / 270) % 4)];
    }
  }
</script>

{#if $health > 0}
  {#if dir === 2 && $equips}
    <Sprite
      image={$equips.img}
      source={$equips.source}
      render={addCoord($equips.pos, [$characterPos.x, $characterPos.y, 0, 0])}
    />
  {/if}
  <Sprite
    callback={({ time }) => {
      characterPos.set({ x: $mouseX, y: $mouseY });
      if ($state === "awake") $health -= Math.abs(dx) + Math.abs(dy);
      else $health = Math.min(maxHealth, $health + (time - $latestT) * 0.5);

      (dx = lx - $characterPos.x), (dy = ly - $characterPos.y);
      (lx = $characterPos.x), (ly = $characterPos.y);

      $latestT = time;
    }}
    image={getRes("character")}
    source={[position * 24, 0, 24, 24]}
    render={[$characterPos.x, $characterPos.y, size, size]}
  />
  {#if dir !== 2 && $equips}
    <Sprite
      image={$equips.img}
      source={$equips.source}
      render={addCoord($equips.pos, [$characterPos.x + equipPos, $characterPos.y, 0, 0])}
    />
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
