import { useEffect, useRef } from "react"

class Particle {
    constructor() {
        this.pos = { x: 0, y: 0 }
        this.vel = { x: 0, y: 0 }
        this.acc = { x: 0, y: 0 }
        this.target = { x: 0, y: 0 }

        this.closeEnoughTarget = 80
        this.maxSpeed = 8.0
        this.maxForce = 0.4
        this.particleSize = 1.2
        this.isKilled = false

        this.startColor = { r: 0, g: 0, b: 0 }
        this.targetColor = { r: 0, g: 0, b: 0 }
        this.colorWeight = 0
        this.colorBlendRate = 0.1
    }

    move() {
        // Check if particle is close enough to its target to slow down
        let proximityMult = 1
        const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2))

        if (distance < this.closeEnoughTarget) {
            proximityMult = distance / this.closeEnoughTarget
        }

        // Add force towards target
        const towardsTarget = {
            x: this.target.x - this.pos.x,
            y: this.target.y - this.pos.y,
        }

        const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y)
        if (magnitude > 0) {
            towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult
            towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult
        }

        const steer = {
            x: towardsTarget.x - this.vel.x,
            y: towardsTarget.y - this.vel.y,
        }

        const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y)
        if (steerMagnitude > 0) {
            steer.x = (steer.x / steerMagnitude) * this.maxForce
            steer.y = (steer.y / steerMagnitude) * this.maxForce
        }

        this.acc.x += steer.x
        this.acc.y += steer.y

        // Move particle
        this.vel.x += this.acc.x
        this.vel.y += this.acc.y
        this.pos.x += this.vel.x
        this.pos.y += this.vel.y
        this.acc.x = 0
        this.acc.y = 0
    }

    draw(ctx, drawAsPoints) {
        // Blend towards target color
        if (this.colorWeight < 1.0) {
            this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0)
        }

        // Calculate current color
        const currentColor = {
            r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
            g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
            b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
        }

        ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`

        // Use fillRect for 1x1 or 2x2 blocks for maximum "solid" look and clarity
        ctx.fillRect(this.pos.x, this.pos.y, this.particleSize, this.particleSize)
    }

    kill(width, height) {
        if (!this.isKilled) {
            const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2)
            this.target.x = randomPos.x
            this.target.y = randomPos.y
            this.isKilled = true
        }
    }

    generateRandomPos(x, y, mag) {
        const randomX = Math.random() * 1000
        const randomY = Math.random() * 500
        const direction = { x: randomX - x, y: randomY - y }
        const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y)
        if (magnitude > 0) {
            direction.x = (direction.x / magnitude) * mag
            direction.y = (direction.y / magnitude) * mag
        }
        return { x: x + direction.x, y: y + direction.y }
    }
}

export function ParticleTextEffect() {
    const canvasRef = useRef(null)
    const containerRef = useRef(null)
    const animationRef = useRef()
    const particlesRef = useRef([])
    const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false })

    const pixelSteps = 1 // Maximum density for clarity
    const drawAsPoints = true

    const generateRandomPos = (x, y, mag) => {
        const angle = Math.random() * Math.PI * 2
        return {
            x: x + Math.cos(angle) * mag,
            y: y + Math.sin(angle) * mag
        }
    }

    const initParticles = (canvasWidth, canvasHeight) => {
        const offscreenCanvas = document.createElement("canvas")
        offscreenCanvas.width = canvasWidth
        offscreenCanvas.height = canvasHeight
        const offscreenCtx = offscreenCanvas.getContext("2d", { willReadFrequently: true })

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
        const isSmallMobile = typeof window !== 'undefined' && window.innerWidth < 640;

        // Layout text
        let startY = isMobile ? 10 : 20;
        const xPos = isMobile ? canvasWidth / 2 : 10;

        offscreenCtx.clearRect(0, 0, canvasWidth, canvasHeight)
        offscreenCtx.textAlign = isMobile ? "center" : "left"
        offscreenCtx.textBaseline = "top"

        // Layout text
        offscreenCtx.fillStyle = "rgb(5, 85, 60)"; // --color-highlight
        offscreenCtx.font = isMobile
            ? (isSmallMobile ? "900 38px 'Outfit', sans-serif" : "900 46px 'Outfit', sans-serif")
            : "900 74px 'Outfit', sans-serif";
        offscreenCtx.fillText("Hi, I'm", xPos, startY);

        startY += isMobile ? (isSmallMobile ? 48 : 54) : 82;
        offscreenCtx.fillStyle = "rgb(34, 197, 94)"; // --color-accent
        offscreenCtx.font = isMobile
            ? (isSmallMobile ? "900 48px 'Outfit', sans-serif" : "900 64px 'Outfit', sans-serif")
            : "900 96px 'Outfit', sans-serif";
        offscreenCtx.fillText("Sasikumar R", xPos, startY);

        startY += isMobile ? (isSmallMobile ? 64 : 80) : 120;
        offscreenCtx.fillStyle = "rgb(5, 85, 60)";
        offscreenCtx.font = isMobile
            ? (isSmallMobile ? "900 20px 'Outfit', sans-serif" : "900 28px 'Outfit', sans-serif")
            : "900 38px 'Outfit', sans-serif";
        offscreenCtx.fillText("MERN Stack Developer &", xPos, startY);

        startY += isMobile ? (isSmallMobile ? 28 : 36) : 48;
        offscreenCtx.fillText("UI/UX Enthusiast", xPos, startY);

        const imageData = offscreenCtx.getImageData(0, 0, canvasWidth, canvasHeight)
        const pixels = imageData.data
        const particles = particlesRef.current
        let particleIndex = 0

        // Use a grid to ensure perfect solid density
        for (let y = 0; y < canvasHeight; y += pixelSteps) {
            for (let x = 0; x < canvasWidth; x += pixelSteps) {
                const i = (y * canvasWidth + x) * 4
                const alpha = pixels[i + 3]

                if (alpha > 50) { // Transparency threshold
                    let particle
                    if (particleIndex < particles.length) {
                        particle = particles[particleIndex]
                        particle.isKilled = false
                    } else {
                        particle = new Particle()
                        const start = generateRandomPos(canvasWidth / 2, canvasHeight / 2, canvasWidth)
                        particle.pos.x = start.x
                        particle.pos.y = start.y
                        particles.push(particle)
                    }

                    particle.target.x = x
                    particle.target.y = y
                    particle.targetColor = { r: pixels[i], g: pixels[i + 1], b: pixels[i + 2] }
                    // Initially black or transparent, then fades to target
                    particle.startColor = { r: 0, g: 0, b: 0 }
                    particle.colorWeight = 0

                    particleIndex++
                }
            }
        }

        // Kill leftovers
        for (let i = particleIndex; i < particles.length; i++) {
            particles[i].kill(canvasWidth, canvasHeight)
        }
    }

    const animate = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        const particles = particlesRef.current

        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore()

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i]
            p.move()
            p.draw(ctx, drawAsPoints)
            if (p.isKilled && (p.pos.x < -100 || p.pos.x > canvas.width + 100 || p.pos.y < -100 || p.pos.y > canvas.height + 100)) {
                particles.splice(i, 1)
            }
        }

        animationRef.current = requestAnimationFrame(animate)
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        const resize = () => {
            const dpr = window.devicePixelRatio || 1
            const w = container.clientWidth
            const h = container.clientHeight
            if (w === 0 || h === 0) return

            canvas.width = w * dpr
            canvas.height = h * dpr
            const ctx = canvas.getContext("2d")
            ctx.scale(dpr, dpr)

            // Wait for font
            if (document.fonts) {
                document.fonts.ready.then(() => initParticles(w, h))
            } else {
                initParticles(w, h)
            }
        }

        resize()
        animate()

        const observer = new ResizeObserver(resize)
        observer.observe(container)

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect()
            mouseRef.current.x = e.clientX - rect.left
            mouseRef.current.y = e.clientY - rect.top
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            observer.disconnect()
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return (
        <div ref={containerRef} className="w-full h-full relative z-10 bg-transparent flex items-center justify-start">
            <canvas
                ref={canvasRef}
                className="w-full h-full pointer-events-none bg-transparent"
            />
        </div>
    )
}
