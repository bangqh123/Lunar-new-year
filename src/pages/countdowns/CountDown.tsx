import "./CountDown.scss"

import BG_CTD from "./background/BackGround"

const TARGET_TIME = new Date("2026-02-20T13:46:12+07:00").getTime()

const CountDown = () => {
  return (
    <div className="countdown">
      <BG_CTD TARGET_TIME={TARGET_TIME} /> 
    </div >
  )
}

export default CountDown
