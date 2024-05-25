<script lang="ts">
  import { Canvas, Layer } from "svelte-canvas";
  import MouseButton from "./mouseButton.svelte";
  import { mouseButtons, mouseX, mouseY, pos } from "../values";
  import { createEventDispatcher, onMount } from "svelte";
  import SettingButton from "./setting/settingButton.svelte";
  import { drawSprite } from "./sprite";
  import { getRes } from "../../assets/image";
  import { drawPanel, drawPanelHorizontal } from "./ui";
  import RemoveSettingButton from "./setting/removeSettingButton.svelte";
  import { getText } from "../../assets/text";

  const dispatch = createEventDispatcher();
  let open = false;
  
  onMount(() => {
    const localKeyData = localStorage.getItem("control");
    if (localKeyData) {
      keyData = JSON.parse(localKeyData);
    }

    const event = (e: KeyboardEvent) => {
      if (seedInput && /[0-9a-z]/.test(e.key) && e.key.length === 1 && seedText.length < 10) {
        seedText = `${seedText}${e.key}`;
      }
      changeKey(e.key);
    }
    addEventListener('keypress', event);
    return () => {
      removeEventListener('keypress', event);
    }
  });

  function changeKey(key: string, index?: number) {
    if (index !== undefined) {
      keyData[index].key = key;
    }
    else if (clicked !== undefined) {
      keyData[clicked].key = key;
      clicked = undefined;
    }
    localStorage.setItem("control", JSON.stringify(keyData));
  }
  let clicked: number | undefined = undefined;
  let keyData = [
  { action: "move", key: "mouse_-1" },
  { action: "interact", key: "mouse_0" },
  { action: "equip_interact_1", key: "wheel_0" },
  { action: "equip_interact_2", key: "wheel_1" },
  { action: "measuring", key: "mouse_2" },
  ];
  let defaultKeyData = ["mouse_-1", "mouse_0", "wheel_0", "wheel_1", "mouse_2"];

  let seedInput = false;
  let seedText = "";
  let w = 0, h = 0;
</script>

<Canvas
  layerEvents
  on:mousemove={(e) => {
    $mouseX = e.pageX;
    $mouseY = e.pageY;
    $pos = { x: $mouseX, y: $mouseY };
    changeKey(`mouse_${-1}`);
  }}
  on:mousedown={(e) => {
    changeKey(`mouse_${e.button}`);
  }}
  on:wheel={(e) => {
    changeKey(`wheel_${e.deltaY < 0 ? 0 : 1}`);
    e.preventDefault();
  }}
  on:contextmenu={(e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }}
>
  <Layer
    render={({ context, width, height }) => {
      context.save();
      context.fillStyle = "#171705";
      context.fillRect(0, 0, width, height);
      context.restore();
    }}
    on:click={() => dispatch('start', { seed: seedText })}
  />
  <MouseButton pos={[300, 300, 200, 300]} buttons={mouseButtons.Left} on:click={() => dispatch('start')}/>
  <Layer render={({ context, width, height }) => {
    w = width; h = height;
    try {
      if (open) {
        context.save();
        context.fillStyle = "white";
        drawPanel(context, [width / 2 - 200, height / 2 - 300, 400, 600]);
        context.font = `${40}px Verdana`;
        context.fillText(getText("control_setting"), width / 2 - 190, height / 2 - 250);
        context.font = `${16}px Verdana`;
        context.fillText(getText("control_warning"), width / 2 - 190, height / 2 - 230);

        context.fillStyle = "white";
        context.font = `${40}px Verdana`;
        context.fillText(getText("seed_setting"), width / 2 - 190, height / 2 + 150);
        if (seedInput) {
          drawPanelHorizontal(context, [width / 2 - 160, height / 2 + 170, 320, 52], {
          slices: [
            [634, 84, 40, 26], // left
            [675, 84, 40, 26], // middle
            [716, 84, 40, 26]  // right
          ],
          scale: 2
        });
        } else {
          drawPanelHorizontal(context, [width / 2 - 160, height / 2 + 170, 320, 52], {
          slices: [
            [634, 24, 40, 26], // left
            [675, 24, 40, 26], // middle
            [716, 24, 40, 26]  // right
          ],
          scale: 2
        });
        }
        context.font = `${20}px Verdana`;
        context.fillText(seedText, width / 2 - 130, height / 2 + 200);
        context.fillStyle = '#0000';
        context.fillRect(width / 2 - 130, height / 2 + 180, 260, 40);
        context.restore();
      }
      drawSprite(context, getRes("ui"), [width, height, 56, 56], [721, 512, 28, 28], { x: false, y: false }, {x: 1, y: 1});

    }
    catch (e) {}
  }}
  on:click={e => {
    open = true;
    if (e.detail.x > w / 2 - 160 && e.detail.x < w / 2 + 160 && e.detail.y > h / 2 + 148 && e.detail.y < h / 2 + 252) {
      seedInput = !seedInput;
      if (!seedInput) seedText = "";
    }
  }}
  />
  {#if open}
    {#each keyData as data, index}
      <SettingButton text={data.action} key={data.key} {index}
        on:click={() => clicked = index}
        pressed={clicked === index}
      />
      {#if keyData[index].key !== defaultKeyData[index]}
        <RemoveSettingButton {index}
          on:click={() => { changeKey(defaultKeyData[index], index) }}
        />
      {/if}
    {/each}
  {/if}
  {#if clicked !== undefined}
    <Layer render={({ context, width, height }) => {
      context.save();
      context.font = '30px Verdana';
      const text = getText("control_setting_check", getText(keyData[clicked ?? 0].action));
      const length = context.measureText(text);
      context.fillText(text, width / 2 - length.width / 2, height - 40);
      context.restore();
    }} />
  {/if}
</Canvas>
