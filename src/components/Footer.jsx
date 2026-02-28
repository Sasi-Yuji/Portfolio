import React from 'react';
import { Linkedin, Github, Mail, Globe, Heart, Code2, Instagram } from 'lucide-react';

const Footer = () => {
    const socialLinks = [
        { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/sasikumar-r-23994228b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
        { icon: <Github size={18} />, href: 'https://github.com/Sasi-Yuji', label: 'GitHub' },
        { icon: <Instagram size={18} />, href: 'https://www.instagram.com/melo_mane.18?igsh=MWxiaXV2N3h6NnBwMw==', label: 'Instagram' },
        { icon: <Mail size={18} />, href: 'mailto:kumarsasi9081@gmail.com', label: 'Email' },
    ];

    return (
        <footer className="py-16 md:py-24 bg-primary border-t border-white/5 relative overflow-hidden">
            <div className="main-container relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-4xl font-black text-gradient mb-4 tracking-tighter">
                            {'<'}SASI{' />'}
                        </h2>
                        <p className="text-highlight/50 text-xs md:text-sm font-bold tracking-wide flex flex-col md:flex-row items-center gap-2 md:gap-3">
                            <span className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full border border-accent/20">
                                <Code2 size={16} className="text-accent" />
                                MERN Stack Specialist
                            </span>
                            <span className="hidden md:block text-accent/30">|</span>
                            <span className="text-highlight/30">Crafting High-Performance Solutions</span>
                        </p>
                    </div>

                    <div className="flex gap-4 md:gap-6">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer"
                                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white shadow-xl shadow-accent/5 border border-accent/5 flex items-center justify-center text-highlight/60 hover:text-white hover:bg-accent hover:border-accent hover:-translate-y-2 transition-all duration-500 group"
                                aria-label={social.label}
                            >
                                {React.cloneElement(social.icon, { size: 20, className: "group-hover:scale-110 transition-transform" })}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-highlight/5 gap-8">
                    <p className="text-highlight/30 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
                        &copy; {new Date().getFullYear()} Sasikumar R. <span className="hidden md:inline">|</span> <span className="text-accent/40">Architecting the Future</span>
                    </p>
                    <p className="flex items-center gap-3 text-highlight/30 text-[10px] font-black uppercase tracking-[0.2em]">
                        Made with <Heart size={16} className="text-red-500 fill-red-500 animate-[pulse_2s_infinite]" /> in Coimbatore
                    </p>
                </div>
            </div>

            {/* Ambient Background Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        </footer>
    );
};

export default Footer;
