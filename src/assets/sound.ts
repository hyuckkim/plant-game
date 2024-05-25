import { get, writable } from "svelte/store";
import { Howl } from "howler";
import backgroundMusic from "./hope-packed.mp3";
import { sfx } from "../lib/gamevalues";

import StepWaterSFX from "./sfx/Footsteps_WaterV1_Walk_03.wav";
import StepFieldSFX from "./sfx/Footsteps_MetalV1_Walk_01.wav";
import DoorSFX from "./sfx/Household_Closet_Key_Insertion_Stereo.wav";
import DoorCloseSFX from "./sfx/Vehicle_Car_Glove_Box_Interior_Mono_02.wav";
import LeavesSFX from "./sfx/Footsteps_Leaves_Run_05.wav";
import WaterUpSFX from "./sfx/Footsteps_WaterV1_Walk_01.wav";
import WaterDownSFX from "./sfx/Footsteps_WaterV1_Walk_02.wav";
import MachineSFX from "./sfx/Vehicle_Truck_Sliding_Door_Opening_Mono_01.wav";
import { loadProgress } from "../lib/values";

export { backgroundMusic, WaterUpSFX };

export type SoundResources = Awaited<ReturnType<typeof loadGameSounds>>;
export const soundResources = writable<SoundResources>();
export function getSoundRes(name: keyof SoundResources): Howl {
  const resource = get(soundResources);
  if (!resource) throw new Error("sound Resources is not loaded");

  const found = resource[name];
  if (!found) throw new Error(`sound Resource ${name} is missing`);

  return found;
}

export function playSoundSFX(name: keyof SoundResources) {
  if (!get(sfx)) return;
  const sound = getSoundRes(name);
  sound.play();
}

export async function loadGameSounds() {
  const sounds = [
    { sound: backgroundMusic, name: "bgm", loop: true },
    { sound: StepFieldSFX, name: "step/grass", loop: false },
    { sound: StepWaterSFX, name: "step/water", loop: false },
    { sound: DoorSFX, name: "prop/house", loop: false },
    { sound: DoorCloseSFX, name: "prop/house_close", loop: false },
    { sound: LeavesSFX, name: "prop/plant", loop: false },
    { sound: WaterUpSFX, name: "prop/water_up", loop: false },
    { sound: WaterDownSFX, name: "prop/water_down", loop: false },
    { sound: MachineSFX, name: "prop/machine", loop: false },
  ] as const;
  type res = (typeof sounds)[number]["name"];

  const soundSources = await Promise.all(
    sounds.map(
      async (v) =>
        new Promise<{ sound: Howl; name: string }>((resolve, reject) => {
          const sound: { sound: Howl; name: string } = {
            sound: new Howl({
              src: v.sound,
              loop: v.loop,
              volume: 0.5,
              onload: () => {
                loadProgress.set(get(loadProgress) + 1);
                resolve(sound);
              },
              onloaderror: () => reject(sound),
            }),
            name: v.name,
          };
        })
    )
  );

  const soundData = soundSources.reduce<Partial<{ [K in res]: Howl }>>(
    (pre, curr) => {
      return { ...pre, [curr.name]: curr.sound };
    },
    {}
  );
  soundResources.set(soundData);
  return soundData;
}
