import { useRef } from "react"
import confetti from "canvas-confetti"

export function useFireworks() {
  const ref = useRef<number | null>(null)

  const fire = () =>
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { x: Math.random(), y: Math.random() * 0.5 }
    })

  const startFireworks = () => {
    if (ref.current) return
    fire()
    ref.current = window.setInterval(fire, 700)
  }

  const stopFireworks = () => {
    if (ref.current) clearInterval(ref.current)
    ref.current = null
  }

  return { startFireworks, stopFireworks }
}
