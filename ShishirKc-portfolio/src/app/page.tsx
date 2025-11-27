"use client";

import React, { useEffect, useState, useRef } from "react";
import { FloatingDockDemo } from '@/components/FloatingDockDemo';
import { PixelatedCanvasDemo } from '@/components/PixelatedCanvasDemo';
import { TechStack } from '@/components/TechStack';
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { Contact } from "@/components/Contact";



// --- 3. SPOTLIGHT BENTO CARD ---
// This card lights up specifically where your mouse hovers over it
const SpotlightCard = ({ title, description, className, delay }: { title: string, description: string, className?: string, delay: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative border border-neutral-800 bg-neutral-900/50 overflow-hidden rounded-3xl",
        className
      )}
    >
      {/* Hover Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full p-6">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="flex h-full flex-col justify-between">
          <div className="h-32 w-full rounded-xl bg-gradient-to-br from-neutral-800 to-neutral-900 mb-4 border border-white/5 group-hover:scale-[1.02] transition-transform duration-500 shadow-xl" />
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="text-sm text-neutral-400 mt-1">{description}</p>
          </div>
          {/* <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
            View Project <ArrowUpRight className="h-3 w-3" />
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

const Spotlight = ({ className, fill = "white" }: { className?: string; fill?: string }) => {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1]  h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
};

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
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
      </div>
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col-reverse lg:flex-row min-h-screen items-center justify-center px-6 md:px-12 lg:px-24 gap-12 pt-20 lg:pt-0">

        <div className="flex-1 max-w-2xl text-center lg:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-neutral-300 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            Building <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-600">
              digital reality.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-neutral-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            I'm a Full Stack Developer & Designer crafting pixel-perfect experiences with modern technologies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-8 font-medium text-neutral-200 transition-all duration-300 hover:bg-neutral-900 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2 hover:ring-offset-black">
              <span className="mr-2">See my work</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </button>
            <div className="flex gap-4">
              <Github className="h-6 w-6 text-neutral-500 hover:text-white transition-colors cursor-pointer hover:scale-110" />
              <Twitter className="h-6 w-6 text-neutral-500 hover:text-white transition-colors cursor-pointer hover:scale-110" />
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
          <div className="relative z-10">
            <PixelatedCanvasDemo />
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
      <section className="relative z-10 py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-16 text-center"
        >
          Selected Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard
            title="E-Commerce Dashboard"
            description="A full-stack analytics platform with real-time data."
            className="md:col-span-2 md:row-span-2 min-h-[400px]"
            delay={0.1}
          />
          <SpotlightCard
            title="AI Image Generator"
            description="SaaS platform using Stable Diffusion."
            className="md:col-span-1"
            delay={0.2}
          />
          <SpotlightCard
            title="Finance App Mobile"
            description="React Native application for iOS/Android."
            className="md:col-span-1"
            delay={0.3}
          />
          <SpotlightCard
            title="Design System"
            description="Open source component library."
            className="md:col-span-3"
            delay={0.4}
          />
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Floating Dock */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <FloatingDockDemo />
      </div>
    </main>
  );
}