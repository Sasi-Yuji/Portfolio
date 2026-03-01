import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ scrolled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const navLinks = [
        { id: 'hero', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'skills', label: 'Skills' },
        { id: 'experience', label: 'Experience' },
        { id: 'projects', label: 'Projects' },
        { id: 'contact', label: 'Contact' },
    ];

    const handleNavClick = (id) => {
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const top = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled
                    ? 'py-4 bg-primary/95 backdrop-blur-lg border-b border-highlight/10 shadow-sm'
                    : 'py-6 bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
            >
                <div className="main-container flex justify-between items-center relative">
                    <motion.a
                        href="#hero"
                        className="text-2xl font-black text-gradient"
                        whileHover={{ scale: 1.05 }}
                    >
                        {'<'}Sasi{' />'}
                    </motion.a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-8 items-center">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        className="text-highlight/80 hover:text-accent font-semibold tracking-wide transition-colors cursor-pointer group relative"
                                        onClick={() => handleNavClick(link.id)}
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0B4619] to-[#A3E635] transition-all duration-300 group-hover:w-full"></span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleNavClick('contact')}
                            className="bg-gradient-to-r from-[#0B4619] to-[#A3E635] text-white px-8 py-2.5 rounded-full hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 font-bold text-sm tracking-wider"
                        >
                            Hire Me
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-highlight hover:text-accent p-2 transition-colors relative z-[110]"
                        onClick={toggleMenu}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Dropdown - Moved OUTSIDE of nav to fix containing block issue */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 bg-primary/98 backdrop-blur-3xl flex flex-col items-center justify-center z-[200]"
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Static Background Logo in Menu */}
                        <div className="absolute top-8 left-8">
                            <span className="text-2xl font-black text-gradient">{'<'}Sasi{' />'}</span>
                        </div>

                        {/* Close button inside the overlay itself to be absolutely sure it's accessible */}
                        <button
                            onClick={toggleMenu}
                            className="absolute top-8 right-8 text-highlight p-2"
                        >
                            <X size={32} />
                        </button>

                        <ul className="flex flex-col items-center gap-6">
                            {navLinks.map((link, index) => (
                                <motion.li
                                    key={link.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.05 }}
                                >
                                    <button
                                        className="text-4xl font-black text-highlight/90 hover:text-accent transition-colors"
                                        onClick={() => handleNavClick(link.id)}
                                    >
                                        {link.label}
                                    </button>
                                </motion.li>
                            ))}
                            <motion.li
                                className="mt-8"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <button
                                    className="bg-gradient-to-r from-[#0B4619] to-[#A3E635] text-white px-12 py-4 rounded-full font-black text-xl shadow-xl shadow-accent/20"
                                    onClick={() => handleNavClick('contact')}
                                >
                                    Hire Me
                                </button>
                            </motion.li>
                        </ul>

                        {/* Bottom decorative elements for the menu */}
                        <div className="absolute bottom-12 flex gap-6 text-highlight/40 font-black tracking-widest text-[10px] uppercase">
                            <span>MERN Specialist</span>
                            <span className="w-1 h-1 rounded-full bg-accent mt-1"></span>
                            <span>Portfolio 2024</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
