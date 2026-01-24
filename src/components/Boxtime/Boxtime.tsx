import "./Boxtime.scss"

interface BoxtimeProps {
  time: number | string
  label: string
}

const Boxtime: React.FC<BoxtimeProps> = ({ time, label }) => {
  return (
    <div className="time-box">
      <div className="time-glow"></div>
      <div className="time-content">
        <div className="time-number">{time}</div>
        <div className="time-label">{label}</div>
      </div>
    </div>
  );
};

export default Boxtime

