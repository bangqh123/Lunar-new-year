import "./Boxtime.scss"

interface BoxtimeProps {
  time: number | string
  label: string
}

const Boxtime = ({ time, label }: BoxtimeProps) => {
  return (
    <div className="time-box">
      <span className="time-value">
        {time.toString().padStart(2, "0")}
      </span>
      <span className="time-label">{label}</span>
    </div>
  )
}

export default Boxtime

