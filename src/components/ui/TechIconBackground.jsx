import React from 'react';
import { motion } from 'framer-motion';

const icons = [
    // React
    {
        viewBox: "0 0 100 100",
        path: (
            <g fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="50" cy="50" r="10" fill="currentColor" />
                <ellipse cx="50" cy="50" rx="40" ry="15" />
                <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(60 50 50)" />
                <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(120 50 50)" />
            </g>
        )
    },
    // MongoDB (Leaf shape simplified)
    {
        viewBox: "0 0 100 100",
        path: (
            <path
                fill="currentColor"
                d="M50 10c-20 20-30 40-30 60s15 25 30 25 30-5 30-25-10-40-30-60z"
            />
        )
    },
    // Node.js (Hexagon)
    {
        viewBox: "0 0 100 100",
        path: (
            <path
                fill="currentColor"
                d="M50 5l39 22.5v45L50 95 11 72.5v-45z"
            />
        )
    },
    // Express (Stylized text "ex")
    {
        viewBox: "0 0 100 100",
        path: (
            <text
                x="50"
                y="50"
                fontSize="55"
                fontWeight="900"
                fill="currentColor"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="Outfit, sans-serif"
            >
                EX
            </text>
        )
    }
];

export const TechIconBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
            {[...Array(14)].map((_, i) => {
                const icon = icons[i % icons.length];
                const size = 120 + Math.random() * 120;
                const blur = 8 + Math.random() * 12; // Adjusted blur for better visuals
                const opacity = 0.08 + Math.random() * 0.12;
                const duration = 25 + Math.random() * 15;
                const delay = -Math.random() * 25;
                const colorClass = i % 3 === 0 ? 'text-accent' : 'text-highlight';

                const startX = Math.random() * 100;
                const startY = Math.random() * 100;
                const endX = (startX + 20 + Math.random() * 20) % 100;
                const endY = (startY + 20 + Math.random() * 20) % 100;

                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full flex items-center justify-center pointer-events-none"
                        style={{
                            width: size,
                            height: size,
                            opacity: opacity,
                            filter: `blur(${blur}px)`,
                            left: `${startX}%`,
                            top: `${startY}%`,
                        }}
                        animate={{
                            left: [`${startX}%`, `${endX}%`, `${startX}%`],
                            top: [`${startY}%`, `${endY}%`, `${startY}%`],
                            rotate: [0, 180, 360],
                            scale: [1, 1.1, 0.9, 1]
                        }}
                        transition={{
                            duration: duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: delay
                        }}
                    >
                        <svg
                            viewBox={icon.viewBox}
                            className={`w-full h-full ${colorClass} fill-current`}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {icon.path}
                        </svg>
                    </motion.div>
                );
            })}
        </div>
    );
};
