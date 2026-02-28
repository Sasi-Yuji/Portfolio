import React from 'react';
import { motion } from 'framer-motion';
import {
    Layout, Server, Cloud, Zap, Cpu, Globe,
    Layers, Atom, Terminal, Database, GitBranch,
    Smartphone, FileCode, Search, Sparkles,
    ShieldCheck, RefreshCw, Radio, TestTube,
    BadgeCheck, Send, FileUp, MonitorSmartphone,
    MousePointer2, Box, Code2, Wind, TerminalSquare,
    CheckCircle2
} from 'lucide-react';

const SkillNode = ({ icon: Icon, name }) => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] group/node hover:border-accent hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md">
        <div className="text-accent group-hover/node:scale-110 transition-transform">
            <Icon size={14} />
        </div>
        <span className="text-[10px] sm:text-[11px] font-bold text-[#475569] group-hover/node:text-highlight whitespace-nowrap">
            {name}
        </span>
    </div>
);

const CategoryCard = ({ category, index }) => {
    // Dynamic Directions for "Out of Screen" Arrangement
    const initialPositions = [
        { x: -500, y: 0, opacity: 0 }, // Card 0: from Left
        { x: 500, y: 0, opacity: 0 },  // Card 1: from Right
        { x: -500, y: 200, opacity: 0 }, // Card 2: from Bottom-Left
        { x: 500, y: 200, opacity: 0 }  // Card 3: from Bottom-Right
    ];

    return (
        <motion.div
            initial={initialPositions[index]}
            whileInView={{ x: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1
            }}
            className="group relative w-full bg-white rounded-[2rem] p-6 md:p-8 shadow-lg shadow-accent/5 border border-accent/5 overflow-hidden flex flex-col h-full"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <category.icon size={24} />
                </div>
                <div>
                    <h3 className="text-xl md:text-2xl font-black text-highlight leading-none mb-1">{category.title}</h3>
                    <div className="h-1 w-8 bg-accent rounded-full group-hover:w-16 transition-all duration-500"></div>
                </div>
            </div>

            <p className="text-[#64748B] text-xs md:text-sm italic leading-snug mb-6 opacity-80">
                "{category.description}"
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
                {category.skills.map((skill, idx) => (
                    <SkillNode key={idx} icon={skill.icon} name={skill.name} />
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-[#F1F5F9] flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-[#CBD5E1]">
                <span className="group-hover:text-accent transition-colors">Core Stack</span>
                <span>MERN Dev</span>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const categories = [
        {
            title: "Frontend & Experience",
            description: "Crafting immersive, pixel-perfect user interfaces with modern frameworks and animations.",
            icon: Layout,
            skills: [
                { name: "React.js", icon: Atom },
                { name: "JavaScript (ES6+)", icon: FileCode },
                { name: "Tailwind CSS", icon: Wind },
                { name: "Bootstrap 5", icon: Box },
                { name: "GSAP & Framer", icon: Sparkles },
                { name: "TypeScript", icon: Code2 }
            ]
        },
        {
            title: "Backend & Security",
            description: "Building resilient server architectures and securing systems with modern auth patterns.",
            icon: ShieldCheck,
            skills: [
                { name: "Node.js", icon: TerminalSquare },
                { name: "Express.js", icon: Server },
                { name: "RESTful APIs", icon: Globe },
                { name: "JWT & RBAC", icon: ShieldCheck },
                { name: "MongoDB", icon: Database },
                { name: "SQL DB", icon: Database }
            ]
        },
        {
            title: "Deployment & Cloud",
            description: "Streamlining deployment pipelines and ensuring reliability across cloud platforms.",
            icon: Cloud,
            skills: [
                { name: "Git & GitHub", icon: GitBranch },
                { name: "Render & Netlify", icon: Globe },
                { name: "Vercel / Hub", icon: Zap },
                { name: "CPanel / SSH", icon: Server },
                { name: "Vite Arch", icon: Zap },
                { name: "Postman API", icon: Search }
            ]
        },
        {
            title: "Testing & Real-time",
            description: "Ensuring code quality and real-time reliability through automated testing and socket systems.",
            icon: Zap,
            skills: [
                { name: "Mocha & Jest", icon: BadgeCheck },
                { name: "Socket.IO (RT)", icon: Radio },
                { name: "Unit & Integrate", icon: TestTube },
                { name: "Multer / UP", icon: FileUp },
                { name: "Nodemailer", icon: Send },
                { name: "API Quality", icon: CheckCircle2 }
            ]
        }
    ];

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-primary/30 min-h-screen border-t border-accent/5">
            <div className="main-container relative z-10 px-4">

                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        <MousePointer2 size={12} /> Tech Arsenal
                    </motion.div>

                    <motion.h2
                        initial={{ y: 150, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl md:text-7xl font-black text-highlight mb-4 tracking-tighter"
                    >
                        Technical <span className="text-accent underline decoration-accent/10 underline-offset-4">Toolkit.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md text-highlight/50 text-xs md:text-sm font-bold uppercase tracking-[0.15em] leading-relaxed"
                    >
                        architecting production-grade systems <br className="hidden md:block" />
                        with modern technologies.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {categories.map((cat, i) => (
                        <CategoryCard key={i} category={cat} index={i} />
                    ))}
                </div>

            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-accent/[0.012] select-none pointer-events-none whitespace-nowrap overflow-hidden -rotate-2">
                TECH STACK
            </div>
        </section>
    );
};

export default Skills;
