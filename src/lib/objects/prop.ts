import { get, writable } from "svelte/store";
import { characterPos, state } from "../gamevalues";
import type { CanvasInfo, Coord } from "../values";
import { equips, setEquip } from "./equip";
import { drawSprite } from "../layers/sprite";

export class Prop {
  img: PropSprite | FPropSprite | PropRender;
  display: "always" | "day" | "night";
  layer: "normal" | "roof" | "floor";
  click_order: number;

  state: PropState;
  onClick: (state: PropState) => boolean;
  onDayEnd: (state: PropState) => boolean;
  ui: (canvas: CanvasInfo, state: PropState) => void;

  constructor({
    img,
    display,
    layer,
    click_order,

    state,
    onClick,
    onDayEnd,
    ui
  }: {
    img?: PropSprite | FPropSprite | PropRender,
    display?: "always" | "day" | "night",
    layer?: "normal" | "roof" | "floor",
    click_order?: number,

    state?: PropState,
    onClick?: (state: PropState) => boolean,
    onDayEnd?: (state: PropState) => boolean,
    ui?: (canvas: CanvasInfo, state: PropState) => void
  }) {
    this.img = img ?? {img: new Image(), coord: [0, 0, 0, 0], flipped: { x: false, y: false }};
    this.display = display ?? "day";
    this.layer = layer ?? "normal";
    this.click_order = click_order ?? 0;
    this.state = state ?? {pos: [0, 0, 0, 0]};
    this.onClick = onClick ?? (() => true);
    this.onDayEnd = onDayEnd ?? (() => true);
    this.ui = ui ?? (() => {});
  }

  public isAttached(x: number, y: number) {
    return (
      this.state.pos[0] - this.state.pos[2] * 0.5 < x &&
      x < this.state.pos[0] + this.state.pos[2] * 0.5 &&
      this.state.pos[1] - this.state.pos[3] * 0.5 < y &&
      y < this.state.pos[1] + this.state.pos[3] * 0.5
    );
  }

  public getDistance(x: number, y: number) {
    return (
      (this.state.pos[0] - x) * (this.state.pos[0] - x) +
      (this.state.pos[1] - y) * (this.state.pos[1] - y)
    );
  }
}
export type PropSprite = {
  img: CanvasImageSource,
  coord: Coord,
  flipped: { x: boolean, y: boolean }
}
export type FPropSprite = (
  state: PropState
) => PropSprite;
export type PropRender = (
  state: PropState,
  context: CanvasRenderingContext2D
) => void;

export type PropState = {
  pos: Coord,
  tag?: string,
  [key: string]: any
};

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
    .filter((p) => p.isAttached(x, y))
    .filter((p) => p.layer === "normal")
    .sort((a, b) => a.getDistance(x, y) - b.getDistance(x, y))
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
    img: PropSprite | FPropSprite | PropRender;
    state: PropState;
  }
) {
  if (typeof p.img === "function") {
    const r = p.img(p.state, context);
    if (r) {
      drawSprite(context, r.img, p.state.pos, r.coord, r.flipped);
    }
  }
  else drawSprite(context, p.img.img, p.state.pos, p.img.coord, p.img.flipped);
}
export function attachedTag(tag: string) {
  const result = getCurrentProps()
  .filter((p) => p.isAttached(get(characterPos).x, get(characterPos).y))
  .filter(p => p.state.tag === tag);
  
  if (result.length === 0) return undefined;
  return result;
}