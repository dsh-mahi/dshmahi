
"use client";

import { useState } from 'react';
import { adjustContent, type AdjustContentOutput } from '@/ai/flows/adjust-content-relevancy';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import SocialsSection from '@/components/socials-section';
import Nav from '@/components/nav';
import { cn } from '@/lib/utils';
import MusicPlayer from '@/components/music-player';


export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'Client' | 'Personal';
  techStack: string[];
  projectUrl: string;
  siteUrl: string;
  tags: string[];
}

const initialProjects: Project[] = [
    { id: 1, title: 'Aetheria', description: 'Making it easy to get into the daily self-care rituals of everyone. We\'re on a mission to make every moment of your skincare and bodycare experience fun, fragrant, and joyous, all while embracing honest beauty formula and transparency from the inside out.', category: 'Personal', techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity'], projectUrl: '#', siteUrl: 'aetheriaselfcare.com', tags: ['E-commerce', 'Personal'] },
    { id: 2, title: 'Dohora', description: 'Dohora, founded in 2020, is a women-led fragrance brand celebrating individuality through scent. From rich orientals to elegant florals and sweet gourmands, each fragrance is crafted to evoke emotion.', category: 'Personal', techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity'], projectUrl: '#', siteUrl: 'dohoralifestyle.com', tags: ['E-commerce', 'Personal'] },
    { id: 3, title: 'Inads Group', description: 'Inads Group is a Media & Advertising company from Qatar that offers a wide range of services to help businesses grow and succeed. I created a modern, professional website that showcases their expertise and services.', category: 'Personal', techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], projectUrl: '#', siteUrl: 'inadsgroup.com', tags: ['Business Website', 'Personal'] },
    { id: 4, title: 'NordCycle', description: 'ACE specializes in recycling hard-to-recycle plastics, turning waste into sustainable materials through innovative technology and eco-friendly processes. We give new life to plastics that would otherwise pollute the environment.', category: 'Personal', techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Vercel'], projectUrl: '#', siteUrl: 'nordcycle.com', tags: ['Business Website', 'Personal', 'Work In Progress'] },
  ];


export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [isIlluminated, setIsIlluminated] = useState(false);

  const handlePersonalizeProjects = async (interests: string) => {
    if (!interests) return;
    setIsPersonalizing(true);
    try {
      const projectContents = initialProjects.map(p => `${p.title}: ${p.description}`);
      const response: AdjustContentOutput = await adjustContent({
        userInterests: interests,
        contentList: projectContents,
      });
      
      const sortedProjects = response.adjustedContentList.map(content => {
        const title = content.split(':')[0];
        return initialProjects.find(p => p.title === title);
      }).filter((p): p is Project => p !== undefined);

      if(sortedProjects.length > 0) {
        setProjects(sortedProjects);
      }
    } catch (error) {
      console.error("Failed to personalize projects:", error);
    } finally {
      setIsPersonalizing(false);
    }
  };

  const toggleLight = () => {
    if (!isIlluminated) {
      setIsIlluminated(true);
    }
  }

  return (
    <main className="relative">
      <Nav />
      <MusicPlayer onToggle={toggleLight} />
      <HeroSection onPersonalize={handlePersonalizeProjects} isPersonalizing={isPersonalizing} />
      <div className={cn("transition-opacity duration-1000 ease-in-out", isIlluminated ? "opacity-100" : "opacity-0")}>
        <ProjectsSection projects={projects} />
        <SocialsSection />
      </div>
      <footer className="text-center text-muted-foreground py-8 px-4">
        <p>&copy; {new Date().getFullYear()} Dsh Mahi. All Rights Reserved.</p>
        <p className="text-xs mt-2">Crafted by human and ai minds.</p>
      </footer>
    </main>
  );
}
