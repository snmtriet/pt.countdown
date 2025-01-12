import { useEffect, useState } from 'react'
import CountdownList from './components/ui/Countdown'
import './index.css'

const App = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-md text-2xl text-white">
      <video
        width="2000"
        height="1000"
        poster="https://img.zing.vn/products/playtogether/skin-2022/mainsite/assets/images/bg/bg-1.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="fixed bottom-0 left-0 right-0 top-0 hidden h-full w-full object-left md:left-0 md:block lg:object-center"
        style={{
          objectFit: 'cover',
        }}
      >
        <source
          src="https://img.zing.vn/products/playtogether/skin-2022/mainsite/assets/videos/video-bg.mp4"
          type="video/mp4"
        />
      </video>
      <img
        className="fixed inset-0 h-full w-full object-cover md:hidden"
        alt=""
        src="//img.zing.vn/products/playtogether/skin-2022/mainsite/assets/images/bg/mb-bg-1.jpg"
        style={{
          objectPosition: 'top center',
        }}
      ></img>
      <div className="fixed left-0 top-0 z-10 h-full min-h-screen w-full bg-black opacity-70"></div>
      <div className="absolute top-0 z-20 flex w-full flex-col items-center gap-md p-1">
        <div className="current-time py-2">
          <h2 className="text-6xl">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}
          </h2>
        </div>
        <CountdownList />
      </div>
    </div>
  )
}

export default App
