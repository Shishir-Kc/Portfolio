"use client";

import React from "react";
import Image from "next/image";
import { FloatingDockDemo } from '@/components/FloatingDockDemo';
import { TechStack } from '@/components/TechStack';
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { Contact } from "@/components/Contact";
import { HobbyPreloader } from "@/components/HobbyPreloader";




// --- 3. SPOTLIGHT BENTO CARD ---
// This card lights up specifically where your mouse hovers over it
import { SpotlightCard } from "@/components/SpotlightCard";

import { Spotlight } from "@/components/Spotlight";

// --- Main Page ---

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden">

      {/* Feature 1: Cinematic Grain */}
      <GrainOverlay />

      {/* Feature 2: Global Mouse Glow (Tracks cursor across the whole page) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* This is a subtle global ambient light following cursor, different from the component spotlight */}
        <MouseGlow />
      </div>

      {/* Spotlight Effect (Top) */}
      {/* Spotlight Effect (Top) */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      </div>

      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col-reverse lg:flex-row min-h-screen items-center justify-center px-6 md:px-12 lg:px-24 gap-12 pt-20 lg:pt-0">

        <div className="flex-1 max-w-2xl text-center lg:text-left space-y-8">


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            Hi, I&apos;m <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-600">
              Shishir Khatri.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Hi, I&apos;m Shishir, a developer who loves building things that live on
            the internet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-8 font-medium text-neutral-200 transition-all duration-300 hover:bg-neutral-900 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2 hover:ring-offset-black"
            >
              <span className="mr-2">See my work</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
            <div className="flex gap-4">
              <Github className="h-6 w-6 text-neutral-500 hover:text-white transition-colors cursor-pointer hover:scale-110" />
              <Linkedin className="h-6 w-6 text-neutral-500 hover:text-white transition-colors cursor-pointer hover:scale-110" />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center relative"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shadow-indigo-500/20">
            <Image
              src="/image/mrkc.jpeg"
              alt="Shishir Kc"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 py-20 border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm font-medium text-neutral-500 mb-8 uppercase tracking-widest">Powered By</p>
          <TechStack />
        </div>
      </section>

      {/* Feature 3: Upgraded Interactive Bento Grid */}
      <section id="projects" className="relative z-10 py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          Selected Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SpotlightCard
            title="Sky"
            status="Active"
            description="Ever wondered could you live 2 lives simlautaneously ? worry no more sky can be your digital persona and much more ! ."
            tags={["Python", "TensorFlow", "NLP", "Lang-Chan", "Django", "DRF"]}
            className="md:col-span-2"
            delay={0.1}
          />
          <SpotlightCard
            title="Atom"
            status="Completed"
            description="A Completely Wlan based Chat Application , just cli with custom custom encription algorithm. encripted end to end messages ."
            tags={["Python", "IoT", "Socket", "Encryption"]}
            className=""
            delay={0.2}
          />
          <SpotlightCard
            title="Smart dusbin"
            status="Completed"
            description="Why to open the lid of the dustbin manually when you can do it automatically using an ultrasonic sensor and servo motor."
            tags={["Ardunio", "Sensors", "Servo Motor", "C++"]}
            className=""
            delay={0.3}
          />
          <SpotlightCard
            title="Jax"
            status="Completed"
            description="Bored of forcefully watching an Ad ? Worry no more jax is your solution with live music stream with friends and without ads. !"
            tags={["Django", "DRF", "Django - webSocket"]}
            className="md:col-span-2"
            delay={0.4}
          />
          <SpotlightCard
            title="X"
            status="Completed"
            description="Ever wanted to controll your laptop with out using keyboard and mouse ? X is your solution with hand gesture recognition and voice commands."
            tags={["Python", "Socket"]}
            className=""
            delay={0.5}
          />
          <SpotlightCard
            title="Ghost"
            status="Completed"
            description="Ever wanted to controll your laptop with out using keyboard and mouse ? Ghost is your solution with AI Automation."
            tags={["Python", "Socket"]}
            className=""
            delay={0.6}
          />
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Floating Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <FloatingDockDemo />
      </div>
      <HobbyPreloader />
    </main>
  );
}