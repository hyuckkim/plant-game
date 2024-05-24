
const text: {
  [lang: string]: {
    [tag: string]: string
  }
} = {
  en: {
    b1_1_1: "You can interact with objects by left-click.",
    b1_2_1: "Some objects can be picked up.",
    b1_2_2: "You can use the mouse wheel to interact wit",
    b1_3_1: "You can right-click and hold to check the dist",
    b1_3_2: "You move immediately when you release the",
    b2_1_1: "If you have 3 herbs and water, you can creat",
    b2_1_2: "The potions you create can be stored in bott",
    b2_2_1: "Three same hurbs; that increases your maxi",
    b2_2_2: "Two same hurbs with green hurb; that restor",
    b2_3_1: "You can use potions, or you can sprinkle the",
    b2_3_2: "Then, each type of potion will cause specific",
    bh_1_1: "If you reach 0 HP, you lose the game.",
    bh_1_2: "However, HP is consumed every time you m",
    bh_2_1: "←← You can switch day and night in bed.",
    bh_2_2: "At night, your HP is restored.",

    ending: "Game Over!",
    ending_time: "Play Time: $1",
    ending_day: "Play Date: $1 days",
    ending_move: "Distance Moved: $1px",
    ending_water: "Times Water Drawn: $1",
    ending_grass: "Inserted Herbs: $1",
    ending_potion_drink: "Potions Drunk: $1 drops",
    ending_potion_seed: "Potions Sprinkled: $1 drops",
    ending_healing_sleep: "Health Recovered from Sleep: $1",
    ending_healing_potion: "Health Recovered from Potions: $1",
    ending_book: "Book Pages Turned: $1 pages",
    ending_thanks: "Thank you for playing!",

    control_setting: "Control Settings",
    control_warning: "(Default settings are recommended!)",
    move: "Move",
    interact: "Interact",
    equip_interact_1: "Equip Interact 1",
    equip_interact_2: "Equip Interact 2",
    measuring: "Measure Distance",
    control_setting_check: "Press the key to use for $1",
    seed_setting: "seed",

    "mouse_-1": "Mouse Move",
    "mouse_0": "Left Click",
    "mouse_1": "Wheel Click",
    "mouse_2": "Right Click",
    "wheel_0": "Wheel Up",
    "wheel_1": "Wheel Down"
  },
  ko: {
    b1_1_1: "왼쪽 클릭으로 사물과 상호작용 할 수 있습니다.",
    b1_2_1: "몇몇 사물은 들어올릴 수 있습니다.",
    b1_2_2: "들어올린 사물은 마우스 휠로 사용할 수 있습니다.",
    b1_3_1: "오른쪽 클릭을 유지해 거리를 재 볼 수 있습니다.",
    b1_3_2: "오른쪽 마우스를 놓으면 즉시 이동합니다.",
    b2_1_1: "약초 3개와 물이 있다면 포션을 만들 수 있습니다.",
    b2_1_2: "만들어낸 포션은 병에 담을 수 있습니다.",
    b2_2_1: "같은 약초 3개로 만든 포션은 최대 체력을 증가시",
    b2_2_2: "같은 약초 2개와 초록 약초로 만든 포션은 체력을",
    b2_3_1: "포션은 사용할 수도 있지만 땅에 뿌릴 수도 있습니",
    b2_3_2: "땅에 뿌리면 포션별로 지정된 약초가 자라납니다.",
    bh_1_1: "체력이 0이 되면 게임에서 패배합니다.",
    bh_1_2: "하지만 체력은 움직일 때마다 소모됩니다.",
    bh_2_1: "←← 침대에서 낮과 밤을 전환할 수 있습니다.",
    bh_2_2: "밤에는 체력이 회복됩니다.",

    ending: "게임 완료!",
    ending_time: "플레이 시간: $1",
    ending_day: "플레이 일자: $1일",
    ending_move: "이동 거리: $1px",
    ending_water: "물을 뜬 횟수: $1회",
    ending_grass: "넣은 약초: $1개",
    ending_potion_drink: "마신 포션: $1방울",
    ending_potion_seed: "뿌린 포션: $1방울",
    ending_healing_sleep: "잠에 들어 회복한 체력: $1",
    ending_healing_potion: "포션으로 회복한 체력: $1",
    ending_book: "넘긴 책 페이지: $1페이지",
    ending_thanks: "플레이해주셔서 감사합니다!",

    control_setting: "컨트롤 설정",
    control_warning: "(기본 설정을 권장합니다!)",
    move: "이동",
    interact: "상호작용",
    equip_interact_1: "장비 상호작용 1",
    equip_interact_2: "장비 상호작용 2",
    measuring: "거리 재기",
    control_setting_check: "$1으로 사용할 키를 누르세요",
    seed_setting: "시드",

    "mouse_-1": "마우스 이동",
    "mouse_0": "왼쪽 클릭",
    "mouse_1": "휠 클릭",
    "mouse_2": "오른쪽 클릭",
    "wheel_0": "횔 올리기",
    "wheel_1": "휠 내리기"
  }
} as const;

function langSupported(lang: string): boolean {
  return Object.keys(text).includes(lang);
}

export function getText(tag: string, ...meta: any[]) {
  let lang = navigator.language;
  if (!langSupported(lang)) lang = "en";
  let data = text[lang]?.[tag];
  if (!data) data = text["en"][tag];
  
  if (!data) throw Error(`no text with tag ${tag}`);
  return data.replaceAll(/\$(\d+)/g, (match, p1) =>  meta[p1 - 1] ?? match);
}