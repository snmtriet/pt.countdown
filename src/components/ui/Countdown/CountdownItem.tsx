import { Text } from '@/components/shared'
import { AiOutlineDelete } from 'react-icons/ai'
import SelectCountdown from './SelectCountdown'
import { CountdownItem as ICountdownItem } from './CountdownList'
import { memo, useEffect } from 'react'
import { Howl } from 'howler'
import { cn } from '@/utils'
import { GoMute, GoUnmute } from 'react-icons/go'

type Props = {
  item: ICountdownItem
  index: number
  handleDeleteItem: (id: string) => void
  handleChangeMinutes: (id: string, minutes: number) => void
  handleChangeSeconds: (id: string, seconds: number) => void
  handleChangeNextAlarmTime: (id: string, nextAlarmTime: Date | null) => void
  handleChangeCountdown: (id: string, countdown: number | null) => void
  handleToggleSound: (id: string) => void
}

const sound10 = new Howl({
  src: ['/sounds/10.mp3'],
})

const sound9 = new Howl({
  src: ['/sounds/9.mp3'],
})

const sound8 = new Howl({
  src: ['/sounds/8.mp3'],
})

const sound7 = new Howl({
  src: ['/sounds/7.mp3'],
})

const sound6 = new Howl({
  src: ['/sounds/6.mp3'],
})

const sound5 = new Howl({
  src: ['/sounds/5.mp3'],
})

const sound4 = new Howl({
  src: ['/sounds/4.mp3'],
})

const sound3 = new Howl({
  src: ['/sounds/3.mp3'],
})

const sound2 = new Howl({
  src: ['/sounds/2.mp3'],
})

const sound1 = new Howl({
  src: ['/sounds/1.mp3'],
})

const soundRemainOneMinute = new Howl({
  src: ['/sounds/remain-one-minute.mp3'],
})
const soundRemainTwoMinute = new Howl({
  src: ['/sounds/remain-two-minute.mp3'],
})

const soundCardAppear = new Howl({
  src: ['/sounds/card-appear.mp3'],
})

const CountdownItem = (props: Props) => {
  const {
    item,
    index,
    handleDeleteItem,
    handleChangeMinutes,
    handleChangeSeconds,
    handleChangeNextAlarmTime,
    handleChangeCountdown,
    handleToggleSound,
  } = props

  const { minutes, seconds, nextAlarmTime, id, countdown, label, isMuted } =
    item

  useEffect(() => {
    if (minutes >= 0 && seconds >= 0) {
      const now = new Date()
      const currentMinute = now.getMinutes()
      const baseMinute = minutes % 10
      let nextMinute = baseMinute

      if (currentMinute > baseMinute) {
        nextMinute =
          baseMinute + Math.ceil((currentMinute - baseMinute) / 10) * 10
      }

      if (nextMinute >= 60) {
        nextMinute -= 60
        now.setHours(now.getHours() + 1)
      }

      const alarmTime = new Date(now)
      alarmTime.setMinutes(nextMinute)
      alarmTime.setSeconds(seconds)

      handleChangeNextAlarmTime(id, alarmTime)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds, id])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      if (nextAlarmTime) {
        const timeDiff = Math.floor(
          (new Date(nextAlarmTime).getTime() - now.getTime()) / 1000,
        )
        if (timeDiff > 0) {
          handleChangeCountdown(id, timeDiff)
        } else if (timeDiff <= 0) {
          handleChangeCountdown(id, null)
          const newAlarmTime = new Date(nextAlarmTime)
          newAlarmTime.setMinutes(newAlarmTime.getMinutes() + 10)
          handleChangeNextAlarmTime(id, newAlarmTime)
        } else {
          handleChangeCountdown(id, null)
        }
      }
    }, 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextAlarmTime, id])

  useEffect(() => {
    if (!countdown || isMuted) return

    switch (countdown) {
      case 120:
        soundRemainTwoMinute.play()
        break
      case 60:
        soundRemainOneMinute.play()
        break
      case 10:
        sound10.play()
        break
      case 9:
        sound9.play()
        break
      case 8:
        sound8.play()
        break
      case 7:
        sound7.play()
        break
      case 6:
        sound6.play()
        break
      case 5:
        sound5.play()
        break
      case 4:
        sound4.play()
        break
      case 3:
        sound3.play()
        break
      case 2:
        sound2.play()
        break
      case 1:
        sound1.play()
        setTimeout(() => {
          soundCardAppear.play()
        }, 500)
        break
    }
  }, [countdown, isMuted])

  return (
    <div
      className={cn(
        'relative w-full rounded border-2 border-transparent bg-dark-4 p-2 shadow-xl',
        countdown && countdown < 10 && 'border-yellow-2',
      )}
    >
      <button
        className="absolute bottom-2 right-2 rounded-full border bg-dark-4 p-1"
        onClick={() => handleToggleSound(id)}
      >
        {item.isMuted ? <GoMute color="white" /> : <GoUnmute color="white" />}
      </button>
      <img src="/img/daquy.png" className="absolute -left-2 -top-5 w-40" />
      <img src="/img/mamnon.png" className="absolute -top-5 left-5 w-40" />
      <div className="relative mb-1 flex w-full items-center justify-between">
        <Text className="text-lg text-green-2" bold>
          {label || `Bộ đếm ${index + 1}`}
        </Text>
        <button
          className="absolute right-0 top-0 rounded-full bg-red-500 p-1"
          onClick={() => handleDeleteItem(id)}
        >
          <AiOutlineDelete color="white" />
        </button>
      </div>
      <div className="flex w-full items-center gap-md overflow-hidden">
        <SelectCountdown
          value={minutes}
          onChange={(value) => handleChangeMinutes(id, value)}
          quantity={10}
          label="Phút:"
        />
        <SelectCountdown
          value={seconds}
          onChange={(value) => handleChangeSeconds(id, value)}
          quantity={60}
          label="Giây:"
        />
      </div>
      <div className="flex items-center justify-between">
        {nextAlarmTime && (
          <div className="mt-2 w-full text-center">
            <h2 className="w-fit text-3xl">
              {new Date(nextAlarmTime).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })}{' '}
              <strong
                className={cn('w-fit text-yellow-2', !countdown && 'opacity-0')}
              >
                {countdown}s
              </strong>
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}

const MemorizedCountdownItem = memo(CountdownItem)

export default MemorizedCountdownItem
