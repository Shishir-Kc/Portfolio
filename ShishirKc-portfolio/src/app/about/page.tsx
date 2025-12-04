"use client";
import React from 'react';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { FloatingDockDemo } from '@/components/FloatingDockDemo';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';


export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden">
      <GrainOverlay />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MouseGlow />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-12 tracking-tight"
        >
          About <span className="text-neutral-500">Me</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-neutral-200">The Story</h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                I'm a +2 Science student from Nepal with a strong passion for software, automation, and AI. Even during my early academic journey, I've created full-stack web apps, built AI assistants, and dived into IoT projects with microcontrollers like ESP32. I love to explore tech, break limits, and build things that feel like the future.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-neutral-200">Experience</h2>
              <div className="space-y-6">
                <div className="border-l-2 border-neutral-800 pl-6 relative">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-neutral-800 border-2 border-black" />
                  <h3 className="text-xl font-medium text-white">Full Stack Developer</h3>
                  <p className="text-sm text-neutral-500 mb-2">Shree Rastrya Mavi School • 2025 - Present</p>
                  <p className="text-neutral-400">Building web application for School with various features.</p>
                </div>
                <div className="border-l-2 border-neutral-800 pl-6 relative">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-neutral-800 border-2 border-black" />
                  <h3 className="text-xl font-medium text-white">Learning Phase</h3>
                  <p className="text-sm text-neutral-500 mb-2">Self-taught • 2022 - Present</p>
                  <p className="text-neutral-400">Learning and building projects to improve my skills.</p>
                </div>
              </div>
            </motion.section>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <section>
              <h2 className="text-xl font-semibold mb-4 text-neutral-200">Connect</h2>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <a href="https://github.com/Shishir-Kc" className="hover:text-white transition-colors flex items-center gap-2">
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/shishir-khatri-3bb3b1376" className="hover:text-white transition-colors flex items-center gap-2">
                    <Linkedin className="w-5 h-5" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:kc.dev.py@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-neutral-200">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['Django', 'FastAPI', 'Docker', 'SQL', 'PostgreSQL', 'Redis'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <FloatingDockDemo />
      </div>
    </main>
  );
}
