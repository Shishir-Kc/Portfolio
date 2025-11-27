"use client";
import { useEffect, useState } from 'react';
import CircularGallery from '@/components/ui/CircularGallery';

const projects = [
  { 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', 
    text: 'E-Commerce Platform' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', 
    text: 'Analytics Dashboard' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop', 
    text: 'Mobile App Design' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop', 
    text: 'AI Chat Application' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop', 
    text: 'Task Management' 
  },
  { 
    image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&h=600&fit=crop', 
    text: 'Social Platform' 
  }
];

export function ProjectsGallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Featured Projects
          </h2>
          <p className="text-base text-neutral-400 text-center">
            Swipe to explore
          </p>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide px-4">
          <div className="flex gap-4 pb-4">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-[280px] rounded-xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm"
              >
                <div className="aspect-[3/4] relative">
                  <img 
                    src={project.image} 
                    alt={project.text}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-lg font-bold text-white">
                    {project.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-20">
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-lg text-neutral-400 text-center max-w-2xl mx-auto">
          Drag or scroll to explore my recent work
        </p>
      </div>
      
      <div style={{ height: '700px', position: 'relative' }}>
        <CircularGallery
          items={projects}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          font="bold 28px sans-serif"
          scrollSpeed={2}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}