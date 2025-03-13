/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Howl } from "howler";

const soundMap10 = new Howl({
  src: ["/sounds/map-10.mp3"],
  preload: true,
});
const soundMap9 = new Howl({
  src: ["/sounds/map-9.mp3"],
  preload: true,
});
const soundMap8 = new Howl({
  src: ["/sounds/map-8.mp3"],
  preload: true,
});
const soundMap7 = new Howl({
  src: ["/sounds/map-7.mp3"],
  preload: true,
});
const soundMap6 = new Howl({
  src: ["/sounds/map-6.mp3"],
  preload: true,
});
const soundMap5 = new Howl({
  src: ["/sounds/map-5.mp3"],
  preload: true,
});
const soundMap4 = new Howl({
  src: ["/sounds/map-4.mp3"],
  preload: true,
});
const soundMap3 = new Howl({
  src: ["/sounds/map-3.mp3"],
  preload: true,
});
const soundMap2 = new Howl({
  src: ["/sounds/map-2.mp3"],
  preload: true,
});
const soundMap1 = new Howl({
  src: ["/sounds/map-1.mp3"],
  preload: true,
});

const sound10 = new Howl({
  src: ["/sounds/10.mp3"],
  preload: true,
});
const sound9 = new Howl({
  src: ["/sounds/9.mp3"],
  preload: true,
});
const sound8 = new Howl({
  src: ["/sounds/8.mp3"],
  preload: true,
});
const sound7 = new Howl({
  src: ["/sounds/7.mp3"],
  preload: true,
});
const sound6 = new Howl({
  src: ["/sounds/6.mp3"],
  preload: true,
});
const sound5 = new Howl({
  src: ["/sounds/5.mp3"],
  preload: true,
});
const sound4 = new Howl({
  src: ["/sounds/4.mp3"],
  preload: true,
});
const sound3 = new Howl({
  src: ["/sounds/3.mp3"],
  preload: true,
});
const sound2 = new Howl({
  src: ["/sounds/2.mp3"],
  preload: true,
});
const sound1 = new Howl({
  src: ["/sounds/1.mp3"],
  preload: true,
});
const soundRemainOneMinute = new Howl({
  src: ["/sounds/remain-one-minute.mp3"],
  preload: true,
});
const soundRemainTwoMinute = new Howl({
  src: ["/sounds/remain-two-minute.mp3"],
  preload: true,
});
const soundRemainThirtySecond = new Howl({
  src: ["/sounds/remain-thirty-seconds.mp3"],
  preload: true,
});
const soundCardAppear = new Howl({
  src: ["/sounds/card-appear.mp3"],
  preload: true,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const playSounds = (minute: number, sound: Howl) => {
  let firstSound: Howl | null = null;

  switch (minute) {
    case 10:
      firstSound = soundMap10;
      break;
    case 9:
      firstSound = soundMap9;
      break;
    case 8:
      firstSound = soundMap8;
      break;
    case 7:
      firstSound = soundMap7;
      break;
    case 6:
      firstSound = soundMap6;
      break;
    case 5:
      firstSound = soundMap5;
      break;
    case 4:
      firstSound = soundMap4;
      break;
    case 3:
      firstSound = soundMap3;
      break;
    case 2:
      firstSound = soundMap2;
      break;
    case 1:
      firstSound = soundMap1;
      break;
  }

  if (!firstSound) return;

  firstSound.once("end", () => {
    sound.play();
  });

  firstSound.play();
};

export {
  soundMap10,
  soundMap9,
  soundMap8,
  soundMap7,
  soundMap6,
  soundMap5,
  soundMap4,
  soundMap3,
  soundMap2,
  soundMap1,
  sound10,
  sound9,
  sound8,
  sound7,
  sound6,
  sound5,
  sound4,
  sound3,
  sound2,
  sound1,
  soundRemainOneMinute,
  soundRemainTwoMinute,
  soundRemainThirtySecond,
  soundCardAppear,
};
