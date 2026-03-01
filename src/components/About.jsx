import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Layout, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import avatarImg from '../assets/avatar.png';

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
        <section id="about" className="py-24 bg-white border-y border-accent/5 overflow-hidden">
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
                        className="w-full lg:w-1/2 flex justify-center lg:justify-end"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-accent/10 rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-500 scale-95 md:scale-100"></div>
                            <div className="absolute inset-0 bg-accent/5 rounded-3xl -rotate-3 group-hover:-rotate-1 transition-transform duration-500 scale-95 md:scale-100"></div>

                            <div className="relative z-10 w-[300px] h-[350px] md:w-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-white border border-accent/10 shadow-xl p-4">
                                <img
                                    src={avatarImg}
                                    alt="Sasikumar Avatar"
                                    className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-700"
                                />

                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute bottom-8 right-8 bg-highlight text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2"
                                >
                                    <span className="text-xl font-black">99.9%</span>
                                    <span className="text-[10px] items-center leading-none font-bold uppercase tracking-widest text-white/70">System<br />Uptime</span>
                                </motion.div>
                            </div>
                        </div>
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
