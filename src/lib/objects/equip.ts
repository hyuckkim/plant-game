import { get, writable } from "svelte/store";
import {
  addProps,
  newProp,
  type FPropSprite,
  type Prop,
  type PropRender,
  type PropSprite,
  type PropState,
} from "./prop";
import type { Coord } from "../values";
import { characterPos } from "../gamevalues";

export type Equip = {
  img: PropSprite | PropRender;
  pos: Coord;

  state: PropState;
  onClick: (state: PropState) => true | Partial<Equip> | undefined;
  onWheelUp: (state: PropState) => true | Partial<Equip> | undefined;
  onWheelDown: (state: PropState) => true | Partial<Equip> | undefined;
};
export const equips = writable<Equip | undefined>(undefined);

export function initializeEquips() {
  equips.set(undefined);
}

export function setEquip(data: Partial<Equip>) {
  const defaultEquip: Equip = {
    img: {img: new Image(), coord: [0, 0, 0, 0], flipped: { x: false, y: false }},
    pos: [0, 0, 0, 0],
    state: { pos: [0, 0, 0, 0] },
    onClick: () => true,
    onWheelUp: () => true,
    onWheelDown: () => true,
  };
  equips.set({ ...defaultEquip, ...data });
}

export function makeGrabbableProp(
  img: PropSprite | FPropSprite | PropRender,
  equipPos: Coord,
  state: PropState,
  {
    onWheelUp,
    onWheelDown,
    onDayEnd,
  }: Partial<{
    onWheelUp: (state: PropState) => true | Partial<Equip> | undefined;
    onWheelDown: (state: PropState) => true | Partial<Equip> | undefined;
    onDayEnd: (state: PropState) => boolean;
  }>,
  display: "day" | "night" | "always" = "day"
): Prop {
  const makeSomeProp = (pos: Coord, state: PropState) =>
    newProp({
      img,
      state: {...state, pos},
      onDayEnd: onDayEnd ?? (() => true),
      display,
    });
  const equipSomeProp = (state: PropState) =>
    setEquip({
      img,
      pos: equipPos,
      state,
      onWheelUp: onWheelUp ?? (() => true),
      onWheelDown: onWheelDown ?? (() => true),
      onClick: (state) => {
        const propNow = makeSomeProp(
          [get(characterPos).x, get(characterPos).y, equipPos[2], equipPos[3]],
          state
        );
        propNow.onClick = (state) => {
          equipSomeProp(state);
          return false;
        };
        addProps(propNow);
        return undefined;
      },
    });
  const propNow = makeSomeProp(state.pos, state);
  propNow.onClick = (state) => {
    equipSomeProp(state);
    return false;
  };

  return propNow;
}
export function makeGrabbableEquip(
  img: PropSprite | PropRender,
  equipPos: Coord,
  state: PropState,
  {
    onWheelUp,
    onWheelDown,
    onDayEnd,
  }: Partial<{
    onWheelUp: (state: PropState) => true | Partial<Equip> | undefined;
    onWheelDown: (state: PropState) => true | Partial<Equip> | undefined;
    onDayEnd: (state: PropState) => boolean;
  }>
): Partial<Equip> {
  const makeSomeProp = (pos: Coord, state: PropState) =>
    newProp({
      img,
      state: {...state, pos},
      onDayEnd: onDayEnd ?? (() => true),
    });
  const equipSomeProp = (state: PropState): Partial<Equip> => ({
    img,
    pos: equipPos,
    state,
    onWheelUp: onWheelUp ?? (() => true),
    onWheelDown: onWheelDown ?? (() => true),
    onClick: (state) => {
      const propNow = makeSomeProp(
        [get(characterPos).x, get(characterPos).y, equipPos[2], equipPos[3]],
        state
      );
      propNow.onClick = (state) => {
        setEquip(equipSomeProp(state));
        return false;
      };
      addProps(propNow);
      return undefined;
    },
  });
  return equipSomeProp(state);
}
