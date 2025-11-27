"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

export const Contact = () => {
    return (
        <section id="contact" className="relative z-10 py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-bold mb-8"
                >
                    Let's work together.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-neutral-400 mb-12 max-w-2xl mx-auto"
                >
                    I'm currently available for freelance projects and open to full-time opportunities.
                    If you have a project that needs some creative touch, or just want to say hi, feel free to reach out!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <a
                        href="mailto:hello@example.com"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-neutral-200 transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                        <span>hello@example.com</span>
                    </a>

                    <div className="flex gap-4">
                        <a href="#" className="p-4 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-4 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-4 bg-neutral-900 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
