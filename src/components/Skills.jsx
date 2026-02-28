import React from 'react';
import { motion } from 'framer-motion';
import {
    Layout,
    Server,
    Terminal,
    Code2,
    Database,
    Cpu,
    Globe,
    Zap,
    CloudLightning,
    GitBranch,
    Radio,
    RefreshCw,
    Cloud,
    Kanban,
    Layers,
    Atom,
    FileJson,
    FileCode,
    Smartphone
} from 'lucide-react';
import { CardStack } from './ui/card-stack';

const Skills = () => {
    const skillCategories = [
        {
            id: 1,
            title: "Frontend Development",
            description: "Crafting immersive, pixel-perfect user interfaces with modern frameworks and cutting-edge design patterns.",
            icon: <Layout className="w-8 h-8" />,
            skills: [
                { name: "React.js", icon: <Atom className="w-4 h-4" /> },
                { name: "JavaScript", icon: <FileJson className="w-4 h-4" /> },
                { name: "Tailwind CSS", icon: <Layers className="w-4 h-4" /> },
                { name: "Redux", icon: <Zap className="w-4 h-4" /> },
                { name: "HTML/CSS", icon: <FileCode className="w-4 h-4" /> },
                { name: "Responsive Design", icon: <Smartphone className="w-4 h-4" /> }
            ]
        },
        {
            id: 2,
            title: "Backend Engineering",
            description: "Building resilient, high-performance server architectures and optimizing complex data flows.",
            icon: <Server className="w-8 h-8" />,
            skills: [
                { name: "Node.js", icon: <Zap className="w-4 h-4" /> },
                { name: "Express.js", icon: <CloudLightning className="w-4 h-4" /> },
                { name: "MongoDB", icon: <Database className="w-4 h-4" /> },
                { name: "SQL", icon: <Database className="w-4 h-4" /> },
                { name: "REST APIs", icon: <Globe className="w-4 h-4" /> },
                { name: "Auth", icon: <Cpu className="w-4 h-4" /> }
            ]
        },
        {
            id: 3,
            title: "DevOps & Workflow",
            description: "Streamlining deployment pipelines and ensuring system reliability through modern infrastructure tools.",
            icon: <Terminal className="w-8 h-8" />,
            skills: [
                { name: "Git & GitHub", icon: <GitBranch className="w-4 h-4" /> },
                { name: "Socket.IO", icon: <Radio className="w-4 h-4" /> },
                { name: "CI/CD Actions", icon: <RefreshCw className="w-4 h-4" /> },
                { name: "Cloud Hosting", icon: <Cloud className="w-4 h-4" /> },
                { name: "Agile/Scrum", icon: <Kanban className="w-4 h-4" /> },
                { name: "Deployment", icon: <RefreshCw className="w-4 h-4" /> }
            ]
        }
    ];

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-primary/30">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="main-container relative z-10">
                <div className="flex flex-col items-center mb-16 text-center">
                    <motion.span
                        className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Capabilities
                    </motion.span>
                    <motion.h2
                        className="text-5xl md:text-6xl font-black mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Technical <span className="text-gradient">Toolkit</span>
                    </motion.h2>
                    <motion.p
                        className="max-w-2xl text-highlight/60 text-lg leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Swipe or click through the stack to explore my core competencies
                        across the full software development lifecycle.
                    </motion.p>
                </div>

                <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <CardStack
                        items={skillCategories}
                        cardWidth={600}
                        cardHeight={400}
                        autoAdvance={true}
                        intervalMs={4000}
                        maxVisible={3}
                        renderCard={(item, { active }) => (
                            <div className={`h-full w-full p-10 flex flex-col justify-between transition-all duration-500 ${active ? 'bg-white' : 'bg-white/90'}`}>
                                <div>
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className={`p-5 rounded-3xl bg-accent/10 text-accent transition-transform duration-500 ${active ? 'scale-110 rotate-3' : ''}`}>
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-highlight mb-1">{item.title}</h3>
                                            <div className="h-1.5 w-12 bg-accent rounded-full"></div>
                                        </div>
                                    </div>

                                    <p className="text-highlight/70 text-lg leading-relaxed mb-10 italic">
                                        "{item.description}"
                                    </p>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {item.skills.map((skill, idx) => (
                                            <motion.div
                                                key={idx}
                                                className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-accent/5 hover:border-accent/40 hover:bg-white hover:shadow-lg transition-all duration-300 group"
                                                whileHover={{ y: -5 }}
                                            >
                                                <div className="text-accent group-hover:scale-125 transition-transform duration-300">
                                                    {skill.icon}
                                                </div>
                                                <span className="text-sm font-bold text-highlight/80 group-hover:text-highlight truncate">{skill.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase text-highlight/30">
                                    <span>Core Compentency Stack</span>
                                    <span>MERN Developer</span>
                                </div>
                            </div>
                        )}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;

