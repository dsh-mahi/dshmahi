"use client";

import { useEffect, useState } from "react";
import MusicPlayer from "@/components/music-player";

export default function GlobalLightToggle() {
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    const savedLightsState = window.localStorage.getItem("dshmahi-lights-on");
    if (savedLightsState === "true") {
      setLightsOn(true);
    }
  }, []);

  const handleToggleLight = () => {
    setLightsOn((prev) => {
      const next = !prev;
      window.localStorage.setItem("dshmahi-lights-on", String(next));
      return next;
    });
  };

  return <MusicPlayer onToggleLight={handleToggleLight} lightsOn={lightsOn} />;
}

