
"use client";

import React, { useState, useEffect } from 'react';

export function useSpotlight(ref: React.RefObject<HTMLElement>) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

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

    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);


    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  const spotlightStyle: React.CSSProperties = {
    opacity: isHovering ? 1 : 0,
    background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsl(0 0% 50% / 0.15), transparent 40%)`,
    transition: 'opacity 0.2s ease-out',
  };

  const persistentSpotlightStyle: React.CSSProperties = {
     background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsl(0 0% 50% / 0.15), transparent 40%)`,
  }

  return { spotlightStyle: isHovering ? spotlightStyle : persistentSpotlightStyle };
}
