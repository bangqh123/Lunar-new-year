import { useCountdown } from "./hooks/useCountdown"
import { useCelebrateTrigger } from "./hooks/useCelebrateTrigger"
import { useFireworks } from "./hooks/useFireworks"
import { useTetMusic } from "./hooks/useTetMusic"
import { useTetAnimation } from "./hooks/useTetAnimation"
import { FallingItems } from "./components/FallingItems"
import { getGreetingFromEncodedURL } from "./utils/greeting"

const TARGET_TIME = new Date("2026-01-02T19:59:00+07:00").getTime()

export default function App() {
  const greeting = getGreetingFromEncodedURL()
  const countdown = useCountdown(TARGET_TIME)

  const { startFireworks, } = useFireworks()
  const { playMusic, toggleMusic, isPlaying } = useTetMusic("/musics/tet.mp3")
  const { isActive, startAnimation } = useTetAnimation()

  useCelebrateTrigger({
    isFinished: countdown.isFinished,
    onFireworks: startFireworks,
    onPlayMusic: playMusic,
    onStartAnimation: startAnimation
  })

  return (
    <div style={{ textAlign: "center", paddingTop: 40 }}>
      <FallingItems isActive={isActive} type="hoa" />
      <FallingItems isActive={isActive} type="lixi" count={10} />

      <h1>🎉 Chúc Mừng Năm Mới 🎉</h1>

      {!countdown.isFinished ? (
        <h2>
          {countdown.days} ngày {countdown.hours} giờ{" "}
          {countdown.minutes} phút {countdown.seconds} giây
        </h2>
      ) : (
        <>
          <p>💌 {greeting.message}</p>
          <p>— {greeting.from}</p>
        </>
      )}

      <button onClick={toggleMusic}>
        {isPlaying ? "🔊 Tắt nhạc" : "🔇 Bật nhạc"}
      </button>
    </div>
  )
}
