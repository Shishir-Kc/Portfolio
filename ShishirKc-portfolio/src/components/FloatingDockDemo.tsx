"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
} from "@tabler/icons-react";

// ⛑ Dynamically import the Lottie Player to avoid SSR issues
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export function FloatingDockDemo() {
  // 1. Create a specific ref for the User animation
  const userRef = useRef<any>(null);
  const githubRef = useRef<any>(null);

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "About Me",
      icon: (
        <div
          // 2. Trigger animation on hover of this specific container
          onMouseEnter={() => userRef.current?.play()}
          onMouseLeave={() => userRef.current?.stop()}
          className="flex items-center justify-center w-full h-full"
        >
          <Player
            // @ts-ignore
            ref={userRef}
            src="/icons/user.json" // Your specific file path
            className="h-full w-full"
            autoplay={false} // Ensure it doesn't play automatically
            loop
          />
        </div>
      ),
      href: "/about",
    },
    {
      title: "Contact",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/#contact",
    },
    {
      title: "GitHub",
      icon: (
        <div
          onMouseEnter={() => githubRef.current?.play()}
          onMouseLeave={() => githubRef.current?.stop()}
          className="flex items-center justify-center w-full h-full"
        >
          <Player
            // @ts-ignore
            ref={githubRef}
            src="/icons/github.json"
            className="w-full h-full"
            autoplay={false}
            loop
          />
        </div>
      ),
      href: "https://github.com",
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 dark">
      <FloatingDock items={links} />
    </div>
  );
}