import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Code, Server, Layout, Database, Terminal, Cpu, ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';

const Counter = ({ value, label }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        const num = parseFloat(value);
        if (value.includes('.')) {
            return latest.toFixed(1);
        }
        return Math.floor(latest);
    });

    useEffect(() => {
        if (inView) {
            const num = parseFloat(value);
            animate(count, num, { duration: 2, ease: "easeOut" });
        }
    }, [inView, count, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center w-32 h-32 rounded-full glass border-2 border-accent/10 shadow-xl shadow-accent/5 hover:border-accent/40 transition-colors duration-500 group"
        >
            <div className="text-2xl font-black text-gradient flex items-baseline">
                <motion.span>{rounded}</motion.span>
                {value.includes('+') && <span>+</span>}
            </div>
            <p className="text-[10px] text-highlight/60 uppercase tracking-widest font-bold group-hover:text-highlight transition-colors">{label}</p>
        </motion.div>
    );
};

const About = () => {
    const services = [
        {
            icon: <Layout className="w-8 h-8" />,
            title: "Frontend Development",
            description: "Building responsive, high-performance user interfaces with React, Next.js, and Tailwind CSS."
        },
        {
            icon: <Server className="w-8 h-8" />,
            title: "Backend Engineering",
            description: "Designing scalable server-side architectures using Node.js, Express, and specialized API optimizations."
        },
        {
            icon: <Database className="w-8 h-8" />,
            title: "Database Solutions",
            description: "Expertise in SQL and NoSQL databases like MongoDB, ensuring data integrity and fast retrievals."
        },
        {
            icon: <Terminal className="w-8 h-8" />,
            title: "DevOps & Deployment",
            description: "Managing CI/CD pipelines, cloud deployments on Netlify/Vercel, and ensuring system stability."
        }
    ];

    const stats = [
        { label: "CGPA", value: "7.6" },
        { label: "Projects", value: "8+" },
        { label: "Experience", value: "0" } // Changed from Fresher to show counter
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="about" className="py-24 relative overflow-hidden bg-secondary/20">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="main-container relative z-10">
                <div className="flex flex-col items-center mb-20">
                    <motion.span
                        className="text-accent font-black tracking-[0.3em] uppercase text-xs mb-4"
                        initial={{ opacity: 0, tracking: "0.1em" }}
                        whileInView={{ opacity: 1, tracking: "0.3em" }}
                        viewport={{ once: true }}
                    >
                        Who I Am
                    </motion.span>
                    <motion.h2
                        className="text-5xl md:text-6xl font-black text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        About <span className="text-gradient">Me</span>
                    </motion.h2>
                    <motion.div
                        className="w-24 h-2 bg-gradient-to-r from-[#0B4619] to-[#A3E635] mt-6 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    {/* Left Column: Text & Stats */}
                    <motion.div
                        className="lg:col-span-5"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-8 flex items-center gap-4 text-highlight">
                            <div className="p-3 rounded-2xl bg-accent text-white shadow-xl shadow-accent/20">
                                <Cpu size={32} />
                            </div>
                            The Mind Behind the Code
                        </h3>
                        <p className="text-highlight/80 text-xl leading-[1.8] mb-8 font-medium">
                            I'm a passionate Full-Stack Developer currently pursuing my B.E. in
                            Computer Science at Anna University. My journey is fueled by a
                            curiosity for how complex systems work and a drive to build tools
                            that solve real-world problems.
                        </p>
                        <p className="text-highlight/70 text-lg leading-[1.8] mb-12">
                            I specialize in the MERN stack (MongoDB, Express, React, Node.js),
                            focusing on creating seamless bridges between intuitive design and
                            powerful back-end logic. I believe in writing <span className="text-highlight font-bold italic">clean, maintainable code</span> that scales.
                        </p>

                        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                            {stats.map((stat, index) => (
                                <Counter key={index} value={stat.value} label={stat.label === "Experience" ? "Fresher" : stat.label} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Services Cards */}
                    <motion.div
                        className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {services.map((service, index) => (
                            <Tilt
                                key={index}
                                tiltMaxAngleX={10}
                                tiltMaxAngleY={10}
                                scale={1.05}
                                transitionSpeed={1500}
                                className="h-full"
                            >
                                <motion.div
                                    variants={itemVariants}
                                    className="h-full p-10 rounded-[2.5rem] bg-white shadow-2xl shadow-accent/5 border border-transparent hover:border-accent/20 transition-all duration-500 group relative overflow-hidden"
                                >
                                    <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/5 rounded-full group-hover:bg-accent/10 transition-colors duration-700"></div>

                                    <motion.div
                                        className="w-20 h-20 rounded-[1.5rem] bg-accent/10 flex items-center justify-center text-accent mb-8 group-hover:bg-gradient-to-br group-hover:from-[#0B4619] group-hover:to-[#A3E635] group-hover:text-white transition-all duration-500 shadow-inner"
                                        whileHover={{ y: -5, rotate: 5 }}
                                    >
                                        {React.cloneElement(service.icon, { className: "w-10 h-10 group-hover:animate-bounce" })}
                                    </motion.div>

                                    <h4 className="text-2xl font-bold mb-4 group-hover:text-gradient transition-colors duration-300">
                                        {service.title}
                                    </h4>
                                    <p className="text-highlight/60 text-base leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-500">
                                        Learn More <ArrowRight size={16} />
                                    </div>
                                </motion.div>
                            </Tilt>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

