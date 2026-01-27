import "./FinalCountDown.scss"

import { useEffect } from "react"

import SpaceBackground from "../../../layouts/Space/SpaceBackGround";
interface TFinalCountDownProps {
    countdown: {
        seconds: number;
    };
}

const FinalCountDown: React.FC<TFinalCountDownProps> = ({ countdown }) => {
    const speakNumber = (num: number) => {
  const synth = window.speechSynthesis
  const utter = new SpeechSynthesisUtterance(num.toString())

  utter.lang = "en-US"       //"en-US" hoặc "vi-VN"
  utter.rate = 1          // tốc độ
  utter.pitch = 0.8          // trầm
  utter.volume = 1

  synth.cancel() // tránh chồng tiếng
  synth.speak(utter)
}

useEffect(() => {
  if (countdown.seconds <= 10 && countdown.seconds > 0) {
    speakNumber(countdown.seconds)
  }

  if (countdown.seconds === 0) {
    speakNumber(0)
  }
}, [countdown.seconds])


    return (
        <div className="final10s">
            <SpaceBackground />
            <div className="pulse-bg"></div>
            <div className="count">
                <span className="count-number">
                    {countdown.seconds}
                </span>
            </div>
        </div>
    )
}

export default FinalCountDown;