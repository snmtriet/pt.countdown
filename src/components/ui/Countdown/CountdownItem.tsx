import { Text } from '@/components/shared'
import {
  cn,
  playSounds,
  sound1,
  sound10,
  sound2,
  sound3,
  sound4,
  sound5,
  sound6,
  sound7,
  sound8,
  sound9,
  soundCardAppear,
  soundRemainOneMinute,
  soundRemainThirtySecond,
  soundRemainTwoMinute,
} from '@/utils'
import { memo, useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { GoMute, GoUnmute } from 'react-icons/go'
import { CountdownItem as ICountdownItem } from './CountdownList'
import SelectCountdown from './SelectCountdown'

type Props = {
  item: ICountdownItem
  handleDeleteItem: (id: string) => void
  handleChangeMinutes: (id: string, minutes: number) => void
  handleChangeSeconds: (id: string, seconds: number) => void
  handleChangeNextAlarmTime: (id: string, nextAlarmTime: Date | null) => void
  handleChangeCountdown: (id: string, countdown: number | null) => void
  handleToggleSound: (id: string) => void
}

const CountdownItem = (props: Props) => {
  const {
    item,
    handleDeleteItem,
    handleChangeMinutes,
    handleChangeSeconds,
    handleChangeNextAlarmTime,
    handleChangeCountdown,
    handleToggleSound,
  } = props
  const [isSpeaking, setIsSpeaking] = useState(false)
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
        playSounds(minutes, soundRemainTwoMinute)
        handleSpeak()
        break
      case 60:
        playSounds(minutes, soundRemainOneMinute)
        handleSpeak()
        break
      case 30:
        playSounds(minutes, soundRemainThirtySecond)
        handleSpeak()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, isMuted])

  const handleSpeak = async () => {
    setIsSpeaking(true)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsSpeaking(false)
  }

  return (
    <div
      className={cn(
        'relative w-full rounded border-2 border-transparent bg-dark-4 p-2 shadow-xl',
        {
          'border-yellow-2': (countdown && countdown <= 10) || isSpeaking,
        },
      )}
    >
      <div className="absolute -left-2 -top-5 flex items-center">
        <img src="/img/daquy.png" className="w-40" />
        <img src="/img/mamnon.png" className="-ml-2 w-40" />
      </div>
      <div className="relative mb-1 flex w-full items-center justify-between">
        <Text className="text-green-4 text-lg" bold>
          {label}
        </Text>
        <button
          className="absolute right-0 top-0 rounded-full bg-red-2 p-1"
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
      <div className="mt-2 flex items-center justify-between">
        {nextAlarmTime && (
          <div className="w-full text-center">
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
        <button
          className="rounded-full border bg-dark-4 p-1"
          onClick={() => handleToggleSound(id)}
        >
          {item.isMuted ? (
            <GoMute color="white" size={26} />
          ) : (
            <GoUnmute color="white" size={26} />
          )}
        </button>
      </div>
    </div>
  )
}

const MemorizedCountdownItem = memo(CountdownItem)

export default MemorizedCountdownItem
