import "./BackGround.scss"

import React from "react"

import { useCountdown } from "../../../hooks/useCountdown"
import { useCelebrateTrigger } from "../../../hooks/useCelebrateTrigger"
import { useFireworks } from "../../../hooks/useFireworks"
import { useTetAnimation } from "../../../hooks/useTetAnimation"


import khung from "./../../../assets/images/khung.png"
import phao from "./../../../assets/images/phao.png"
import hoa from "./../../../assets/images/mai.png"
import ngua from "./../../../assets/images/ngua.png"

import Boxtime from "./../../../components/Boxtime/Boxtime"

interface TBackGroundProps {
    TARGET_TIME: number;

}

const BackGround: React.FC<TBackGroundProps> = ({ TARGET_TIME }) => {
    const countdown = useCountdown(TARGET_TIME)

    const { startFireworks } = useFireworks()
    const { startAnimation } = useTetAnimation()

    useCelebrateTrigger({
        isFinished: countdown.isFinished,
        onFireworks: startFireworks,
        onStartAnimation: startAnimation,
    })

    return (
        <div className="background">
            <div className="firework-particles"></div>
            <div className="background_ptc">
                <div className="hoa">
                    <img src={hoa} />
                </div>
                <div className="countdown_box">
                    <div className="box">
                        <Boxtime time={countdown.days} label="Days" />
                        <Boxtime time={countdown.hours} label="Hours" />
                    </div>
                    <div className="box">
                        <Boxtime time={countdown.minutes} label="Minutes" />
                        <Boxtime time={countdown.seconds} label="Seconds" />
                    </div>
                </div>
                <div className="ngua_phao">
                    <img src={phao} className="phao" />
                    <img src={ngua} className="ngua" />
                </div>
            </div>
            <img src={khung} className="background_img top-left" />
            <img src={khung} className="background_img top-right" />
            <img src={khung} className="background_img bottom-left" />
            <img src={khung} className="background_img bottom-right" />
        </div>
    )
}

export default BackGround;