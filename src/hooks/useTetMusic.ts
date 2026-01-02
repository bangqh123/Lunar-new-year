import { Howl } from "howler"
import { useEffect, useRef, useState } from "react"

export function useTetMusic(src: string) {
  const sound = useRef<Howl | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const unlocked = useRef(false)

  useEffect(() => {
    const unlock = () => (unlocked.current = true)
    window.addEventListener("click", unlock, { once: true })
    return () => window.removeEventListener("click", unlock)
  }, [])

  const ensureSound = () => {
    if (!sound.current) {
      sound.current = new Howl({
        src: [src],
        loop: true,
        html5: true
      })
    }
    return sound.current
  }

  const playMusic = () => {
    if (!unlocked.current) return
    const s = ensureSound()
    if (s.playing()) return // ⛔ CHỐNG PHÁT TRÙNG
    s.play()
    setIsPlaying(true)
  }

  const stopMusic = () => {
    if (!sound.current) return
    sound.current.stop()
    setIsPlaying(false)
  }

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic()
    } else {
      playMusic()
    }
  }

  return { playMusic, toggleMusic, isPlaying }
}
