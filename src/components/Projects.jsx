import React from 'react';
import StackingCards from './ui/stacking-card';
import hrmImg from '../assets/HRM.png';
import infoImg from '../assets/info.png';
import ecommerceImg from '../assets/e-commerce.png';
import knowLawImg from '../assets/know law.png';
import budgetImg from '../assets/budget.png';

const Projects = () => {
    const projects = [
        {
            title: "Crewly – HRM System",
            description: "Enterprise-grade HRM with Role-Based Access Control and real-time Socket.IO modules for task tracking and leave management.",
            techStack: ["MERN", "Socket.IO", "RBAC", "Tailwind"],
            liveLink: "https://hrm-rykg.onrender.com",
            githubLink: "https://github.com/Sasi-Yuji",
            link: hrmImg,
            color: "#0B4619",
            featured: true
        },
        {
            title: "InfoLexus – Corporate Portal",
            description: "High-performance corporate web portal featuring complex Framer Motion animations and secure Nodemailer integrations.",
            techStack: ["React", "Express", "Framer Motion", "Multer"],
            liveLink: "https://infolexus.com/",
            githubLink: "https://github.com/Sasi-Yuji",
            link: infoImg,
            color: "#50C878",
            featured: true
        },
        {
            title: "Vintage E-Commerce",
            description: "Retro-themed full-stack shopping application with specialized Admin Dashboard and Redux state management.",
            techStack: ["React", "Redux", "Express", "MongoDB"],
            liveLink: "https://thunderous-beijinho-7dfd7b.netlify.app/",
            githubLink: "https://github.com/Sasi-Yuji",
            link: ecommerceImg,
            color: "#1B4332",
            featured: false
        },
        {
            title: "Know-Your-Laws",
            description: "Social impact platform providing simplified legal guidance for small businesses and common citizens.",
            techStack: ["MERN", "Responsive UI", "REST API"],
            liveLink: "https://sasikumar-know-your-laws.netlify.app/",
            githubLink: "https://github.com/Sasi-Yuji",
            link: knowLawImg,
            color: "#2D6A4F",
            featured: false
        },
        {
            title: "Budget Tracker",
            description: "Financial dashboard featuring transaction analytics, data visualization, and PDF export capabilities.",
            techStack: ["React", "Chart.js", "State Management"],
            liveLink: "#",
            githubLink: "https://github.com/Sasi-Yuji",
            link: budgetImg,
            color: "#40916C",
            featured: false
        }
    ];

    return (
        <section id="projects" className="bg-primary/5">
            <StackingCards projects={projects} />
        </section>
    );
};

export default Projects;

