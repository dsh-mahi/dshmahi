
"use client";

import { useState } from 'react';
import { adjustContent, type AdjustContentOutput } from '@/ai/flows/adjust-content-relevancy';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import SocialsSection from '@/components/socials-section';
import Nav from '@/components/nav';
import MusicPlayer from '@/components/music-player';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';


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
    { 
      id: 1, 
      title: 'Architectural Visualization Project', 
      description: 'Created a realistic architectural visualization and animation of a structural design using Unreal Engine. All 3D assets were sourced from Fab Lab. The project focused on lighting, camera movement, and immersive walkthroughs to convey design intent.', 
      category: 'Personal', 
      techStack: ['Unreal Engine', 'Premier Pro', '3ds Max', 'Adobe Media Encode'], 
      projectUrl: 'https://www.youtube.com/watch?v=Zt2Q7511Jzk', 
      siteUrl: 'youtube.com', 
      tags: ['Visualization', 'Animation', 'Personal'] 
    },
    { 
      id: 2, 
      title: 'Soda Can Commercial', 
      description: 'Produced a complete 3D commercial featuring an animated soda can. From UV-mapped textures to realistic lighting and smooth post-composition, the project blended multiple tools and disciplines for a dynamic product showcase.', 
      category: 'Personal', 
      techStack: ['Maya', 'Canva', 'V-Ray', 'After Effects', 'Premiere Pro', 'Adobe Media Encoder'], 
      projectUrl: 'https://www.youtube.com/watch?v=4Va01hofghA', 
      siteUrl: 'youtube.com', 
      tags: ['3D Animation', 'Motion Graphics', 'Personal'] 
    },
    { 
      id: 3, 
      title: 'MCT Landing Page (Enhanced)', 
      description: 'Created and Revamped the Multimedia and Creative Technology (MCT) department landing page by integrating an AI-powered chatbot using Botpress AI-powered voice assistance using Elevenlabs Conversational AI and immersive AR/VR features through Convai.', 
      category: 'Personal', 
      techStack: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Botpress', 'Elevenlabs', 'Convai', 'Unity'], 
      projectUrl: 'https://dsh-mahi.github.io/multimedia-and-creative-technology/', 
      siteUrl: 'dsh-mahi.github.io', 
      tags: ['Web Development', 'AI', 'Personal'] 
    },
    { 
      id: 4, 
      title: 'SEO Optimization – Sip Hygiene', 
      description: 'Achieved first-page rankings for multiple articles on a water bottle review website through strategic on-page SEO. Boosted article scores to 89–98/100 using keyword targeting, schema markup, and internal linking. Also optimized site performance to score 100/100 on mobile and 99/100 on desktop.', 
      category: 'Personal', 
      techStack: ['WordPress', 'Google PageSpeed Insights', 'Rank Math SEO', 'Schema Markup', 'Google Search Console'], 
      projectUrl: 'https://drive.google.com/drive/folders/1AHSyldN73no-VHW5nsB3XLgZv4jIwK2A?usp=sharing', 
      siteUrl: 'drive.google.com', 
      tags: ['SEO', 'Performance Tuning', 'Personal'] 
    },
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
    setIsIlluminated(prev => !prev);
  }

  return (
    <main className="relative">
      <Nav />
      <MusicPlayer onToggle={toggleLight} />
      <HeroSection onPersonalize={handlePersonalizeProjects} isPersonalizing={isPersonalizing} />

      {!isIlluminated && (
          <div className="text-center my-16 animate-fade-in px-4">
              <Lightbulb className="mx-auto h-8 w-8 text-yellow-300/50 mb-4" />
              <p className="text-muted-foreground max-w-md mx-auto">
                  It's a bit dark in here... Can you find the light switch?
                  <br/>
                  <span className="text-xs">Maybe the melody holds the key.</span>
              </p>
          </div>
      )}

      <div>
        <ProjectsSection projects={projects} isIlluminated={isIlluminated} />
        <SocialsSection isIlluminated={isIlluminated} />
      </div>

      <footer className="text-center text-muted-foreground py-8 px-4">
        <p>&copy; {new Date().getFullYear()} Dsh Mahi. All Rights Reserved.</p>
        <p className="text-xs mt-2">Crafted by human and ai minds.</p>
      </footer>
    </main>
  );
}
