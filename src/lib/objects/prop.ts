import { get, writable } from "svelte/store";
import { state } from "../gamevalues";

export type Prop = {
  img: CanvasImageSource;
  source: [x: number, y: number, w: number, h: number];
  pos: [x: number, y: number, w: number, h: number];
  flipped: { x: boolean; y: boolean };

  display: "always" | "day" | "night";
  layer: "normal" | "roof" | "floor";

  state: PropState;
  onClick: (state: PropState) => boolean;
  onDayEnd: (state: PropState) => boolean;
};
type PropState = {[key: string]: string | number};

export function newProp(data: Partial<Prop>): Prop {
  const defaultProp: Prop = {
    img: new Image(),
    source: [0, 0, 0, 0],
    pos: [0, 0, 0, 0],
    flipped: { x: false, y: false },
    display: "day",
    layer: "normal",
    state: {},
    onClick: () => true,
    onDayEnd: () => true,
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

export function click(x: number, y: number) {
  let currentProps =
    get(state) === "awake"
      ? get(props)
      : get(state) === "sleep"
      ? get(nightProps)
      : [];
  const clickedProp = currentProps
    .filter((p) => isAttached(p, x, y))
    .filter((p) => p.layer === "normal")
    .sort((a, b) => getDistance(a, x, y) - getDistance(b, x, y))[0];

  if (!!clickedProp) {
    const result = clickedProp.onClick(clickedProp.state);
    if (!result) removeProps(clickedProp);
  }
}
export function dayEnd() {
  yesterdayProps.set(get(props));
  get(props).forEach(p => {
    const result = p.onDayEnd(p.state);
    if (!result) removeProps(p);
  });
}
export function dayStarted() {
  get(nightProps).forEach(p => {
    const result = p.onDayEnd(p.state);
    if (!result) removeProps(p);
  });
}
export function isAttached(p: Prop, x: number, y: number) {
  return (
    p.pos[0] - p.pos[2] * 0.5 < x &&
    x < p.pos[0] + p.pos[2] * 0.5 &&
    p.pos[1] - p.pos[3] * 0.5 < y &&
    y < p.pos[1] + p.pos[3] * 0.5
  );
}
export function getDistance(p: Prop, x: number, y: number) {
  return p.pos[0] - x * p.pos[0] - x + p.pos[1] - y * p.pos[1] - y;
}
