import { memo, useCallback } from 'react'

import { Text } from '@/components/shared'
import { FaPlus } from 'react-icons/fa'
import { useLocalStorage } from 'usehooks-ts'
import { v4 as uuidV4 } from 'uuid'
import CountdownItem from './CountdownItem'

export interface CountdownItem {
  id: string
  minutes: number
  seconds: number
  label?: string
  nextAlarmTime: Date | null
  countdown: number | null
}

const CountdownList = () => {
  const [list, setList] = useLocalStorage<CountdownItem[]>('countdownList', [])

  const handleChangeMinutes = useCallback((id: string, minutes: number) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, minutes } : item)),
    )
  }, [])

  const handleChangeSeconds = useCallback((id: string, seconds: number) => {
    setList((prevList) =>
      prevList.map((item) => (item.id === id ? { ...item, seconds } : item)),
    )
  }, [])

  const handleAddItem = useCallback(() => {
    let minutes = new Date().getMinutes()
    const seconds = new Date().getSeconds()
    if (minutes > 9) {
      minutes = Number(minutes.toString().split('')[1])
    }
    const label = prompt('Nhập tên của bộ đếm')
    if (!label) {
      alert('Vui lòng nhập tên bộ đếm')
      return
    }

    setList((prevList) => [
      ...prevList,
      {
        id: uuidV4(),
        minutes,
        seconds,
        nextAlarmTime: null,
        countdown: null,
        label: label,
      },
    ])
  }, [])

  const handleDeleteItem = useCallback((id: string) => {
    setList((prevList) => prevList.filter((item) => item.id !== id))
  }, [])

  const handleChangeNextAlarmTime = useCallback(
    (id: string, nextAlarmTime: Date | null) => {
      setList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, nextAlarmTime } : item,
        ),
      )
    },
    [],
  )

  const handleChangeCountdown = useCallback(
    (id: string, countdown: number | null) => {
      setList((prevList) =>
        prevList.map((item) =>
          item.id === id ? { ...item, countdown } : item,
        ),
      )
    },
    [],
  )

  return (
    <>
      <button
        className="mt-2 rounded bg-green-3 p-1 transition-colors ease-out hover:bg-green-2"
        onClick={handleAddItem}
      >
        <FaPlus />
      </button>
      {list && list.length > 0 ? (
        <div className="mt-2 flex w-full flex-col gap-md md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 xxxl:grid-cols-6">
          {list.map((item, index) => (
            <CountdownItem
              key={item.id}
              item={item}
              index={index}
              handleChangeMinutes={handleChangeMinutes}
              handleChangeSeconds={handleChangeSeconds}
              handleDeleteItem={handleDeleteItem}
              handleChangeNextAlarmTime={handleChangeNextAlarmTime}
              handleChangeCountdown={handleChangeCountdown}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full max-w-xl flex-col items-center justify-center rounded bg-dark-3 px-2 py-4 text-xl">
          <Text className="text-white/80">
            Không có bộ đếm nào. Vui lòng tạo !
          </Text>
        </div>
      )}
    </>
  )
}

const MemorizedCountdownList = memo(CountdownList)

export default MemorizedCountdownList