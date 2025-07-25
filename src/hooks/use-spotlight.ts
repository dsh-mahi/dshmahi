
"use client";

import React, { useState, useEffect } from 'react';

export function useSpotlight(ref: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [ref]);

  const spotlightStyle: React.CSSProperties = {
    background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsla(0, 0%, 100%, 0.1), transparent 40%)`,
  };

  return { spotlightStyle };
}
