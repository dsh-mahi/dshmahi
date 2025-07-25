'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import type { Project } from '../app/page';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSpotlight } from '@/hooks/use-spotlight';

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { spotlightStyle } = useSpotlight(cardRef);

  return (
    <Card 
      ref={cardRef}
      key={project.id} 
      className="group flex flex-col overflow-hidden transform transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/10 animate-fade-in bg-black/50 backdrop-blur-lg rounded-2xl relative border border-white/10" 
      style={{ animationDelay: `${index * 100}ms`}}
    >
       <div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={spotlightStyle}
      />
      <div className="relative z-10">
        <CardContent className="flex-grow p-6 pt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <Badge key={tag} variant={tag === 'Work In Progress' ? 'destructive' : 'secondary'} className="capitalize">{tag}</Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 bg-muted rounded-full" />
            <div>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <a href={`https://${project.siteUrl}`} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline">
                {project.siteUrl}
              </a>
            </div>
          </div>
          <CardDescription className="mb-4">{project.description}</CardDescription>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map(tech => (
              <Badge key={tech} variant="outline" className="capitalize">{tech}</Badge>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};


export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const clientProjects = projects.filter(p => p.category === 'Client');
  const personalProjects = projects.filter(p => p.category === 'Personal');
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <section id="projects" className="min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-transparent flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
                <p className="text-sm font-bold uppercase text-muted-foreground mb-2">Projects</p>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Brands I've worked with</h2>
                <p className="text-lg text-muted-foreground">Here I flex about what I've done so far. Applause optional, gasping encouraged. Feel free to rant!</p>
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
                <ProjectCard key={project.id} project={project} index={index} />
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
                <ProjectCard key={project.id} project={project} index={index} />
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
    </section>
  );
}
