"use client";

import React, { useState, useEffect } from "react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { Spotlight } from "@/components/Spotlight";
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readingTime: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    try {
      const cached = localStorage.getItem('vox_diurna_posts');
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate cached posts on mount
      if (cached) setPosts(JSON.parse(cached));
    } catch {
      // ignore corrupt cache
    }

    fetch('https://vox-diurna-backend-n0nw.onrender.com/api/v1/posts')
      .then(async (res) => {
        if (!res.ok) {
          console.warn(`API responded with status: ${res.status}. Using cached data if available.`);
          return;
        }
        const data: Post[] = await res.json();
        setPosts(data);
        localStorage.setItem('vox_diurna_posts', JSON.stringify(data));
      })
      .catch(err => {
        console.warn('Network error or fetch failed. Using cached data if available.', err);
      });
  }, []);

  const projects = [
    {
      name: "Vox_Diurna",
      description: "A platform for uploading daily blogs to the internet via a custom blog server.",
      github: "https://github.com/Shishir-Kc/Vox_Diurna",
      live: "https://vox-diurna.pages.dev/"
    },
    {
      name: "Hyper.backend",
      description: "Backend for internal tool to be used by my team members.",
      github: "https://github.com/Krypton-learn/Hyper.backend"
    },
    {
      name: "Aris",
      description: "A prototype operating system built from scratch.",
      github: "https://github.com/Shishir-Kc/Aris"
    },
    {
      name: "Extractro",
      description: "An OCR-based tool that extracts text from various sources with high accuracy.",
      github: "https://github.com/Shishir-Kc/extractro"
    }
  ];

  return (
    <main className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden">

      {/* Background Features */}
      <GrainOverlay />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MouseGlow />
      </div>
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      </div>

      <div className="fixed inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
        >
          Hi, I am <span className="text-neutral-500">Shishir Khatri</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-neutral-400 mb-12"
        >
          based in Nepal
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-neutral-200">The Story</h2>
              <p className="text-neutral-400 leading-relaxed text-lg">
                I&apos;m a developer who loves building things that live on the internet.
                I&apos;ve been coding for a while now, and I&apos;m always looking for new
                challenges.
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
                  <h3 className="text-xl font-medium text-white">CEO & Co-founder</h3>
                  <p className="text-sm text-neutral-500 mb-2">Arcademia • 2026 - Present</p>
                  <p className="text-neutral-400">Leading the vision and overall strategy of Arcademia.</p>
                </div>
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

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-neutral-200">Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div key={project.name} className="group p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-800/30 transition-all hover:border-neutral-700">
                    <h3 className="text-lg font-medium text-white mb-2 leading-none">{project.name}</h3>
                    <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 hover:text-white transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Source
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-medium text-cyan-500 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-neutral-200">Recent Posts</h2>
              <div className="space-y-4">
                {posts.length > 0 ? posts.map((post) => (
                  <a
                    key={post.id}
                    href={`https://vox-diurna.pages.dev/blog/${post.slug}/${post.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-800/30 transition-all hover:border-neutral-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-medium text-white line-clamp-1">{post.title}</h3>
                      <span className="text-xs text-neutral-500 whitespace-nowrap ml-4">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-neutral-500 font-semibold">
                      <span className="px-2 py-0.5 rounded-full border border-neutral-800 bg-neutral-800/50 text-neutral-400">
                        {post.category}
                      </span>
                      <span>{post.readingTime}</span>
                    </div>
                  </a>
                )) : (
                  <div className="p-8 text-center rounded-xl border border-dashed border-neutral-800 text-neutral-500">
                    Loading latest posts...
                  </div>
                )}
              </div>
            </motion.section>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <section>
              <h2 className="text-xl font-semibold mb-6 text-neutral-200">Connect</h2>
              <ul className="space-y-4">
                <li>
                  <a href="https://github.com/Shishir-Kc" className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                    <Github className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-medium">GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/shishir-khatri-3bb3b1376" className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-medium">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:kc.dev.py@gmail.com" className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-medium">Email</span>
                  </a>
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-6 text-neutral-200">Links</h2>
              <ul className="space-y-4">
                <li>
                  <a href="https://arcademia.pages.dev/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-medium">Arcademia</span>
                  </a>
                  <a href="https://vox-diurna.pages.dev/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-neutral-400 hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="text-lg font-medium">Vox Diurna</span>
                  </a>
                </li>
              </ul>
            </section>
          </motion.div>
        </div>
      </div>
    </main>
  );
}