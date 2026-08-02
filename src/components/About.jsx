import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Layout, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import avatarImg from '../assets/me_with_lap.png';

const About = () => {
    const services = [
        { icon: <Layout size={20} />, title: "Frontend", desc: "React & JavaScript" },
        { icon: <Terminal size={20} />, title: "Backend", desc: "Node & Express" },
        { icon: <Cpu size={20} />, title: "Systems", desc: "Clean Architecture" },
    ];

    // Animation Variants for Out of Screen Entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemLeft = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
    };

    const itemRight = {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
    };

    const itemUp = {
        hidden: { y: -50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
    };

    const itemDown = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <section id="about" className="py-24 bg-primary/30 border-y border-accent/10 overflow-hidden">
            <div className="main-container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                    className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
                >

                    {/* Left Side: Avatar Animating from Left */}
                    <motion.div
                        variants={itemLeft}
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end pt-8 lg:pt-0"
                    >
                        <motion.div 
                            className="relative group cursor-grab active:cursor-grabbing"
                            animate={{ y: [-8, 8, -8], rotate: [-1, 1, -1] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ y: -12, scale: 1.02, rotate: 0 }}
                            style={{ transformOrigin: "top center" }}
                        >
                            {/* Thick Lanyard Strap */}
                            <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-10 md:w-14 h-[500px] bg-highlight z-20 flex flex-col items-center justify-end pb-8 overflow-hidden border-x border-white/5 shadow-[inset_0_4px_15px_rgba(0,0,0,0.5)]">
                                {/* Subtle woven texture */}
                                <div className="absolute inset-0 opacity-10 flex space-x-[2px] justify-center pointer-events-none">
                                    <div className="w-[1px] h-full bg-white"></div>
                                    <div className="w-[1px] h-full bg-white"></div>
                                    <div className="w-[1px] h-full bg-transparent mx-0.5"></div>
                                    <div className="w-[1px] h-full bg-white"></div>
                                    <div className="w-[1px] h-full bg-white"></div>
                                </div>
                                {/* Repeating Logos */}
                                <div className="flex flex-col items-center space-y-12 md:space-y-16 text-white/20 z-10 pointer-events-none">
                                    <Terminal size={18} />
                                    <Cpu size={18} />
                                    <Terminal size={18} />
                                    <Cpu size={18} />
                                    <Terminal size={18} />
                                </div>
                            </div>
                            
                            {/* Lanyard Hardware / ID Clasp */}
                            <div className="absolute -top-[55px] md:-top-[70px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center drop-shadow-[0_8px_8px_rgba(0,0,0,0.25)] cursor-pointer pointer-events-none group-hover:-translate-y-1 transition-transform duration-300">
                                {/* Strap Fold over the D-Ring */}
                                <div className="w-10 md:w-14 h-6 md:h-8 bg-highlight rounded-b-[4px] shadow-md z-20 flex flex-col justify-end items-center pb-1 border-b border-black/50">
                                    <div className="w-6 md:w-10 h-[1px] bg-white/10 mb-[3px] md:mb-1"></div>
                                    <div className="w-6 md:w-10 h-[1px] bg-white/10"></div>
                                </div>
                                
                                {/* D-Ring Loop */}
                                <div className="w-8 md:w-11 h-6 md:h-8 border-[3.5px] md:border-[5px] border-[#222] rounded-b-[10px] md:rounded-b-[14px] -mt-3 md:-mt-4 z-10 shadow-sm relative backdrop-blur-sm"></div>
                                
                                {/* Swivel Mechanism */}
                                <div className="w-3 md:w-4 h-5 md:h-[22px] bg-gradient-to-b from-[#333] to-[#111] rounded-[2px] z-20 -mt-2 md:-mt-2.5 border border-[#444] relative shadow-md">
                                    {/* Pivot pin */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[2px] md:h-[3px] bg-[#1a1a1a] rounded-full"></div>
                                </div>

                                {/* Clasp Hook (docks into the card hole) */}
                                <div className="w-4 md:w-[22px] h-8 md:h-[42px] border-[3.5px] md:border-[5px] border-[#222] rounded-b-[10px] md:rounded-b-[12px] border-t-0 -mt-1 z-10 relative box-border">
                                    {/* Spring arm detail */}
                                    <div className="absolute right-[-3.5px] md:right-[-5px] top-1.5 w-[3.5px] md:w-[5px] h-[55%] bg-[#2a2a2a] rounded-full border-l border-white/5"></div>
                                </div>
                            </div>

                            {/* Decorative Background layers */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-all duration-500 scale-95 md:scale-100 blur-[2px] opacity-80"></div>
                            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-accent/5 rounded-[2.5rem] -rotate-3 group-hover:-rotate-1 transition-all duration-500 scale-95 md:scale-100 blur-[1px] opacity-80"></div>

                            {/* The Main Card Container */}
                            <div className="relative z-10 w-[300px] h-[350px] md:w-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden bg-primary/80 backdrop-blur-xl border border-accent/20 shadow-[0_20px_50px_-10px_rgba(11,78,25,0.15)] group-hover:shadow-[0_40px_80px_-15px_rgba(11,78,25,0.25)] p-4 pt-10 md:p-5 md:pt-14 transition-all duration-500">
                                {/* The Punch Hole for the ID */}
                                <div className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 w-8 md:w-10 h-2.5 md:h-3 bg-highlight rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.8)] z-20 pointer-events-none"></div>

                                <div className="w-full h-full rounded-[1.8rem] overflow-hidden relative">
                                    <img
                                        src={avatarImg}
                                        alt="Sasikumar Avatar"
                                        className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-[1.04] transition-transform duration-700 origin-center"
                                    />
                                </div>

                                {/* Floating Uptime Badge */}
                                <motion.div
                                    animate={{ y: [0, -6, 0] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                    whileHover={{ scale: 1.1, rotate: -2, y: -10 }}
                                    className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-highlight/95 backdrop-blur-md border border-white/10 text-white px-5 py-3 md:px-6 md:py-3.5 rounded-2xl shadow-[0_15px_35px_-5px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.35)] transition-all duration-300 flex items-center gap-2.5 z-30"
                                >
                                    <span className="text-lg md:text-xl font-black tracking-tight drop-shadow-md">99.9%</span>
                                    <span className="text-[9px] md:text-[10px] items-center leading-tight font-bold uppercase tracking-widest text-white/90 drop-shadow-sm">System<br />Uptime</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Content Animating from Right */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                            <motion.div variants={itemUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                                <Sparkles size={14} /> My Story
                            </motion.div>

                            <motion.h2 variants={itemRight} className="text-4xl md:text-5xl lg:text-6xl font-black text-highlight mb-8 leading-tight">
                                Crafting Digital <br />
                                <span className="text-accent">Excellence</span> through Code.
                            </motion.h2>

                            <motion.p variants={itemRight} className="text-highlight/70 text-lg md:text-xl leading-relaxed mb-6 max-w-xl">
                                I'm <span className="text-highlight font-bold">SASIKUMAR R</span>—a Full-Stack Engineer who specializes in architecting high-availability systems. I bridge the gap between <span className="text-highlight font-bold">complex business logic</span> and seamless digital experiences, ensuring every line of code drives real-world value.
                            </motion.p>

                            <motion.p variants={itemRight} className="text-highlight/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl italic border-l-4 border-accent/20 pl-6">
                                With a track record of delivering enterprise-grade platforms at <span className="text-highlight font-bold">Infolexus Solutions</span>, I’ve mastered the art of <span className="text-highlight font-bold">real-time engineering</span> and automated infrastructure. My focus is on performance, security, and building future-proof architectures.
                            </motion.p>

                            <motion.div variants={itemDown} className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-10">
                                {services.map((service, i) => (
                                    <div key={i} className="p-5 rounded-2xl bg-accent/5 border border-accent/10 group hover:border-accent/30 transition-all duration-300">
                                        <div className="text-accent mb-3 group-hover:scale-110 transition-transform">
                                            {service.icon}
                                        </div>
                                        <h4 className="text-sm font-bold text-highlight mb-1 uppercase tracking-wider">{service.title}</h4>
                                        <p className="text-[11px] text-highlight/50 font-medium">{service.desc}</p>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div variants={itemUp} className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
                                <a href="#contact" className="btn-primary group">
                                    Hire Me <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <div className="flex items-center gap-4 ml-0 sm:ml-4">
                                    <a href="https://github.com/Sasi-Yuji" target="_blank" className="text-highlight/40 hover:text-accent transition-colors">
                                        <Github size={20} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/sasikumar-r-23994228b" target="_blank" className="text-highlight/40 hover:text-accent transition-colors">
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default About;
