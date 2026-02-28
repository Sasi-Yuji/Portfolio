import React from 'react';

export const ArchitectGrid = () => {
    return (
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden select-none">
            {/* Base Dot Matrix */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #0B6E4F 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            ></div>

            {/* Subtle Grid Lines */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #0B6E4F 1px, transparent 1px),
                        linear-gradient(to bottom, #0B6E4F 1px, transparent 1px)
                    `,
                    backgroundSize: '128px 128px'
                }}
            ></div>

            {/* Fading Mask for Smooth Transitions */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-transparent to-primary/100"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/100 via-transparent to-primary/100"></div>
        </div>
    );
};
