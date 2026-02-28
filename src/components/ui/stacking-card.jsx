'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { ExternalLink, Github, Folder, Code2, ArrowRight } from 'lucide-react';

export const Card = ({
    i,
    title,
    description,
    url,
    color,
    progress,
    range,
    targetScale,
    techStack,
    githubLink,
    liveLink,
}) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <div
            ref={container}
            className='h-screen flex items-center justify-center sticky top-0 px-4 md:px-6'
        >
            <motion.div
                style={{
                    backgroundColor: color,
                    scale,
                    top: `calc(-5vh + ${i * (window.innerWidth < 768 ? 20 : 35)}px)`,
                }}
                className={`flex flex-col relative -top-[10%] md:-top-[20%] h-[600px] md:h-[500px] w-full max-w-[900px] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 origin-top shadow-2xl border border-white/10 overflow-hidden`}
            >
                <div className="flex justify-between items-start mb-4 md:mb-8">
                    <h2 className='text-2xl md:text-4xl font-black text-white tracking-tight pr-4'>{title}</h2>
                    <div className="flex gap-2 md:gap-4 shrink-0">
                        <a href={githubLink} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all" aria-label="GitHub">
                            <Github size={20} className="md:size-[24px]" />
                        </a>
                        <a href={liveLink} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all" aria-label="Live Demo">
                            <ExternalLink size={20} className="md:size-[24px]" />
                        </a>
                    </div>
                </div>

                <div className={`flex flex-col md:flex-row h-full gap-6 md:gap-12 relative z-10`}>
                    <div className={`w-full md:w-[45%] flex flex-col justify-between py-2 md:py-4`}>
                        <div>
                            <p className='text-sm md:text-lg text-white/80 leading-relaxed mb-4 md:mb-8 line-clamp-4 md:line-clamp-none'>{description}</p>
                            <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
                                {techStack?.map((tech, idx) => (
                                    <span key={idx} className="px-3 md:px-4 py-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest bg-white/10 text-white rounded-full border border-white/20">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <a
                            href={liveLink}
                            target='_blank'
                            className='inline-flex items-center gap-4 text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-sm group'
                        >
                            See Project Case <ArrowRight size={18} className="md:size-[20px] group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>

                    <div
                        className={`relative w-full md:w-[55%] h-48 md:h-full rounded-xl md:rounded-2xl overflow-hidden shadow-inner border border-white/10 group order-first md:order-none`}
                    >
                        <motion.div
                            className={`w-full h-full`}
                            style={{ scale: imageScale }}
                        >
                            <img src={url} alt={title} className='absolute inset-0 w-full h-full object-cover transition-opacity duration-700' />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StackingCards = forwardRef(({ projects }, ref) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    return (
        <ReactLenis root>
            <div className='bg-primary/5' ref={container}>
                <section className='w-full pt-32 pb-16'>
                    <div className="main-container flex flex-col items-center">
                        <motion.span
                            className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Masterpieces
                        </motion.span>
                        <motion.h2
                            className="text-6xl md:text-7xl font-black mb-8 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Featured <span className="text-gradient">Projects</span>
                        </motion.h2>
                        <motion.p
                            className="max-w-2xl text-highlight/60 text-xl text-center leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            A collection of high-performance web applications,
                            pixel-perfect front-ends, and robust back-end systems.
                        </motion.p>
                    </div>
                </section>

                <section className='w-full'>
                    {projects.map((project, i) => {
                        const targetScale = 1 - (projects.length - i) * 0.05;
                        return (
                            <Card
                                key={`p_${i}`}
                                i={i}
                                url={project.link}
                                title={project.title}
                                color={project.color}
                                description={project.description}
                                techStack={project.techStack}
                                githubLink={project.githubLink}
                                liveLink={project.liveLink}
                                progress={scrollYProgress}
                                range={[i * (1 / projects.length), 1]}
                                targetScale={targetScale}
                            />
                        );
                    })}
                </section>

                <footer className='py-40 bg-transparent flex flex-col items-center justify-center overflow-hidden'>
                    <motion.h1
                        className='text-[18vw] leading-none uppercase font-black text-center text-highlight/5 select-none pointer-events-none'
                        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
                    >
                        SASIKUMAR
                    </motion.h1>
                    <div className='mt-20 text-highlight/40 font-black tracking-widest uppercase text-sm'>
                        Scroll up to explore again
                    </div>
                </footer>
            </div>
        </ReactLenis>
    );
});

StackingCards.displayName = 'StackingCards';

export default StackingCards;
