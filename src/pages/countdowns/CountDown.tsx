import "./CountDown.scss"

import BG_CTD from "./paritals/background/BackGround"
import Final_CTD from "./paritals/finalcountdown/FinalCountDown"

import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { useCountdown } from "../../hooks/useCountdown"
import { useCelebrateTrigger } from "../../hooks/useCelebrateTrigger"

const TARGET_TIME = new Date("2026-02-17T00:00:00+07:00").getTime()

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

  useEffect(() => {
    const unlockAudio = () => {
      const synth = window.speechSynthesis
      const utter = new SpeechSynthesisUtterance("")
      synth.speak(utter)
      document.removeEventListener("click", unlockAudio)
      document.removeEventListener("keydown", unlockAudio)
    }

    document.addEventListener("click", unlockAudio)
    document.addEventListener("keydown", unlockAudio)

    return () => {
      document.removeEventListener("click", unlockAudio)
      document.removeEventListener("keydown", unlockAudio)
    }
  }, [])


  return (
    <div className="countdown">
      {totalSeconds > 10 && <BG_CTD countdown={countdown} />}

      {totalSeconds <= 10 && !countdown.isFinished && (
        <Final_CTD countdown={countdown} />
      )}
    </div>
  )
}

export default CountDown;
