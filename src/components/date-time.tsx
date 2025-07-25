"use client";

import { useState, useEffect } from 'react';

export default function DateTime() {
  const [hydrated, setHydrated] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setHydrated(true);
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!hydrated) {
    return <div className="w-40 h-10" />;
  }

  const formatDate = (d: Date) => {
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 hidden md:flex flex-col items-center text-xs text-muted-foreground transition-opacity duration-500 ease-in-out opacity-100 bg-background/50 backdrop-blur-sm border border-accent rounded-lg p-2 px-3">
      <p>{formatDate(date)}</p>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  );
}
