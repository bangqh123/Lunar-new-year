import { useEffect, useRef } from "react"

class Star {
  x: number
  y: number
  vx: number
  vy: number
  z: number
  size: number
  alpha: number
  ctx: CanvasRenderingContext2D

  constructor(cx: number, cy: number, ctx: CanvasRenderingContext2D) {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 6 + 2

    this.x = cx
    this.y = cy
    this.vx = Math.cos(angle) * speed
    this.vy = Math.sin(angle) * speed
    this.z = Math.random() * 1
    this.size = Math.random() * 2 + 1
    this.alpha = Math.random() * 3 + 1.5
    this.ctx = ctx
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    this.alpha -= 0.003
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y)
    this.ctx.lineTo(this.x - this.vx * 0.15, this.y - this.vy * 0.15)
    this.ctx.strokeStyle = `rgba(255,255,255,${this.alpha})`
    this.ctx.lineWidth = this.size
    this.ctx.stroke()
  }
}

const SpaceWarpBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const cx = () => canvas.width / 2
    const cy = () => canvas.height / 2

    const stars: Star[] = []

    const spawn = (count = 25) => {
      for (let i = 0; i < count; i++) {
        stars.push(new Star(cx(), cy(), ctx))
      }
    }

    const animate = () => {
      // nền tối mượt
      ctx.fillStyle = "rgba(5, 5, 15, 0.35)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // glow core
      const glow = ctx.createRadialGradient(cx(), cy(), 0, cx(), cy(), 300)
      glow.addColorStop(0, "rgba(180,180,255,0.15)")
      glow.addColorStop(1, "rgba(0,0,0,0)")
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      spawn(4)

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.update()
        s.draw()

        if (
          s.alpha <= 0 ||
          s.x < 0 || s.x > canvas.width ||
          s.y < 0 || s.y > canvas.height
        ) {
          stars.splice(i, 1)
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
      }}
    />
  )
}

export default SpaceWarpBackground
