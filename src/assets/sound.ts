import { get, writable } from "svelte/store";
import { Howl } from "howler";
import backgroundMusic from "./hope.ogg";

export type SoundResources = Awaited<ReturnType<typeof loadGameSounds>>;
export const soundResources = writable<SoundResources>();
export function getSoundRes(name: keyof SoundResources): Howl {
  const resource = get(soundResources);
  if (!resource) throw new Error("sound Resources is not loaded");

  const found = resource[name];
  if (!found) throw new Error(`sound Resource ${name} is missing`);

  return found;
}

export async function loadGameSounds() {
  const sounds = [
    { sound: backgroundMusic, name: "bgm", loop: true }
  ] as const;
  type res = typeof sounds[number]['name'];

  const soundSources = await Promise.all(
    sounds.map(async (v) => new Promise<{ sound: Howl, name: string}>((resolve, reject) => {
      const sound: { sound: Howl, name: string } = {
        sound: new Howl({
          src: v.sound,
          loop: v.loop,
          onload: () => resolve(sound),
          onloaderror: () => reject(sound)
        }),
        name: v.name
      };
    }))
  );

  const soundData = soundSources.reduce<Partial<{[K in res]: Howl}>>((pre, curr) => {
    return {...pre, [curr.name]: curr.sound};
  }, {});
  soundResources.set(soundData);
  return soundData;
}