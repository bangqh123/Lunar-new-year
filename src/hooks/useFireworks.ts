import confetti from "canvas-confetti"
import { useRef } from "react"

export function useFireworks() {
  const firedRef = useRef(false)

  const startFireworks = () => {
    if (firedRef.current) return
    firedRef.current = true

    const duration = 6 * 1000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      })
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  return { startFireworks }
}
