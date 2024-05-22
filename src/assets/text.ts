
const text: {
  [lang: string]: {
    [tag: string]: string
  }
} = {
  en: {
    b1_1_1: "You can interact with objects by left-clicking",
    b1_2_1: "Some objects can be picked up.",
    b1_2_2: "You can use the mouse wheel to interact wit",
    b2_1_1: "If you have 3 herbs and water, you can creat",
    b2_1_2: "The potions you create can be stored in bott",
    b2_2_1: "Three same hurbs; that increases your maxi",
    b2_2_2: "Two same hurbs with green hurb; that restor",
    b2_3_1: "You can use potions, or you can sprinkle the",
    b2_3_2: "Then, each type of potion will cause specific",
    bh_1_1: "If you reach 0 health, you lose the game.",
    bh_2_1: "←← You can switch day and night in bed.",
    bh_2_2: "At night, your health is restored."

  },
  ko: {
    b1_1_1: "왼쪽 클릭으로 사물과 상호작용 할 수 있습니다.",
    b1_2_1: "몇몇 사물은 들어올릴 수 있습니다.",
    b1_2_2: "들어올린 사물은 마우스 휠로 사용할 수 있습니다.",
    b2_1_1: "약초 3개와 물이 있다면 포션을 만들 수 있습니다.",
    b2_1_2: "만들어낸 포션은 병에 담을 수 있습니다.",
    b2_2_1: "같은 약초 3개로 만든 포션은 최대 체력을 증가시",
    b2_2_2: "같은 약초 2개와 초록 약초로 만든 포션은 체력을",
    b2_3_1: "포션은 사용할 수도 있지만 땅에 뿌릴 수도 있습니",
    b2_3_2: "땅에 뿌리면 포션별로 지정된 약초가 자라납니다.",
    bh_1_1: "체력이 0이 되면 게임에서 패배합니다.",
    bh_2_1: "←← 침대에서 낮과 밤을 전환할 수 있습니다.",
    bh_2_2: "밤에는 체력이 회복됩니다."
  }
};

function langSupported(lang: string): boolean {
  return Object.keys(text).includes(lang);
}

export function getText(tag: string) {
  let lang = navigator.language;
  if (!langSupported(lang)) lang = "en";
  let data = text[lang]?.[tag];
  if (!data) data = text["en"][tag];
  
  if (!data) throw Error(`no text with tag ${tag}`);
  return data;
}