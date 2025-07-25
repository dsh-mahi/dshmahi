
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import type { Project } from '../app/page';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectCard = ({ project, index }: { project: Project, index: number }) => (
  <Card key={project.id} className="flex flex-col overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/10 border-accent animate-fade-in" style={{ animationDelay: `${index * 100}ms`}}>
    <CardHeader className="p-6">
      <Badge variant="secondary" className="mb-3 w-fit">{project.category}</Badge>
      <CardTitle>{project.title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-grow p-6 pt-0">
      <CardDescription>{project.description}</CardDescription>
      <div className="mt-4">
        <h4 className="font-semibold text-sm text-foreground mb-2">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>
      </div>
    </CardContent>
    <CardFooter className="p-6 pt-0">
      <Button asChild variant="link" className="p-0 text-foreground hover:text-primary">
        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
          View Project <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </CardFooter>
  </Card>
);

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const clientProjects = projects.filter(p => p.category === 'Client');
  const personalProjects = projects.filter(p => p.category === 'Personal');

  return (
    <section id="projects" className="min-h-screen w-full py-24 px-4 sm:px-6 lg:px-8 bg-background flex flex-col items-center justify-center">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">My Work</h2>
        <p className="text-lg text-muted-foreground">A selection of my client and personal projects.</p>
      </div>

      <div className="max-w-7xl mx-auto w-full">
        {clientProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">Client Projects</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {clientProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}

        {personalProjects.length > 0 && (
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">Personal Projects</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {personalProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
