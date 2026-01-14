import "./CountDown.scss"

import { useCountdown } from "../../hooks/useCountdown"
import { useCelebrateTrigger } from "../../hooks/useCelebrateTrigger"
import { useFireworks } from "../../hooks/useFireworks"
import { useTetAnimation } from "../../hooks/useTetAnimation"
import { FallingItems } from "../../components/FallingItems"

import Boxtime from "../../components/Boxtime/Boxtime"

const TARGET_TIME = new Date("2026-01-13T13:46:12+07:00").getTime()

const CountDown = () => {
  const countdown = useCountdown(TARGET_TIME)

  const { startFireworks } = useFireworks()
  const { isActive, startAnimation } = useTetAnimation()

  useCelebrateTrigger({
    isFinished: countdown.isFinished,
    onFireworks: startFireworks,
    onStartAnimation: startAnimation,
  })

  return (
    <div className="countdown">
      {isActive && <FallingItems isActive={true} />}
      <div className="countdown-overlay">
        <Boxtime time={countdown.days} label="Days" />
        <Boxtime time={countdown.hours} label="Hours" />
        <Boxtime time={countdown.minutes} label="Minutes" />
        <Boxtime time={countdown.seconds} label="Seconds" />
      </div>
    </div >
  )
}

export default CountDown
