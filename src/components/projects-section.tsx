
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import type { Project } from '../app/page';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-background flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My Work</h2>
        <p className="text-lg text-muted-foreground mb-12">A selection of my client and personal projects.</p>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={project.id} className="flex flex-col overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/10 border-accent animate-fade-in" style={{ animationDelay: `${index * 100}ms`}}>
            <CardHeader className="p-0">
              <div className="aspect-video relative">
                <Image src={project.imageUrl} alt={project.title} fill className="object-cover rounded-t-lg" data-ai-hint={project.aiHint} />
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
              <Badge variant="secondary" className="mb-3">{project.category}</Badge>
              <CardTitle className="mb-2">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button asChild variant="link" className="p-0 text-foreground hover:text-primary">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  View Project <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
