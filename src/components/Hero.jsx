import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, Globe, ArrowRight, Instagram } from 'lucide-react';
import { ParticleTextEffect } from './ui/particle-text-effect';
import { ArchitectGrid } from './ui/ArchitectGrid';
import avatarImg from '../assets/avatar.png';

const Hero = () => {
    const socialLinks = [
        { icon: <Linkedin size={22} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sasikumar-r-23994228b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
        { icon: <Github size={22} />, label: 'GitHub', href: 'https://github.com/Sasi-Yuji' },
        { icon: <Instagram size={22} />, label: 'Instagram', href: 'https://www.instagram.com/melo_mane.18?igsh=MWxiaXV2N3h6NnBwMw==' },
        { icon: <Mail size={22} />, label: 'Email', href: 'mailto:kumarsasi9081@gmail.com' },
        { icon: <Globe size={22} />, label: 'Projects', href: '#projects' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="hero" className="min-h-screen flex items-center relative overflow-hidden pt-20">
            {/* Subtle Architect Grid Background */}
            <ArchitectGrid />

            <div className="main-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 py-10 lg:py-0">
                {/* Left Content Area */}
                <motion.div
                    className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-accent/20 text-accent font-bold text-xs md:text-sm mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
                        Available for New Projects
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="w-full h-[220px] md:h-[280px] lg:h-[320px] relative lg:-ml-4 mb-4 lg:mb-0"
                    >
                        {/* Interactive Particle Text */}
                        <ParticleTextEffect />
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-base md:text-lg text-highlight/70 max-w-lg mb-10 leading-relaxed font-medium px-4 lg:px-0"
                    >
                        Crafting scalable web applications with precision. From elegant front-ends
                        to robust back-end systems, I build digital solutions that make an impact.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 w-full lg:w-auto"
                    >
                        <a href="#projects" className="btn-primary space-x-2 text-sm md:text-base">
                            <span>Explore Projects</span> <ArrowRight size={20} />
                        </a>
                        <a href="#contact" className="btn-secondary text-sm md:text-base">
                            Get in Touch
                        </a>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex justify-center lg:justify-start gap-4 w-full lg:w-auto">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white shadow-sm border border-highlight/5 text-highlight/70 hover:text-white hover:bg-accent hover:border-accent hover:-translate-y-1 transition-all duration-300"
                                aria-label={social.label}
                            >
                                {React.cloneElement(social.icon, { size: window.innerWidth < 768 ? 18 : 22 })}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Visual Area: Avatar and Floating Cards */}
                <motion.div
                    className="relative flex justify-center items-center h-[350px] md:h-[450px] lg:h-[500px] order-1 lg:order-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
                        <div className="absolute inset-0 border border-accent/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
                        <div className="absolute inset-8 md:inset-10 border border-accent/10 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>

                        <div className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] bg-accent/20 rounded-full blur-[50px] md:blur-[70px] animate-pulse"></div>

                        <motion.div
                            className="relative z-10 w-[250px] h-[250px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center pointer-events-none"
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                        >
                            <img
                                src={avatarImg}
                                alt="Sasikumar R Avatar"
                                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(11,110,79,0.3)] filter brightness-105"
                                style={{ transform: "perspective(1000px) rotateY(-5deg)" }}
                            />
                        </motion.div>
                    </div>

                    {/* Floating Cards (Hidden on mobile for better focus) */}
                    <motion.div
                        className="absolute top-[10%] right-[-5%] bg-white/90 p-3 md:p-5 rounded-2xl shadow-xl border border-white/50 hidden md:flex items-center gap-4 z-20"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-[#D1F2EB] flex items-center justify-center text-[#0B6E4F] font-black text-base md:text-xl">
                            M
                        </div>
                        <div>
                            <p className="text-[#0B6E4F] font-extrabold text-xs md:text-sm mb-0.5">MERN Specialist</p>
                            <p className="text-[#0B6E4F]/50 text-[8px] md:text-[10px] font-bold tracking-wider uppercase">Full-Stack</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[10%] left-[-5%] bg-white/90 p-3 md:p-5 rounded-2xl shadow-xl border border-white/50 hidden md:flex items-center gap-4 z-20"
                        animate={{ y: [0, 15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    >
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-[#D1F2EB] flex items-center justify-center text-orange-500 font-bold text-base md:text-xl">
                            ⚡
                        </div>
                        <div>
                            <p className="text-[#0B6E4F] font-extrabold text-xs md:text-sm mb-0.5">Performant Code</p>
                            <p className="text-[#0B6E4F]/50 text-[8px] md:text-[10px] font-bold tracking-wider uppercase">Optimized</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
