/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Howl } from 'howler'

const soundMap10 = new Howl({
  src: ['/sounds/map-10.mp3'],
  preload: true,
})
const soundMap9 = new Howl({
  src: ['/sounds/map-9.mp3'],
  preload: true,
})
const soundMap8 = new Howl({
  src: ['/sounds/map-8.mp3'],
  preload: true,
})
const soundMap7 = new Howl({
  src: ['/sounds/map-7.mp3'],
  preload: true,
})
const soundMap6 = new Howl({
  src: ['/sounds/map-6.mp3'],
  preload: true,
})
const soundMap5 = new Howl({
  src: ['/sounds/map-5.mp3'],
  preload: true,
})
const soundMap4 = new Howl({
  src: ['/sounds/map-4.mp3'],
  preload: true,
})
const soundMap3 = new Howl({
  src: ['/sounds/map-3.mp3'],
  preload: true,
})
const soundMap2 = new Howl({
  src: ['/sounds/map-2.mp3'],
  preload: true,
})
const soundMap1 = new Howl({
  src: ['/sounds/map-1.mp3'],
  preload: true,
})

const sound10 = new Howl({
  src: ['/sounds/10.mp3'],
  preload: true,
})
const sound9 = new Howl({
  src: ['/sounds/9.mp3'],
  preload: true,
})
const sound8 = new Howl({
  src: ['/sounds/8.mp3'],
  preload: true,
})
const sound7 = new Howl({
  src: ['/sounds/7.mp3'],
  preload: true,
})
const sound6 = new Howl({
  src: ['/sounds/6.mp3'],
  preload: true,
})
const sound5 = new Howl({
  src: ['/sounds/5.mp3'],
  preload: true,
})
const sound4 = new Howl({
  src: ['/sounds/4.mp3'],
  preload: true,
})
const sound3 = new Howl({
  src: ['/sounds/3.mp3'],
  preload: true,
})
const sound2 = new Howl({
  src: ['/sounds/2.mp3'],
  preload: true,
})
const sound1 = new Howl({
  src: ['/sounds/1.mp3'],
  preload: true,
})
const soundRemainOneMinute = new Howl({
  src: ['/sounds/remain-one-minute.mp3'],
  preload: true,
})
const soundRemainTwoMinute = new Howl({
  src: ['/sounds/remain-two-minute.mp3'],
  preload: true,
})
const soundRemainThirtySecond = new Howl({
  src: ['/sounds/remain-thirty-seconds.mp3'],
  preload: true,
})
const soundCardAppear = new Howl({
  src: ['/sounds/card-appear.mp3'],
  preload: true,
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const playSounds = async (minute: number, sound: Howl) => {
  switch (minute) {
    case 10:
      soundMap10.play()
      break
    case 9:
      soundMap9.play()
      break
    case 8:
      soundMap8.play()
      break
    case 7:
      soundMap7.play()
      break
    case 6:
      soundMap6.play()
      break
    case 5:
      soundMap5.play()
      break
    case 4:
      soundMap4.play()
      break
    case 3:
      soundMap3.play()
      break
    case 2:
      soundMap2.play()
      break
    case 1:
      soundMap1.play()
      break
  }
  await new Promise((resolve) => setTimeout(resolve, 1200))
  sound.play()
}

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
}
