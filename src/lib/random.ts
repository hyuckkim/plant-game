import { get } from "svelte/store";
import { seed } from "./gamevalues";

// 1. 영어 소문자와 숫자로 이루어진 20자의 시드 생성
export function generateSeed() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let seed = '';
  for (let i = 0; i < 10; i++) {
      seed += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return seed;
}

// 2. 시드를 숫자로 변환
export function seedToNumber(seed: string) {
  let num = 0;
  for (let i = 0; i < seed.length; i++) {
      num = num * 36 + seed.charCodeAt(i);
  }
  return num;
}

// 3. LCG 파라미터 설정 및 난수 생성 함수 구현
const a = 1664525;
const c = 1013904223;
const m = Math.pow(2, 32);

export function random() {
  seed.set((a * get(seed) + c) % m);
  return get(seed) / m;
}