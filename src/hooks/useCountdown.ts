import { useEffect, useState, useCallback } from "react"

export function useCountdown(target: number) {
  const calc = useCallback((now: number) => {
    const diff = target - now
    if (diff <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true }

    const t = Math.floor(diff / 1000)
    return {
      days: Math.floor(t / 86400),
      hours: Math.floor((t % 86400) / 3600),
      minutes: Math.floor((t % 3600) / 60),
      seconds: t % 60,
      isFinished: false
    }
  }, [target])

  const [state, setState] = useState(() => ({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false
  }))

  useEffect(() => {
    const tick = () => {
      const next = calc(Date.now())
      setState(next)
      if (next.isFinished) clearInterval(i)
    }

    const i = window.setInterval(tick, 1000)
    tick()

    return () => clearInterval(i)
  }, [calc])

  return state
}