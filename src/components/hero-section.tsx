
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { personalizeGreeting, type PersonalizeGreetingOutput } from '@/ai/flows/personalize-greeting';
import { ArrowDown, Loader2 } from 'lucide-react';

interface HeroSectionProps {
  onPersonalize: (interests: string) => Promise<void>;
  isPersonalizing: boolean;
}

export default function HeroSection({ onPersonalize, isPersonalizing }: HeroSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const [greeting, setGreeting] = useState<PersonalizeGreetingOutput | null>(null);
  const [isGreetingLoading, setIsGreetingLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !interests) return;
    
    setIsGreetingLoading(true);
    try {
      const greetingPromise = personalizeGreeting({ name, interests });
      const projectsPromise = onPersonalize(interests);
      
      const [greetingResponse] = await Promise.all([greetingPromise, projectsPromise]);
      setGreeting(greetingResponse);

    } catch(error) {
      console.error("Failed to get personalization:", error);
    } finally {
      setIsGreetingLoading(false);
      setDialogOpen(false);
    }
  };

  return (
    <section id="hero" className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden">
      <div className="z-10 p-4">
        {greeting ? (
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in max-w-4xl mx-auto font-display">{greeting.greeting}</h1>
        ) : (
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 font-display">Dsh Mahi</h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-8">still exploring what i am good at</p>
          </div>
        )}
        <Button onClick={() => setDialogOpen(true)} size="lg" className="rounded-full mt-4">
          Personalize Experience ✨
        </Button>
      </div>
      <a href="#projects" aria-label="Scroll to projects" className="absolute bottom-10 z-10 animate-bounce">
        <ArrowDown className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors" />
      </a>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Personalize Your Visit</DialogTitle>
            <DialogDescription>
              Tell us a bit about yourself to tailor the content to your interests.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interests">Interests</Label>
                <Input id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., UI/UX, AI, Web3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isGreetingLoading || isPersonalizing}>
                {(isGreetingLoading || isPersonalizing) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Personalize
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
