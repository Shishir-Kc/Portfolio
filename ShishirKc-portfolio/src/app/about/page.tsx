"use client";
import React from 'react';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { MouseGlow } from '@/components/ui/MouseGlow';
import { FloatingDockDemo } from '@/components/FloatingDockDemo';
import { motion } from 'framer-motion';

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
                I'm Shishir, a passionate Full Stack Developer with a knack for building immersive digital experiences.
                My journey began with a curiosity for how things work on the web, which quickly turned into a career
                crafting pixel-perfect applications.
              </p>
              <p className="text-neutral-400 leading-relaxed text-lg mt-4">
                I specialize in the JavaScript ecosystem, leveraging the power of React, Next.js, and Node.js to build
                scalable and performant web applications. I believe in the intersection of design and engineering,
                where code meets creativity.
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
                  <h3 className="text-xl font-medium text-white">Senior Frontend Developer</h3>
                  <p className="text-sm text-neutral-500 mb-2">Tech Corp • 2022 - Present</p>
                  <p className="text-neutral-400">Leading the frontend team in rebuilding the core product dashboard using Next.js and TypeScript.</p>
                </div>
                <div className="border-l-2 border-neutral-800 pl-6 relative">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-neutral-800 border-2 border-black" />
                  <h3 className="text-xl font-medium text-white">Full Stack Developer</h3>
                  <p className="text-sm text-neutral-500 mb-2">Creative Agency • 2020 - 2022</p>
                  <p className="text-neutral-400">Developed award-winning marketing sites and e-commerce platforms for global brands.</p>
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
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="mailto:hello@example.com" className="hover:text-white transition-colors">Email</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-neutral-200">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Three.js', 'PostgreSQL', 'AWS'].map((skill) => (
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
