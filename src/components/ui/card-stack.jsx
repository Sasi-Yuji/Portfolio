"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

function wrapIndex(n, len) {
    if (len <= 0) return 0;
    return ((n % len) + len) % len;
}

function signedOffset(i, active, len, loop) {
    const raw = i - active;
    if (!loop || len <= 1) return raw;

    const alt = raw > 0 ? raw - len : raw + len;
    return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack({
    items,
    initialIndex = 0,
    maxVisible = 5,

    cardWidth: initialCardWidth = 600,
    cardHeight: initialCardHeight = 400,

    overlap = 0.55,
    spreadDeg = 35,

    perspectivePx = 1000,
    depthPx = 120,
    tiltXDeg = 15,

    activeLiftPx = 25,
    activeScale = 1.05,
    inactiveScale = 0.92,

    springStiffness = 300,
    springDamping = 30,

    loop = true,
    autoAdvance = false,
    intervalMs = 3000,
    pauseOnHover = true,

    showDots = true,
    className,

    onChangeIndex,
    renderCard,
}) {
    const reduceMotion = useReducedMotion();
    const len = items.length;

    const [active, setActive] = React.useState(() =>
        wrapIndex(initialIndex, len),
    );
    const [hovering, setHovering] = React.useState(false);
    const [dimensions, setDimensions] = React.useState({
        width: typeof window !== 'undefined' ? (window.innerWidth < 768 ? window.innerWidth - 48 : initialCardWidth) : initialCardWidth,
        height: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 520 : initialCardHeight) : initialCardHeight
    });

    React.useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth < 768 ? window.innerWidth - 48 : initialCardWidth,
                height: window.innerWidth < 768 ? 520 : initialCardHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [initialCardWidth, initialCardHeight]);

    const cardWidth = dimensions.width;
    const cardHeight = dimensions.height;

    React.useEffect(() => {
        setActive((a) => wrapIndex(a, len));
    }, [len]);

    React.useEffect(() => {
        if (!len) return;
        onChangeIndex?.(active, items[active]);
    }, [active, len, items, onChangeIndex]);

    const maxOffset = Math.max(0, Math.floor(maxVisible / 2));
    const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
    const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

    const prev = React.useCallback(() => {
        if (!len) return;
        setActive((a) => wrapIndex(a - 1, len));
    }, [len]);

    const next = React.useCallback(() => {
        if (!len) return;
        setActive((a) => wrapIndex(a + 1, len));
    }, [len]);

    const onKeyDown = (e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    };

    React.useEffect(() => {
        if (!autoAdvance || reduceMotion || !len || (pauseOnHover && hovering)) return;

        const id = window.setInterval(
            () => {
                next();
            },
            Math.max(700, intervalMs),
        );

        return () => window.clearInterval(id);
    }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, next]);

    if (!len) return null;

    const activeItem = items[active];

    return (
        <div
            className={cn("w-full", className)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div
                className="relative w-full outline-none"
                style={{ height: Math.max(400, cardHeight + 100) }}
                tabIndex={0}
                onKeyDown={onKeyDown}
            >
                <div
                    className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-accent/5 blur-3xl"
                    aria-hidden="true"
                />

                <div
                    className="absolute inset-0 flex items-center justify-center pt-10"
                    style={{
                        perspective: `${perspectivePx}px`,
                    }}
                >
                    <AnimatePresence initial={false}>
                        {items.map((item, i) => {
                            const off = signedOffset(i, active, len, loop);
                            const abs = Math.abs(off);
                            const visible = abs <= maxOffset;

                            if (!visible) return null;

                            const rotateZ = off * stepDeg;
                            const x = off * cardSpacing;
                            const y = abs * 8;
                            const z = -abs * depthPx;

                            const isActive = off === 0;
                            const scale = isActive ? activeScale : inactiveScale;
                            const lift = isActive ? -activeLiftPx : 0;
                            const rotateX = isActive ? 0 : tiltXDeg;
                            const zIndex = 100 - abs;

                            const dragProps = isActive
                                ? {
                                    drag: "x",
                                    dragConstraints: { left: 0, right: 0 },
                                    dragElastic: 0.18,
                                    onDragEnd: (_e, info) => {
                                        if (reduceMotion) return;
                                        const threshold = 120;
                                        if (info.offset.x > threshold || info.velocity.x > 600) prev();
                                        else if (info.offset.x < -threshold || info.velocity.x < -600) next();
                                    },
                                }
                                : {};

                            return (
                                <motion.div
                                    key={item.id}
                                    className={cn(
                                        "absolute rounded-3xl border border-white/20 overflow-hidden shadow-2xl",
                                        "will-change-transform select-none",
                                        isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer",
                                        isActive ? "bg-white" : "bg-white/80 backdrop-blur-sm"
                                    )}
                                    style={{
                                        width: cardWidth,
                                        height: cardHeight,
                                        zIndex,
                                        transformStyle: "preserve-3d",
                                    }}
                                    initial={{ opacity: 0, y: y + 40, x, rotateZ, rotateX, scale }}
                                    animate={{ opacity: 1, x, y: y + lift, rotateZ, rotateX, scale }}
                                    transition={{ type: "spring", stiffness: springStiffness, damping: springDamping }}
                                    onClick={() => setActive(i)}
                                    {...dragProps}
                                >
                                    <div
                                        className="h-full w-full"
                                        style={{
                                            transform: `translateZ(${z}px)`,
                                            transformStyle: "preserve-3d",
                                        }}
                                    >
                                        {renderCard ? renderCard(item, { active: isActive }) : <DefaultFanCard item={item} />}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {showDots ? (
                <div className="mt-8 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2.5">
                        {items.map((it, idx) => (
                            <button
                                key={it.id}
                                onClick={() => setActive(idx)}
                                className={cn(
                                    "h-2.5 w-2.5 rounded-full transition-all duration-300",
                                    idx === active ? "bg-accent w-6" : "bg-accent/20 hover:bg-accent/40"
                                )}
                                aria-label={`Go to ${it.title}`}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function DefaultFanCard({ item }) {
    return (
        <div className="relative h-full w-full p-8 flex flex-col justify-between">
            <div className="flex items-center gap-4">
                {item.icon && (
                    <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                        {item.icon}
                    </div>
                )}
                <h3 className="text-2xl font-bold text-highlight">{item.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
                {item.skills?.map((skill, idx) => (
                    <div key={idx} className="px-4 py-2 rounded-xl bg-primary/30 border border-accent/10 flex items-center gap-2">
                        {skill.icon}
                        <span className="text-sm font-semibold text-highlight/80">{skill.name}</span>
                    </div>
                ))}
            </div>

            <p className="text-highlight/60 text-sm italic mt-auto">
                {item.description}
            </p>
        </div>
    );
}
