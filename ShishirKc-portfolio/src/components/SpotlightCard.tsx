"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const SpotlightCard = ({ title, description, className, delay, status, tags }: { title: string, description: string, className?: string, delay: number, status?: string, tags?: string[] }) => {
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

            <div className="relative h-full p-6 flex flex-col h-full">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-white">{title}</h3>
                    {status && (
                        <span className={cn(
                            "px-2 py-1 text-xs rounded-full border",
                            status === "Active"
                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                : "bg-neutral-800 text-neutral-400 border-neutral-700"
                        )}>
                            {status}
                        </span>
                    )}
                </div>

                <p className="text-sm text-neutral-400 mb-6 flex-grow">{description}</p>

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 rounded-md bg-neutral-800/50 text-neutral-300 border border-neutral-800"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
