"use client";
import LogoLoop from '@/components/ui/LogoLoop';
import { SiMongodb, SiPostgresql, SiDocker, SiPython, SiRedis, SiMysql, SiFastapi, SiLangchain, SiSupabase, SiDjango } from 'react-icons/si';

export function TechStack() {
  const techLogos = [
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
    { node: <SiPython />, title: "Python", href: "https://www.python.org" },
    { node: <SiRedis />, title: "Redis", href: "https://redis.io" },
    { node: <SiMysql />, title: "SQL", href: "https://www.mysql.com" },
    { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
    { node: <SiLangchain />, title: "LangChain", href: "https://www.langchain.com" },
    { node: <SiSupabase />, title: "Vector DB", href: "https://supabase.com/vector" },
    { node: <SiDjango />, title: "Django", href: "https://www.djangoproject.com" },
  ];

  return (
    <div className="w-full py-16">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Technologies I Work With</h2>
      <div style={{ height: '120px', position: 'relative', overflow: 'hidden' }}>
        <LogoLoop
          logos={techLogos}
          speed={50}
          direction="left"
          logoHeight={48}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Technology stack"
        />
      </div>
    </div>
  );
}