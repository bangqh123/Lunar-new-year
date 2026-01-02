import { useState } from "react"

interface FallingItemsProps {
  isActive: boolean
  count?: number
  type?: string
}

interface Item {
  id: number
  left: number
  duration: number
  delay: number
}

export function FallingItems({ isActive, count = 15, type = "hoa" }: FallingItemsProps) {
  const [items] = useState<Item[]>(() =>
    Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 5
    }))
  )

  if (!isActive) return null

  return (
    <div className="falling">
      {items.map((item) => (
        <span
          key={item.id}
          className={`item ${type}`}
          style={{
            left: item.left + "%",
            animationDuration: item.duration + "s",
            animationDelay: item.delay + "s"
          }}
        />
      ))}
    </div>
  )
}