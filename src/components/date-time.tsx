
"use client";

import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DateTime() {
  const [hydrated, setHydrated] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!hydrated) {
    return <div className="w-48 h-10" />;
  }

  const formatDate = (d: Date) => {
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex items-center gap-4 text-xs text-muted-foreground transition-all duration-500 ease-in-out bg-background/50 backdrop-blur-sm border border-accent rounded-full p-2 sm:px-4 cursor-pointer sm:cursor-default"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        <span className={cn("hidden sm:inline", { 'inline': isExpanded })}>{formatDate(date)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span className={cn("hidden sm:inline", { 'inline': isExpanded })}>{date.toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
