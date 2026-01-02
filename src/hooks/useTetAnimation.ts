import { useState } from "react"

export function useTetAnimation() {
  const [isActive, set] = useState(false)
  return { isActive, startAnimation: () => set(true) }
}
