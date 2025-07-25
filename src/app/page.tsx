
"use client";

import { useState } from 'react';
import { adjustContent, type AdjustContentOutput } from '@/ai/flows/adjust-content-relevancy';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import SocialsSection from '@/components/socials-section';
import Nav from '@/components/nav';
import AboutSection from '@/components/about-section';

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
    { id: 1, title: 'Aetheria', description: 'Making it easy to get into the daily self-care rituals of everyone. We\'re on a mission to make every moment of your skincare and bodycare experience fun, fragrant, and joyous, all while embracing honest beauty formula and transparency from the inside out.', category: 'Client', techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity'], projectUrl: '#', siteUrl: 'aetheriaselfcare.com', tags: ['E-commerce', 'Client'] },
    { id: 2, title: 'Dohora', description: 'Dohora, founded in 2020, is a women-led fragrance brand celebrating individuality through scent. From rich orientals to elegant florals and sweet gourmands, each fragrance is crafted to evoke emotion.', category: 'Client', techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity'], projectUrl: '#', siteUrl: 'dohoralifestyle.com', tags: ['E-commerce', 'Client'] },
    { id: 3, title: 'Inads Group', description: 'Inads Group is a Media & Advertising company from Qatar that offers a wide range of services to help businesses grow and succeed. I created a modern, professional website that showcases their expertise and services.', category: 'Client', techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'], projectUrl: '#', siteUrl: 'inadsgroup.com', tags: ['Business Website', 'Client'] },
    { id: 4, title: 'NordCycle', description: 'ACE specializes in recycling hard-to-recycle plastics, turning waste into sustainable materials through innovative technology and eco-friendly processes. We give new life to plastics that would otherwise pollute the environment.', category: 'Client', techStack: ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Vercel'], projectUrl: '#', siteUrl: 'nordcycle.com', tags: ['Business Website', 'Client', 'Work In Progress'] },
    { id: 5, title: 'Task Management App', description: 'A React-based task management tool with drag-and-drop functionality.', category: 'Personal', techStack: ['React', 'Redux', 'Node.js', 'MongoDB'], projectUrl: '#', siteUrl: "task-manager.com", tags: ['Web App', 'Personal'] },
    { id: 6, title: 'Weather Dashboard', description: 'A web app that displays real-time weather data from a third-party API.', category: 'Personal', techStack: ['Vue.js', 'OpenWeatherMap API', 'Chart.js'], projectUrl: '#', siteUrl: "weather-app.com", tags: ['Web App', 'Personal'] },
  ];


export default function Home() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isPersonalizing, setIsPersonalizing] = useState(false);

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

  return (
    <main className="relative">
      <Nav />
      <HeroSection onPersonalize={handlePersonalizeProjects} isPersonalizing={isPersonalizing} />
      <AboutSection />
      <ProjectsSection projects={projects} />
      <SocialsSection />
    </main>
  );
}
