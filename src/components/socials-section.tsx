
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function SocialsSection() {
  return (
    <section id="socials" className="h-screen w-full flex flex-col justify-center items-center text-center bg-black">
      <div className="p-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Connect</h2>
        <p className="text-lg text-muted-foreground mb-8">Find me on social media or drop me a line.</p>
        <div className="flex justify-center gap-4 mb-12">
          <Button variant="outline" size="icon" asChild className="rounded-full h-14 w-14 hover:bg-accent">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="rounded-full h-14 w-14 hover:bg-accent">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild className="rounded-full h-14 w-14 hover:bg-accent">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <Twitter className="h-6 w-6" />
            </a>
          </Button>
        </div>
        <footer className="text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Dsh Mahi. All Rights Reserved.</p>
        </footer>
      </div>
    </section>
  );
}
