import React, { useEffect, useRef } from 'react';

export const InteractiveParticleNetwork = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0, active: false });
    const animationFrameId = useRef(null);

    // Configuration
    const PARTICLE_COUNT = 100;
    const CONNECTION_DISTANCE = 160;
    const PARTICLE_SPEED = 0.4;
    const MOUSE_RADIUS = 180;
    const MOUSE_STRENGTH = 0.5; // Repulsion strength

    class Particle {
        constructor(width, height) {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
            this.radius = Math.random() * 1.5 + 1;
        }

        update(width, height) {
            // Apply mouse repulsion
            if (mouse.current.active) {
                const dx = this.x - mouse.current.x;
                const dy = this.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS) {
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force * MOUSE_STRENGTH * 0.2;
                    this.vy += Math.sin(angle) * force * MOUSE_STRENGTH * 0.2;
                }
            }

            // Standard movement
            this.x += this.vx;
            this.y += this.vy;

            // Simple friction to stop infinite speed from mouse
            this.vx *= 0.99;
            this.vy *= 0.99;

            // Re-cap speed
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 1.2) {
                this.vx = (this.vx / speed) * 1.2;
                this.vy = (this.vy / speed) * 1.2;
            }

            // Boundary checks
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(80, 200, 120, 0.3)'; // --color-accent
            ctx.fill();
        }
    }

    const init = () => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const dpr = window.devicePixelRatio || 1;
        const width = container.clientWidth;
        const height = container.clientHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);

        particles.current = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.current.push(new Particle(width, height));
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        ctx.clearRect(0, 0, width, height);

        particles.current.forEach((p, i) => {
            p.update(width, height);
            p.draw(ctx);

            for (let j = i + 1; j < particles.current.length; j++) {
                const p2 = particles.current[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DISTANCE) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    const alpha = 1 - (dist / CONNECTION_DISTANCE);
                    ctx.strokeStyle = `rgba(11, 110, 79, ${alpha * 0.15})`; // --color-highlight
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        });

        animationFrameId.current = requestAnimationFrame(draw);
    };

    useEffect(() => {
        init();
        draw();

        const handleResize = () => init();
        const handleMouseMove = (e) => {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (rect) {
                mouse.current.x = e.clientX - rect.left;
                mouse.current.y = e.clientY - rect.top;
                mouse.current.active = true;
            }
        };
        const handleMouseLeave = () => {
            mouse.current.active = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <canvas ref={canvasRef} className="opacity-60" />
        </div>
    );
};
