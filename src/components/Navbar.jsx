import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ scrolled }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

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

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 bg-primary flex items-center justify-center z-[105]"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <ul className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    <button
                                        className="text-3xl font-bold text-highlight/80 hover:text-accent transition-colors"
                                        onClick={() => handleNavClick(link.id)}
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                            <li className="mt-4">
                                <button
                                    className="bg-accent text-white px-10 py-4 rounded-full font-bold text-xl"
                                    onClick={() => handleNavClick('contact')}
                                >
                                    Hire Me
                                </button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
