import "./BackGround.scss"

import React from "react"

import khung from "../../../../assets/images/khung.png"
import phao from "../../../../assets/images/phao.png"
import hoa from "../../../../assets/images/mai.png"
import ngua from "../../../../assets/images/ngua.png"

import Boxtime from "../../../../components/Boxtime/Boxtime"

interface TBackGroundProps {
    countdown: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
        isFinished: boolean;
    };
}

const BackGround: React.FC<TBackGroundProps> = ({ countdown }) => {
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