import "./CountDown.scss"

import BG_CTD from "./background/BackGround"
import Final_CTD from "./finalcountdown/FinalCountDown"

import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { useCountdown } from "../../hooks/useCountdown"
import { useCelebrateTrigger } from "../../hooks/useCelebrateTrigger"

const TARGET_TIME = new Date("2026-01-26T22:38:00+07:00").getTime()

const CountDown = () => {
  const countdown = useCountdown(TARGET_TIME)

  const navigate = useNavigate()
  const redirectedRef = useRef(false)

  useCelebrateTrigger({
    isFinished: countdown.isFinished,
  })

  const totalSeconds =
    countdown.days * 86400 +
    countdown.hours * 3600 +
    countdown.minutes * 60 +
    countdown.seconds

     useEffect(() => {
    if (countdown.isFinished && !redirectedRef.current) {
      redirectedRef.current = true
      navigate("/fireworks")
    }
  }, [countdown.isFinished, navigate])


  return (
    <div className="countdown">
      {totalSeconds > 20 && <BG_CTD countdown={countdown} />}

      {totalSeconds <= 20 && !countdown.isFinished && (
        <Final_CTD countdown={countdown} />
      )}

      {/* {countdown.isFinished && (
        <div className="celebrate-layer" />
      )} */}
    </div>
  )
}

export default CountDown;
