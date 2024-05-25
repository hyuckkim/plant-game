import { get, writable } from "svelte/store";
import { characterPos, state } from "../gamevalues";
import type { CanvasInfo, Coord } from "../values";
import { equips, setEquip } from "./equip";
import { drawSprite } from "../layers/sprite";

export type Prop = {
  img: CanvasImageSource | PropRender;
  source: Coord;
  flipped: { x: boolean; y: boolean };

  display: "always" | "day" | "night";
  layer: "normal" | "roof" | "floor";
  click_order: number;

  state: PropState;
  onClick: (state: PropState) => boolean;
  onDayEnd: (state: PropState) => boolean;
  ui: (canvas: CanvasInfo, state: PropState) => void;
};

export type PropRender = (
  context: CanvasRenderingContext2D,
  state: PropState
) => void;

export type PropState = {
  pos: Coord,
  tag?: string,
  [key: string]: any
};

export function newProp(data: Partial<Prop>): Prop {
  const defaultProp: Prop = {
    img: new Image(),
    source: [0, 0, 0, 0],
    flipped: { x: false, y: false },
    display: "day",
    layer: "normal",
    click_order: 0,
    state: { pos: [0, 0, 0, 0]},
    onClick: () => true,
    onDayEnd: () => true,
    ui: () => {},
  };

  return { ...defaultProp, ...data };
}

export const props = writable<Prop[]>([]);
export const yesterdayProps = writable<Prop[]>([]);
export const nightProps = writable<Prop[]>([]);

export function initializeProps() {
  props.set([]);
  yesterdayProps.set([]);
  nightProps.set([]);
}

export function addProps(p: Prop) {
  if (p.display === "day") {
    props.set([...get(props), p]);
  }
  if (p.display === "night") {
    nightProps.set([...get(nightProps), p]);
  }
  if (p.display === "always") {
    props.set([...get(props), p]);
    nightProps.set([...get(nightProps), p]);
  }
}

export function removeProps(p: Prop) {
  if (p.display === "day") {
    props.set(get(props).filter((t) => t !== p));
  }
  if (p.display === "night") {
    nightProps.set(get(nightProps).filter((t) => t !== p));
  }
  if (p.display === "always") {
    props.set(get(props).filter((t) => t !== p));
    nightProps.set(get(nightProps).filter((t) => t !== p));
  }
}
export function getCurrentProps(): Prop[] {
  if (get(state) === "awake") return get(props);
  if (get(state) === "sleep") return get(nightProps);
  return [];
}

export function click(x: number, y: number) {
  const equip = get(equips);
  if (equip !== undefined) {
    const equipResult = equip.onClick(equip.state);
    if (equipResult === undefined) {
      equips.set(undefined);
    } else if (equipResult !== true) {
      setEquip(equipResult);
    }
    return;
  }

  const clickedProp = getCurrentProps()
    .filter((p) => isAttached(p, x, y))
    .filter((p) => p.layer === "normal")
    .sort((a, b) => getDistance(a, x, y) - getDistance(b, x, y))
    .sort((a, b) => b.click_order - a.click_order)
    [0];

  if (!!clickedProp) {
    const result = clickedProp.onClick(clickedProp.state);
    if (!result) removeProps(clickedProp);
  }
}
export function wheelMove(dy: number) {
  const equip = get(equips);
  if (equip) {
    if (dy < 0) {
      const equipResult = equip.onWheelUp(equip.state);
      if (equipResult === undefined) {
        equips.set(undefined);
      } else if (equipResult !== true) {
        setEquip(equipResult);
      }
    }
    if (dy > 0) {
      const equipResult = equip.onWheelDown(equip.state);
      if (equipResult === undefined) {
        equips.set(undefined);
      } else if (equipResult !== true) {
        setEquip(equipResult);
      }
    }
  }
}
export function dayEnd() {
  yesterdayProps.set(get(props));
  get(props).forEach((p) => {
    const result = p.onDayEnd(p.state);
    if (!result) removeProps(p);
  });
}
export function dayStarted() {
  get(nightProps).forEach((p) => {
    const result = p.onDayEnd(p.state);
    if (!result) removeProps(p);
  });
}
export function drawPropImg(
  context: CanvasRenderingContext2D,
  p: {
    img: CanvasImageSource | PropRender;
    source: Coord;
    flipped: { x: boolean; y: boolean };
    state: PropState;
  }
) {
  if (typeof p.img === "function") {
    p.img(context, p.state);
  }
  else drawSprite(context, p.img, p.state.pos, p.source, p.flipped);
}
export function attachedTag(tag: string) {
  const result = getCurrentProps()
  .filter((p) => isAttached(p, get(characterPos).x, get(characterPos).y))
  .filter(p => p.state.tag === tag);
  
  if (result.length === 0) return undefined;
  return result;
}
export function isAttached(p: Prop, x: number, y: number) {
  return (
    p.state.pos[0] - p.state.pos[2] * 0.5 < x &&
    x < p.state.pos[0] + p.state.pos[2] * 0.5 &&
    p.state.pos[1] - p.state.pos[3] * 0.5 < y &&
    y < p.state.pos[1] + p.state.pos[3] * 0.5
  );
}
export function getDistance(p: Prop, x: number, y: number) {
  return p.state.pos[0] - x * p.state.pos[0] - x + p.state.pos[1] - y * p.state.pos[1] - y;
}
