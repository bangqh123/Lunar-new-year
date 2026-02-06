import "./Firework.scss"

import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import SoundFirework from "../../assets/musics/firework.mp3"

import New_Text from "./paritals/FireworkText/FireworkText"

class Rocket {
    x: number
    y: number
    vy: number
    exploded: boolean
    targetY: number
    ctx: CanvasRenderingContext2D

    constructor(w: number, h: number, ctx: CanvasRenderingContext2D) {
        this.x = Math.random() * w
        this.y = h + 30

        this.vy = Math.random() * 1.5 + 2.5

        this.exploded = false
        this.targetY = Math.random() * h * 0.35 + h * 0.15
        this.ctx = ctx
    }

    update() {
        this.y -= this.vy
        if (this.y <= this.targetY) {
            this.exploded = true
        }
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        this.ctx.fillStyle = "white"
        this.ctx.fill()
    }
}

class Particle {
    x: number
    y: number
    vx: number
    vy: number
    alpha: number
    color: string
    ctx: CanvasRenderingContext2D

    constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 6 + 2
        this.x = x
        this.y = y
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.alpha = 1
        this.color = `hsl(${Math.random() * 360},100%,60%)`
        this.ctx = ctx
    }

    update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.05
        this.alpha -= 0.015
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        this.ctx.fillStyle = this.color.replace(")", `,${this.alpha})`).replace("hsl", "hsla")
        this.ctx.fill()
    }
}

const Firework = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const boomSound = useRef<HTMLAudioElement | null>(null)
    const hasPlayedSound = useRef(false)

    const [showText, setShowText] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        boomSound.current = new Audio(SoundFirework);
        boomSound.current.volume = 1;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const rockets: Rocket[] = [];
        const particles: Particle[] = [];

        const explode = (x: number, y: number) => {
            for (let i = 0; i < 80; i++) {
                particles.push(new Particle(x, y, ctx));
            }

            // sound
            if (boomSound.current && boomSound.current.paused) {
                boomSound.current.currentTime = 0;
                boomSound.current.play().catch(() => { });
                hasPlayedSound.current = true;
            }
        };

        let animationId: number;

        const animate = () => {
            // nền đen
            ctx.fillStyle = "rgba(0,0,0,0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // rockets
            for (let i = rockets.length - 1; i >= 0; i--) {
                const r = rockets[i];
                r.update();
                r.draw();

                if (r.exploded) {
                    explode(r.x, r.y);
                    rockets.splice(i, 1);
                }
            }

            // particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                if (p.alpha <= 0) particles.splice(i, 1);
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        const spawnInterval = setInterval(() => {
            const burst = Math.floor(Math.random() * 5) + 1; // 1–3 quả
            for (let i = 0; i < burst; i++) {
                rockets.push(new Rocket(canvas.width, canvas.height, ctx));
            }
        }, 1000); // tốc độ bắn

        const now = Date.now();
        let textShown = false;
        let redirected = false;

        const checkTime = () => {
            const elapsed = Date.now() - now;
            
            if (elapsed >= 8000 && !textShown) {
                setShowText(true);
                textShown = true;
            }
            
            if (elapsed >= 40000 && !redirected) {
                if (boomSound.current) {
                    boomSound.current.pause();
                    boomSound.current.currentTime = 0;
                }
                navigate("/wishs");
                redirected = true;
            }
        };

        const timeCheckInterval = setInterval(checkTime, 100);

        return () => {
            cancelAnimationFrame(animationId);
            clearInterval(spawnInterval);
            clearInterval(timeCheckInterval);

            if (boomSound.current) {
                boomSound.current.pause();
                boomSound.current.currentTime = 0;
            }

            window.removeEventListener("resize", resize);
        };
    }, [navigate]);

    return (
        <div className="fireworks">
            <canvas ref={canvasRef} />
            {showText && (
                <New_Text />
            )}
        </div>
    )
}

export default Firework
