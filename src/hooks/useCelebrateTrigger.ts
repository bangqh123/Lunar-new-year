import { useEffect, useRef } from "react"

interface UseCelebrateTriggerProps {
  isFinished: boolean
  onFireworks: () => void
  onPlayMusic: () => void
  onStartAnimation: () => void
}

export function useCelebrateTrigger({
  isFinished,
  onFireworks,
  onPlayMusic,
  onStartAnimation
}: UseCelebrateTriggerProps) {
  const triggered = useRef(false)

  useEffect(() => {
    if (!isFinished || triggered.current) return
    triggered.current = true
    onFireworks()
    onPlayMusic()
    onStartAnimation()
  }, [isFinished, onFireworks, onPlayMusic, onStartAnimation])
}
