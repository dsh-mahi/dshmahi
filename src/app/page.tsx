
"use client";

import { useState } from 'react';
import { adjustContent, type AdjustContentOutput } from '@/ai/flows/adjust-content-relevancy';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import SocialsSection from '@/components/socials-section';
import Nav from '@/components/nav';

export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'Client' | 'Personal';
  imageUrl: string;
  projectUrl: string;
  aiHint: string;
}

const initialProjects: Project[] = [
  { id: 1, title: 'E-commerce Platform', description: 'A full-stack e-commerce website with payment integration and a custom CMS.', category: 'Client', imageUrl: 'https://placehold.co/600x400', projectUrl: '#', aiHint: 'online store' },
  { id: 2, title: 'Portfolio Website', description: 'A sleek, modern portfolio for a freelance photographer, focusing on visuals.', category: 'Client', imageUrl: 'https://placehold.co/600x400', projectUrl: '#', aiHint: 'photography portfolio' },
  { id: 3, title: 'Task Management App', description: 'A React-based task management tool with drag-and-drop functionality.', category: 'Personal', imageUrl: 'https://placehold.co/600x400', projectUrl: '#', aiHint: 'productivity app' },
  { id: 4, title: 'Weather Dashboard', description: 'A web app that displays real-time weather data from a third-party API.', category: 'Personal', imageUrl: 'https://placehold.co/600x400', projectUrl: '#', aiHint: 'weather forecast' },
  { id: 5, title: 'Music Player UI', description: 'A UI/UX concept for a minimalist music player application.', category: 'Personal', imageUrl: 'https://placehold.co/600x400', projectUrl: '#', aiHint: 'music app' },
  { id: 6, title: 'Booking System', description: 'A reservation system for a local restaurant, built with Next.js and Firebase.', category: 'Client', imageUrl: 'https://placehold.co/600x400', projectUrl: '#', aiHint: 'reservation system' },
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
      <ProjectsSection projects={projects} />
      <SocialsSection />
    </main>
  );
}
