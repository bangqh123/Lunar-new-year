import "./CountDown.scss"

import BG_CTD from "./paritals/background/BackGround"
import Final_CTD from "./paritals/finalcountdown/FinalCountDown"

import { useEffect, useRef, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useCountdown } from "../../hooks/useCountdown"
import { useCelebrateTrigger } from "../../hooks/useCelebrateTrigger"

const REAL_TARGET_TIME = new Date("2026-02-17T00:00:00+07:00").getTime()

const CountDown = () => {
  const navigate = useNavigate()
  const redirectedRef = useRef(false)

  const [targetTime, setTargetTime] = useState(REAL_TARGET_TIME)

  const [showPopup, setShowPopup] = useState(false)

  const [demoInput, setDemoInput] = useState("")

  const countdown = useCountdown(targetTime)

  useCelebrateTrigger({
    isFinished: countdown.isFinished,
  })

  // const totalSeconds =
  //   countdown.days * 86400 +
  //   countdown.hours * 3600 +
  //   countdown.minutes * 60 +
  //   countdown.seconds

  // useEffect(() => {
  //   if (countdown.isFinished && !redirectedRef.current) {
  //     redirectedRef.current = true
  //     navigate("/fireworks")
  //   }
  // }, [countdown.isFinished, navigate])

  const totalSeconds = useMemo(() => {
    return (
      countdown.days * 86400 +
      countdown.hours * 3600 +
      countdown.minutes * 60 +
      countdown.seconds
    )
  }, [countdown.days, countdown.hours, countdown.minutes, countdown.seconds])

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

  const handleApplyDemoTime = () => {
    if (!demoInput) return

    const time = new Date(demoInput).getTime()

    if (isNaN(time)) {
      alert("Ngày giờ không hợp lệ!")
      return
    }

    redirectedRef.current = false
    setTargetTime(time)
    setShowPopup(false)
  }

  const handleResetRealTime = () => {
    redirectedRef.current = false
    setTargetTime(REAL_TARGET_TIME)
    setShowPopup(false)
  }

  return (
    <div className="countdown">
      <button className="demo-btn" onClick={() => setShowPopup(true)}>
        Demo Time ⚙️
      </button>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h2>Chọn ngày giờ Demo</h2>

            <input
              type="datetime-local"
              value={demoInput}
              onChange={(e) => setDemoInput(e.target.value)}
            />

            <div className="popup-actions">
              <button className="btn-apply" onClick={handleApplyDemoTime}>
                Áp dụng
              </button>

              <button className="btn-reset" onClick={handleResetRealTime}>
                Reset Real Time
              </button>

              <button className="btn-cancel" onClick={() => setShowPopup(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {totalSeconds > 10 && <BG_CTD countdown={countdown} />}

      {totalSeconds <= 10 && !countdown.isFinished && (
        <Final_CTD countdown={countdown} />
      )}
    </div>
  )
}

export default CountDown;
