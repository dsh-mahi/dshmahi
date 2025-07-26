
"use client";

import { useState, useRef, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MusicPlayerProps {
  onToggle?: () => void;
}

export default function MusicPlayer({ onToggle }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // A placeholder music track. Replace this with your desired audio file.
  const musicSrc = "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde6b6cf1.mp3";

  useEffect(() => {
    // Autoplay is often restricted by browsers. 
    // We'll attempt to play, but user interaction might be needed.
    const playPromise = audioRef.current?.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log("Autoplay was prevented.", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
    if(onToggle) {
        onToggle();
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <audio ref={audioRef} src={musicSrc} loop />
      <Button
        variant="outline"
        size="icon"
        onClick={togglePlay}
        className="rounded-full bg-background/50 backdrop-blur-sm border-accent"
      >
        {isPlaying ? <Music className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-muted-foreground" />}
        <span className="sr-only">Toggle Music</span>
      </Button>
    </div>
  );
}
