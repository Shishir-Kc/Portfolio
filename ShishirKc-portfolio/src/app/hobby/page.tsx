"use client";

import React from "react";
import { Spotlight } from "@/components/Spotlight";
import { SpotlightCard } from "@/components/SpotlightCard";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { MouseGlow } from "@/components/ui/MouseGlow";
import { FloatingDockDemo } from "@/components/FloatingDockDemo";
import { motion } from "framer-motion";
import Spline from '@splinetool/react-spline/next';

export default function HobbyPage() {
    return (
        <main className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden">
            <GrainOverlay />
            <div className="fixed inset-0 z-0 pointer-events-none">
                <MouseGlow />
            </div>
            <div className="absolute top-0 left-0 w-full h-screen overflow-hidden pointer-events-none">
                <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
            </div>

            <div className="fixed inset-0 z-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-500 opacity-20 blur-[100px]"></div>
            </div>

            <section className="relative z-10 py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold mb-8 text-center"
                >
                    My Hobbies
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-neutral-400 text-center max-w-2xl mx-auto mb-16"
                >
                   I enjoy exploring new worlds, both real and virtual.
                </motion.p>

                {/* Coding Section: Visual Left, Text Right */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mb-20 md:mb-32">
                    <div className="flex-1 w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/50 relative">
                        <iframe
                            src='https://my.spline.design/macbookproblue-4EKvZBxHa81YBIg5T6uuafmU/'
                            frameBorder='0'
                            width='100%'
                            height='100%'
                            className="w-full h-full"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                            <p className="text-sm text-neutral-300">Coding & Development</p>
                        </div>
                    </div>
                    <div className="flex-1 space-y-6 text-left md:text-right">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-bold"
                        >
                            Coding
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 text-lg leading-relaxed space-y-4"
                        >
                            <p>
                                Coding is my creative outlet. I love the process of turning abstract ideas
                                into functional, interactive reality.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Reading Section: Text Left, Visual Right */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20 md:mb-32">
                    <div className="flex-1 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-bold"
                        >
                            Reading Books
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 text-lg leading-relaxed space-y-4"
                        >
                            <p>
                                Books allow me to explore new worlds and perspectives.
                                I particularly enjoy , which fuel my imagination.
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex-1 w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/50 relative">
                        <iframe
                            src='https://my.spline.design/artoffocusbook-lmY0jJgLJB82xUFpzzrEPjDq/'
                            frameBorder='0'
                            width='100%'
                            height='100%'
                            className="w-full h-full"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                            <p className="text-sm text-neutral-300">Sci-Fi & Fantasy</p>
                        </div>
                    </div>
                </div>

                {/* Exploring Section: Visual Left, Text Right */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mb-20 md:mb-32">
                    <div className="flex-1 w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/50 relative">
                        <iframe
                            src='https://my.spline.design/campfire-yA0hUG5XaE6v3UeoAYNJ9w6v/'
                            frameBorder='0'
                            width='100%'
                            height='100%'
                            className="w-full h-full"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                            <p className="text-sm text-neutral-300">Nature & Exploring</p>
                        </div>
                    </div>
                    <div className="flex-1 space-y-6 text-left md:text-right">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-bold"
                        >
                            Exploring
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 text-lg leading-relaxed space-y-4"
                        >
                            <p>
                                There's so much to see in the world. I enjoy hiking, traveling,
                                and finding hidden gems in nature.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Robot Section: Text Left, Model Right */}
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20 md:mb-32">
                    <div className="flex-1 space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-bold"
                        >
                            Things I Like
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 text-lg leading-relaxed space-y-4"
                        >
                            <p>
                                I've always been fascinated by the intersection of hardware and software.
                                Robotics represents the ultimate challenge in this space—bringing code to life
                                in the physical world.
                            </p>
                            <p>
                                From autonomous systems to humanoid concepts, the future of automation
                                is something I follow closely. I love tinkering with microcontrollers
                                and building small bots in my spare time.
                            </p>
                        </motion.div>
                    </div>
                    <div className="flex-1 w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/50 relative">
                        <iframe
                            src='https://my.spline.design/nexbotrobotcharacterconcept-9KoC22EYuI2vCtcLwOjIxSQG/'
                            frameBorder='0'
                            width='100%'
                            height='100%'
                            className="w-full h-full"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                            <p className="text-sm text-neutral-300">Robots & Automation</p>
                        </div>
                    </div>
                </div>

                {/* Sports Section: Model Left, Text Right */}
                <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
                    <div className="flex-1 w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/50 relative">
                        <iframe
                            src='https://my.spline.design/honoringredbullracing-5nFgGm20ucedapO4Ec5MwJLL/'
                            frameBorder='0'
                            width='100%'
                            height='100%'
                            className="w-full h-full"
                        ></iframe>
                        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 pointer-events-none">
                            <p className="text-sm text-neutral-300">Formula 1</p>
                        </div>
                    </div>
                    <div className="flex-1 space-y-6 text-left md:text-right">
                        <motion.h2
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-bold"
                        >
                            Sport I Like to Watch
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-neutral-400 text-lg leading-relaxed space-y-4"
                        >
                            <p>
                                Formula 1 is more than just racing; it's a high-speed chess match
                                played at 200mph. The engineering precision, strategy, and
                                sheer skill of the drivers are unmatched.
                            </p>
                            <p>
                                I'm a huge fan of Red Bull Racing. Watching the team push the
                                boundaries of aerodynamics and performance every race weekend
                                is incredibly inspiring for me as a developer who values optimization.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <FloatingDockDemo />
            </div>
        </main>
    );
}
