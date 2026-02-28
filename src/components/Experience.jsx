import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, CheckCircle2, MapPin, ArrowUpRight } from 'lucide-react';

const ExperienceCard = ({ exp, index, isLast }) => {
    return (
        <div className="relative pl-12 md:pl-20 pb-16 last:pb-0">
            {/* Timeline Line Connector */}
            {!isLast && (
                <div className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-1 bg-highlight/5 rounded-full"></div>
            )}

            {/* Connection Node */}
            <div className="absolute top-1 left-0 w-6 md:w-8 h-6 md:h-8 rounded-full bg-white border-4 border-accent z-20 group transition-transform duration-500 hover:scale-125 ring-8 ring-accent/5">
                <div className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-20"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
            >
                <div className="p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-white shadow-2xl shadow-accent/5 border border-transparent hover:border-accent/20 transition-all duration-500 relative overflow-hidden">
                    {/* Background Accent Gradient */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors duration-700"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                        <div className="flex items-center gap-4 md:gap-6">
                            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${exp.isEducation ? 'bg-blue-500/10 text-blue-500' : 'bg-accent/10 text-accent'} transition-all duration-500 group-hover:bg-accent group-hover:text-white group-hover:rotate-6`}>
                                {exp.isEducation ? <GraduationCap size={22} className="md:size-[28px]" /> : <Briefcase size={22} className="md:size-[28px]" />}
                            </div>
                            <div>
                                <h3 className="text-xl md:text-3xl font-black mb-1 group-hover:text-gradient transition-all duration-300">
                                    {exp.role}
                                </h3>
                                <div className="flex items-center gap-2 text-highlight/60 font-bold text-xs md:text-sm">
                                    <MapPin size={12} className="text-accent/60" />
                                    {exp.company}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-0 shrink-0">
                            <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-highlight/30 mb-1">Timeline</span>
                            <div className="inline-flex items-center gap-2 text-highlight font-black text-[9px] md:text-xs bg-primary/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 uppercase tracking-tighter shadow-inner">
                                <Calendar size={10} className="text-accent" /> {exp.duration}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                        <ul className="space-y-3 md:space-y-4">
                            {exp.points.map((point, pIdx) => (
                                <li key={pIdx} className="flex gap-3 md:gap-4 text-sm md:text-base text-highlight/60 leading-relaxed font-medium transition-colors group-hover:text-highlight/80">
                                    <CheckCircle2 size={16} className="text-accent/30 mt-1 shrink-0 group-hover:text-accent transition-colors duration-300" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="relative h-full min-h-[100px] md:min-h-[120px] rounded-2xl md:rounded-3xl bg-primary/10 border border-white/20 p-5 md:p-6 flex flex-col justify-center overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 text-accent/10">
                                {exp.isEducation ? <GraduationCap size={60} className="md:size-[80px]" /> : <Briefcase size={60} className="md:size-[80px]" />}
                            </div>
                            <h4 className="text-[9px] md:text-xs font-black uppercase tracking-[0.2em] text-accent mb-2">Core Focus</h4>
                            <p className="text-highlight/50 text-xs md:text-sm font-bold italic z-10 max-w-[80%] md:max-w-full">
                                {exp.isEducation
                                    ? "Building foundational expertise in computer science."
                                    : "Applying MERN stack expertise to enterprise challenges."}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const allRecords = [
        {
            role: "Full Stack Developer Intern",
            company: "Infolexus Solutions, Coimbatore",
            duration: "Nov 2025 – Feb 2026",
            points: [
                "Worked on enterprise HRM and corporate web portal development using the full MERN stack.",
                "Contributed to dynamic API development, integrating real-time features using Socket.IO.",
                "Assisted in continuous deployment and infrastructure setup using Render and Netlify platforms."
            ]
        },
        {
            role: "MERN Stack Developer Intern",
            company: "KGiSL MicroCollege",
            duration: "May 2025 – Nov 2025",
            points: [
                "Engineered and successfully deployed three full-stack MERN applications from scratch.",
                "Implemented robust JWT authentication and RESTful APIs, securing operations for 100+ active users.",
                "Automated CI/CD deployment pipelines, reducing manual deployment effort by 40%."
            ]
        },
        {
            role: "B.E. Computer Science",
            company: "PPG Institute of Technology",
            duration: "2021 – 2025",
            points: [
                "Achieved a CGPA of 7.6/10.",
                "Focused on Software Engineering, Data Structures, and Cloud Computing principles."
            ],
            isEducation: true
        }
    ];

    return (
        <section id="experience" className="py-16 md:py-24 relative overflow-hidden bg-white/50" ref={containerRef}>
            {/* Background Decorations */}
            <div className="bg-gradient-shapes">
                <div className="shape-1 opacity-10"></div>
                <div className="shape-2 opacity-10"></div>
            </div>

            <div className="main-container relative z-10">
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center px-4">
                    <motion.span
                        className="text-accent font-black tracking-[0.3em] md:tracking-[0.5em] uppercase text-[9px] md:text-[10px] mb-4"
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
                        viewport={{ once: true }}
                    >
                        My Professional Story
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-8xl font-black mb-6 md:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Success <span className="text-gradient">Timeline</span>
                    </motion.h2>
                    <motion.div
                        className="w-20 md:w-40 h-2 md:h-3 bg-gradient-to-r from-[#0B4619] to-[#A3E635] mt-2 rounded-full shadow-2xl shadow-accent/40"
                        initial={{ width: 0 }}
                        whileInView={{ width: 160 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    ></motion.div>
                </div>

                <div className="max-w-5xl mx-auto relative">
                    {/* Animated Scroll Progress Bar (Main Track) */}
                    <div className="absolute left-[11px] md:left-[15px] top-6 bottom-0 w-1 bg-highlight/5 rounded-full overflow-hidden">
                        <motion.div
                            style={{ scaleY }}
                            className="w-full h-full bg-gradient-to-b from-[#0B4619] via-[#50C878] to-[#A3E635] origin-top"
                        />
                    </div>

                    <div className="relative">
                        {allRecords.map((item, idx) => (
                            <ExperienceCard
                                key={idx}
                                exp={item}
                                index={idx}
                                isLast={idx === allRecords.length - 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
