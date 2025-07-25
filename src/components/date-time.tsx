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
    return <div className="w-40 h-8" />;
  }

  const formatDate = (d: Date) => {
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="hidden md:flex flex-col items-center text-xs text-muted-foreground transition-opacity duration-500 ease-in-out opacity-100">
      <p>{formatDate(date)}</p>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  );
}
