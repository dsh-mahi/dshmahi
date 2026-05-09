
"use client";

import { Lightbulb, LightbulbOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LightToggleProps {
  onToggleLight: () => void;
  lightsOn: boolean;
}

export default function MusicPlayer({ onToggleLight, lightsOn }: LightToggleProps) {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={onToggleLight}
        className="rounded-full bg-background/50 backdrop-blur-sm border-accent"
      >
        {lightsOn ? <Lightbulb className="h-4 w-4 text-yellow-300" /> : <LightbulbOff className="h-4 w-4 text-muted-foreground" />}
        <span className="sr-only">Toggle Light</span>
      </Button>
    </div>
  );
}
