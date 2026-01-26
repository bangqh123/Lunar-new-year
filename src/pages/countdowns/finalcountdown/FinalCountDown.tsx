import "./FinalCountDown.scss"

interface TFinalCountDownProps {
    countdown: {
        seconds: number;
    };
}

const FinalCountDown: React.FC<TFinalCountDownProps> = ({ countdown }) => {
    return (
        <div className="final10s">
            <div className="pulse-bg"></div>
            <div className="count-number">
                {countdown.seconds}
            </div>
        </div>
    )
}

export default FinalCountDown;