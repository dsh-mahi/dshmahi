
"use client";

import React, { useState, useEffect } from 'react';

export function useSpotlight(ref: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: -100, y: -100 });

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
    
    const handleMouseLeave = () => {
        setPosition({ x: -100, y: -100 });
    }

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  const spotlightStyle: React.CSSProperties = {
     background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsl(var(--accent) / 0.8), transparent 40%)`,
  }

  const maskStyle: React.CSSProperties = {
    maskImage: `radial-gradient(circle at ${position.x}px ${position.y}px, black 20%, transparent 40%)`,
    WebkitMaskImage: `radial-gradient(circle at ${position.x}px ${position.y}px, black 20%, transparent 40%)`,
  };

  return { spotlightStyle, maskStyle };
}
