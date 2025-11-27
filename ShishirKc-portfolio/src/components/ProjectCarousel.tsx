"use client";
import { useState, useRef, useEffect } from 'react';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiFirebase, SiStripe } from 'react-icons/si';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory and payment processing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tech: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Stripe', icon: <SiStripe /> },
      { name: 'MongoDB', icon: <SiMongodb /> }
    ],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics platform with beautiful data visualizations.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tech: [
      { name: 'React', icon: <SiReact /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Node.js', icon: <SiNodedotjs /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> }
    ],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    title: 'Mobile App Design',
    description: 'Beautiful mobile-first application with smooth animations.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    tech: [
      { name: 'React', icon: <SiReact /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> },
      { name: 'Firebase', icon: <SiFirebase /> }
    ],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    title: 'AI Chat Application',
    description: 'Intelligent chat application powered by AI with voice recognition.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    tech: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Node.js', icon: <SiNodedotjs /> }
    ],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    title: 'Task Management',
    description: 'Collaborative task management with drag-and-drop features.',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    tech: [
      { name: 'React', icon: <SiReact /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'TailwindCSS', icon: <SiTailwindcss /> }
    ],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    title: 'Social Platform',
    description: 'Modern social networking platform with real-time messaging.',
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop',
    tech: [
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'Node.js', icon: <SiNodedotjs /> }
    ],
    link: 'https://example.com',
    github: 'https://github.com'
  }
];

export function InfiniteProjectCarousel() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Triple the projects for seamless infinite loop
  const infiniteProjects = [...projects, ...projects, ...projects];

  // Continuous smooth scrolling
  useEffect(() => {
    const scroll = () => {
      if (!isPaused && !isDragging && scrollRef.current) {
        setScrollPosition((prev) => {
          const cardWidth = 420; // card width + gap
          const totalWidth = cardWidth * projects.length;
          const newPosition = prev + 1.5; // Scroll speed (pixels per frame)

          // Reset when we've scrolled through one set
          if (newPosition >= totalWidth) {
            scrollRef.current!.scrollLeft = 0;
            return 0;
          }

          scrollRef.current!.scrollLeft = newPosition;
          return newPosition;
        });
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, isDragging]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsPaused(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
    setScrollPosition(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-scroll after 2 seconds
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  const handleMouseLeaveContainer = () => {
    if (isDragging) {
      setIsDragging(false);
      // Resume auto-scroll after 2 seconds
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      pauseTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 2000);
    }
  };

  // Wheel scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    setIsPaused(true);
    scrollRef.current.scrollLeft += e.deltaY;
    setScrollPosition(scrollRef.current.scrollLeft);

    // Resume auto-scroll after 2 seconds of no wheel activity
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsPaused(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    setScrollPosition(scrollRef.current.scrollLeft);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-lg text-neutral-400 text-center max-w-2xl mx-auto">
          Hover to pause • Drag or scroll to navigate
        </p>
      </div>

      <div className="relative">
        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className={`flex gap-8 overflow-x-hidden scrollbar-hide px-4 md:px-8 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          style={{
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeaveContainer}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {infiniteProjects.map((project, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[400px] select-none"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="relative h-[550px] rounded-2xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm transition-all duration-300"
                style={{
                  transform: hoveredIndex === index
                    ? 'scale(1.05) translateY(-10px)'
                    : 'scale(1)',
                  opacity: hoveredIndex === index ? 1 : 0.85,
                }}
              >
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                  }}
                  draggable={false}
                />

                {/* Default Gradient Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-300"
                  style={{ opacity: hoveredIndex === index ? 0 : 1 }}
                />

                {/* Title (shown when not hovering) */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300"
                  style={{ opacity: hoveredIndex === index ? 0 : 1 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                </div>

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity duration-300 pointer-events-none"
                  style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    pointerEvents: hoveredIndex === index ? 'auto' : 'none'
                  }}
                >
                  <div className="h-full flex flex-col justify-between p-8">
                    {/* Top section */}
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <p className="text-xs text-neutral-400 mb-4 uppercase tracking-wider font-semibold">
                        Technologies Used
                      </p>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {project.tech.map((tech, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-colors duration-200"
                          >
                            <span className="text-white text-lg">
                              {tech.icon}
                            </span>
                            <span className="text-sm text-white font-medium">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-semibold text-sm text-center hover:bg-neutral-200 transition-all duration-200 hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Live →
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-6 py-3 bg-white/10 text-white rounded-xl font-semibold text-sm text-center hover:bg-white/20 transition-all duration-200 border border-white/20 hover:scale-105"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center mt-8">
          <div className={`px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs flex items-center gap-2 transition-all duration-300 ${isPaused ? 'opacity-100 scale-105' : 'opacity-50'
            }`}>
            {isPaused ? (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
                Paused
              </>
            ) : (
              <>
                <div className="w-3 h-3 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
                Scrolling
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}