import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
// Using FormSubmit.co for zero-backend, zero-config email delivery

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
    const [emailError, setEmailError] = useState('');

    const validateEmailDomain = (email) => {
        if (!email) return '';
        const atIndex = email.indexOf('@');
        if (atIndex === -1) return '';

        const domainPart = email.substring(atIndex + 1).toLowerCase();

        if (/\d/.test(domainPart)) return "Domain cannot contain numbers";
        if (domainPart === 'sagmail.com') return "Invalid domain. Did you mean gmail.com?";

        if (domainPart.includes('.')) {
            const parts = domainPart.split('.');
            const domainName = parts[0];
            const tld = parts[1];

            if (domainName && domainName.includes('gmail') && domainName !== 'gmail') {
                return "Did you mean gmail.com?";
            }
            if (domainName && tld && (!/^[a-zA-Z]+$/.test(domainName) || !/^[a-zA-Z]{2,}$/.test(tld))) {
                return "Please enter a valid domain";
            }
        }
        return '';
    };

    const contactInfo = [
        { icon: <Mail size={22} />, title: 'Email', value: 'kumarsasi9081@gmail.com', href: 'mailto:kumarsasi9081@gmail.com' },
        { icon: <Phone size={22} />, title: 'Phone', value: '+91 9566726011', href: 'tel:+919566726011' },
        { icon: <MapPin size={22} />, title: 'Location', value: 'Coimbatore, India', href: null },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            const filteredValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 20);
            setFormData({ ...formData, [name]: filteredValue });
        } else if (name === 'email') {
            const slicedValue = value.slice(0, 25);
            setFormData({ ...formData, [name]: slicedValue });
            setEmailError(validateEmailDomain(slicedValue));
        } else if (name === 'subject') {
            setFormData({ ...formData, [name]: value.slice(0, 25) });
        } else if (name === 'message') {
            setFormData({ ...formData, [name]: value.slice(0, 250) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const isFormValid = formData.name.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.subject.trim() !== '' &&
        formData.message.trim() !== '' &&
        formData.email.includes('@') &&
        formData.email.includes('.') &&
        emailError === '';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        setStatus('sending');

        try {
            const response = await fetch("https://formsubmit.co/ajax/kumarsasi9081@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    "Full Name": formData.name,
                    "Email Address": formData.email,
                    "Subject": formData.subject,
                    "Message": formData.message,
                    "_subject": `New Portfolio Message: ${formData.subject}`,
                    "_template": "table",
                    "_captcha": "false"
                })
            });

            const result = await response.json();

            if (result.success === "true") {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-secondary/10">
            <div className="main-container relative z-10">
                <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
                    <motion.span
                        className="text-accent font-black tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Communication
                    </motion.span>
                    <motion.h2
                        className="text-4xl md:text-6xl font-black"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Get In <span className="text-gradient">Touch</span>
                    </motion.h2>
                    <motion.div
                        className="w-20 md:w-32 h-2 bg-gradient-to-r from-[#0B4619] to-[#A3E635] mt-6 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 80 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
                    {/* Left Column: Contact Text & Info */}
                    <motion.div
                        className="lg:col-span-5 flex flex-col space-y-10 md:space-y-16"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl md:text-4xl font-black mb-6 flex flex-col md:flex-row items-center lg:items-start md:items-center gap-4 tracking-tighter">
                                <div className="p-3 rounded-2xl bg-accent text-white shadow-lg shadow-accent/20">
                                    <MessageSquare size={24} />
                                </div>
                                <span className="mt-2 md:mt-0">Let's Discuss Solutions</span>
                            </h3>
                            <p className="text-highlight/60 text-base md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                                I'm ready to bring my MERN expertise to your next big idea.
                                Whether it's a corporate portal or a custom HRM, I build for scale.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 md:gap-8">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    className="flex flex-col lg:flex-row items-center lg:items-start gap-4 md:gap-6 group"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-white shadow-xl shadow-accent/5 border border-accent/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                        {info.icon}
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <p className="text-[10px] font-black text-highlight/30 uppercase tracking-[0.2em] mb-1">{info.title}</p>
                                        {info.href ? (
                                            <a href={info.href} className="text-sm md:text-lg font-black text-highlight group-hover:text-accent transition-colors break-all md:break-normal px-4 md:px-0">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="text-sm md:text-lg font-black text-highlight">{info.value}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        className="lg:col-span-7 w-full"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="p-6 md:p-12 rounded-[2.5rem] bg-white relative group overflow-hidden shadow-2xl shadow-accent/5 border border-transparent hover:border-accent/10 transition-all duration-300">
                            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-[#0B4619] to-[#A3E635]"></div>

                            <form className="space-y-5 md:space-y-8" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-highlight/70 uppercase tracking-wider ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Sasikumar"
                                            maxLength={20}
                                            className="w-full bg-primary/20 text-highlight font-bold border border-accent/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/40 focus:ring-8 ring-accent/5 transition-all text-sm md:text-base placeholder:text-highlight/50 placeholder:font-normal"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-highlight/70 uppercase tracking-wider ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="sasi@example.com"
                                            maxLength={25}
                                            className={`w-full bg-primary/20 text-highlight font-bold border ${emailError ? 'border-red-500 focus:border-red-500 ring-red-500/20' : 'border-accent/10 focus:border-accent/40 ring-accent/5'} rounded-2xl px-6 py-4 outline-none focus:ring-8 transition-all text-sm md:text-base placeholder:text-highlight/50 placeholder:font-normal`}
                                            required
                                        />
                                        {emailError && (
                                            <p className="text-red-500 text-xs font-bold ml-2 mt-1 animate-pulse">{emailError}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center ml-1 mt-2">
                                        <label className="text-sm font-black text-highlight/70 uppercase tracking-wider">Subject</label>
                                        <span className="text-[10px] text-highlight/40 font-bold mr-2">{formData.subject.length}/25</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Opportunity Details"
                                        maxLength={25}
                                        className="w-full bg-primary/20 text-highlight font-bold border border-accent/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/40 focus:ring-8 ring-accent/5 transition-all text-sm md:text-base placeholder:text-highlight/50 placeholder:font-normal"
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center ml-1 mt-2">
                                        <label className="text-sm font-black text-highlight/70 uppercase tracking-wider">Your Message</label>
                                        <span className="text-[10px] text-highlight/40 font-bold mr-2">{formData.message.length}/250</span>
                                    </div>
                                    <textarea
                                        rows="5"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Let me know how I can help..."
                                        maxLength={250}
                                        className="w-full bg-primary/20 text-highlight font-bold border border-accent/10 rounded-2xl px-6 py-4 outline-none focus:border-accent/40 focus:ring-8 ring-accent/5 transition-all resize-none text-sm md:text-base placeholder:text-highlight/30 placeholder:opacity-[0.35] placeholder:font-normal"
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending' || !isFormValid}
                                    className={`w-full py-4 md:py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center justify-center gap-3 transition-all duration-300 ${status === 'sending' || !isFormValid
                                            ? 'bg-accent/20 text-accent/50 cursor-not-allowed'
                                            : 'bg-accent text-white hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-accent/40 active:translate-y-0'
                                        }`}
                                >
                                    {status === 'sending' ? (
                                        <>Deploying Message... <Loader2 className="animate-spin" size={18} /></>
                                    ) : (
                                        <>Execute Transmission <Send size={18} /></>
                                    )}
                                </button>
                            </form>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-20"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent mb-6">
                                            <CheckCircle2 size={48} />
                                        </div>
                                        <h4 className="text-3xl font-black text-highlight mb-2">Message Delivered!</h4>
                                        <p className="text-highlight/60 font-bold">Successfully transmitted to Sasikumar's inbox.</p>
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-20"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 mb-6">
                                            <AlertCircle size={48} />
                                        </div>
                                        <h4 className="text-3xl font-black text-highlight mb-2">Transmission Failed</h4>
                                        <p className="text-highlight/60 font-bold">Please check your network or try again later.</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-6 text-accent font-black uppercase tracking-widest text-xs"
                                        >
                                            Return to Form
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
