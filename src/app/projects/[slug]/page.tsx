import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { initialProjects } from '@/lib/projects';
import ProjectShowcase from '@/components/project-showcase';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import GlobalLightToggle from '@/components/global-light-toggle';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return initialProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = initialProjects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = initialProjects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="relative px-4 sm:px-6 lg:px-8 py-24 animate-fade-in">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex justify-end">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase text-muted-foreground">Project</p>
          <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
          <p className="text-lg text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <ProjectShowcase project={project} showHeader={false} />

        <div className="space-y-3">
          <p className="text-sm font-bold uppercase text-muted-foreground">Tech stack</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="capitalize">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <GlobalLightToggle />
    </main>
  );
}

