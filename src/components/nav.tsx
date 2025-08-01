import { Button } from '@/components/ui/button';

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 bg-transparent">
      <div className="flex justify-center items-center p-1 rounded-full bg-background/50 backdrop-blur-sm border border-accent">
        <nav className="flex gap-1">
          <Button variant="ghost" asChild className="rounded-full px-4 py-1 h-auto text-sm">
            <a href="#hero">Home</a>
          </Button>
          <Button variant="ghost" asChild className="rounded-full px-4 py-1 h-auto text-sm">
            <a href="#projects">Projects</a>
          </Button>
          <Button variant="ghost" asChild className="rounded-full px-4 py-1 h-auto text-sm">
            <a href="#socials">Connect</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
