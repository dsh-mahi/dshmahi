"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown, Loader2 } from "lucide-react";

interface HeroSectionProps {
  onPersonalize: (interests: string) => Promise<void>;
  onClearPersonalization: () => void;
  onPersonalizationMeta?: (meta: {
    interestsCsv: string;
    selectedInterests: string[];
    greeting: string;
  }) => void;
  isPersonalizing: boolean;
  hasPersonalization: boolean;
  availableInterests?: string[];
  initialSelectedInterests?: string[];
  initialGreeting?: string | null;
}

export default function HeroSection({
  onPersonalize,
  onClearPersonalization,
  onPersonalizationMeta,
  isPersonalizing,
  hasPersonalization,
  availableInterests = [],
  initialSelectedInterests = [],
  initialGreeting = null,
}: HeroSectionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialSelectedInterests,
  );
  const [greeting, setGreeting] = useState<{ greeting: string } | null>(
    initialGreeting ? { greeting: initialGreeting } : null,
  );
  const [isGreetingLoading, setIsGreetingLoading] = useState(false);

  useEffect(() => {
    if (initialGreeting && !greeting) {
      setGreeting({ greeting: initialGreeting });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialGreeting]);

  useEffect(() => {
    if (initialSelectedInterests.length > 0 && selectedInterests.length === 0) {
      setSelectedInterests(initialSelectedInterests);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelectedInterests]);

  const buildGreeting = (visitorName: string, visitorInterests: string[]) => {
    const topInterest = visitorInterests[0] ?? "creative work";
    return `Hey ${visitorName}, welcome in. I highlighted projects around ${topInterest} for you.`;
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || selectedInterests.length === 0) return;

    setIsGreetingLoading(true);
    try {
      const interestsCsv = selectedInterests.join(",");
      const nextGreeting = buildGreeting(name, selectedInterests);
      const projectsPromise = onPersonalize(interestsCsv);
      setGreeting({ greeting: nextGreeting });
      onPersonalizationMeta?.({
        interestsCsv,
        selectedInterests,
        greeting: nextGreeting,
      });
      await projectsPromise;
    } catch (error) {
      console.error("Failed to get personalization:", error);
    } finally {
      setIsGreetingLoading(false);
      setDialogOpen(false);
    }
  };

  const handleClear = () => {
    setGreeting(null);
    setSelectedInterests([]);
    onClearPersonalization();
  };

  return (
    <section
      id="hero"
      className="h-screen w-full flex flex-col justify-center items-center text-center relative overflow-hidden"
    >
      <div className="z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
        {greeting ? (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold md:font-bold mb-4 animate-fade-in leading-snug px-1">
            {greeting.greeting}
          </h1>
        ) : (
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-2">Dsh Mahi</h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-8">
              still exploring what i am good at
            </p>
          </div>
        )}
        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 max-w-md sm:max-w-none mx-auto">
          <Button
            onClick={() => setDialogOpen(true)}
            size="lg"
            className="rounded-full w-full sm:w-auto shrink-0 text-sm sm:text-base px-4 sm:px-8 whitespace-normal h-auto min-h-11 py-2.5"
          >
            <span className="sm:hidden">Personalize ✨</span>
            <span className="hidden sm:inline">Personalize Experience ✨</span>
          </Button>
          {hasPersonalization && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-full w-full sm:w-auto shrink-0 text-sm sm:text-base px-4 sm:px-8 whitespace-normal h-auto min-h-11 py-2.5"
              onClick={handleClear}
            >
              Clear personalization
            </Button>
          )}
        </div>
      </div>
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="absolute bottom-10 z-10 animate-bounce"
      >
        <ArrowDown className="h-8 w-8 text-muted-foreground hover:text-foreground transition-colors" />
      </a>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-[425px] w-[calc(100vw-2rem)]">
          <DialogHeader>
            <DialogTitle>Personalize Your Visit</DialogTitle>
            <DialogDescription>
              Tell us a bit about yourself to tailor the content to your
              interests.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Jane Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Select Interests</Label>
                <div className="flex flex-wrap gap-2">
                  {availableInterests.map((interest) => (
                    <Button
                      key={interest}
                      type="button"
                      variant={
                        selectedInterests.includes(interest)
                          ? "default"
                          : "outline"
                      }
                      className="rounded-full h-8 px-3 text-xs"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest}
                    </Button>
                  ))}
                </div>
                {selectedInterests.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {selectedInterests.join(", ")}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isGreetingLoading ||
                  isPersonalizing ||
                  selectedInterests.length === 0
                }
              >
                {(isGreetingLoading || isPersonalizing) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Personalize
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
