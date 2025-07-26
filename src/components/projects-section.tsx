
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import type { Project } from '../app/page';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSpotlight } from '@/hooks/use-spotlight';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from './ui/dialog';

const ProjectCard = ({ project, index, isIlluminated, onPlayVideo }: { project: Project, index: number, isIlluminated: boolean, onPlayVideo: (url: string) => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { spotlightStyle, maskStyle } = useSpotlight(cardRef);
  const isYoutubeVideo = project.projectUrl.includes('youtube.com');

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isYoutubeVideo) {
      e.preventDefault();
      onPlayVideo(project.projectUrl);
    }
  };

  return (
    <Card 
      ref={cardRef}
      key={project.id} 
      className="group flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/10 animate-fade-in bg-card/30 backdrop-blur-lg rounded-2xl relative border border-white/10" 
      style={{ animationDelay: `${index * 100}ms`}}
    >
       <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={spotlightStyle}
      />
      <div 
        className="relative z-10 transition-all duration-300 h-full flex flex-col"
        style={!isIlluminated ? maskStyle : {}}
      >
        <CardContent className="flex-grow p-6 pt-6 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <Badge key={tag} variant={tag === 'Work In Progress' ? 'destructive' : 'secondary'} className="capitalize">{tag}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 bg-muted rounded-full" />
            <div>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <a href={project.projectUrl} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">
                {project.siteUrl}
              </a>
            </div>
          </div>
          <CardDescription className="mb-4 flex-grow">{project.description}</CardDescription>
          
          <div className="flex flex-wrap items-center gap-3 mt-auto pt-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <Badge key={tech} variant="outline" className="capitalize">{tech}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};


export default function ProjectsSection({ projects, isIlluminated }: { projects: Project[], isIlluminated: boolean }) {
  const clientProjects = projects.filter(p => p.category === 'Client');
  const personalProjects = projects.filter(p => p.category === 'Personal');
  const [activeTab, setActiveTab] = useState('personal');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const { spotlightStyle: headerSpotlight, maskStyle: headerMask } = useSpotlight(headerRef);

  const handlePlayVideo = (url: string) => {
    const embedUrl = getYouTubeEmbedUrl(url);
    if(embedUrl) {
      setVideoUrl(embedUrl);
    }
  }

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get('v');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch (error) {
      console.error("Invalid YouTube URL", error);
      return null;
    }
  };

  return (
    <section id="projects" className="min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div ref={headerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative">
             <div 
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
              style={headerSpotlight}
            />
            <div 
              className="md:col-span-2 transition-all duration-300 p-4"
              style={!isIlluminated ? headerMask : {}}
            >
                <p className="text-sm font-bold uppercase text-muted-foreground mb-2">Projects</p>
                {activeTab === 'personal' ? (
                  <>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">My Digital Playground</h2>
                    <p className="text-lg text-muted-foreground">Here’s what happens when I have too much screen time. I build stuff. Some of it even works. Take a look!</p>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Brands I've Worked With</h2>
                    <p className="text-lg text-muted-foreground">I've had the pleasure of collaborating with some amazing companies. Here's a glimpse of our work.</p>
                  </>
                )}
            </div>
            <div className="flex items-start justify-start md:justify-end">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                <TabsList className="grid w-full grid-cols-2 md:w-auto bg-card/70 backdrop-blur-sm">
                    <TabsTrigger value="personal">Personal ({personalProjects.length})</TabsTrigger>
                    <TabsTrigger value="client">Client ({clientProjects.length})</TabsTrigger>
                </TabsList>
                </Tabs>
            </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="personal">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {personalProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} isIlluminated={isIlluminated} onPlayVideo={handlePlayVideo} />
              ))}
            </div>
            {personalProjects.length === 0 && (
              <div className="text-center col-span-full py-12">
                <p className="text-muted-foreground">No personal projects to show yet.</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="client">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {clientProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} isIlluminated={isIlluminated} onPlayVideo={handlePlayVideo} />
              ))}
            </div>
             {clientProjects.length === 0 && (
              <div className="text-center col-span-full py-12">
                <p className="text-muted-foreground">No client projects to show yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

       <Dialog open={!!videoUrl} onOpenChange={(isOpen) => !isOpen && setVideoUrl(null)}>
        <DialogContent className="max-w-3xl h-auto p-0 border-0 bg-black">
          {videoUrl && (
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`${videoUrl}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

