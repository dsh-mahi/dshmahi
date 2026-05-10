"use client";

import { useEffect, useState } from "react";
import MusicPlayer from "@/components/music-player";
import { persistLightsOn, readPersistedLightsOn } from "@/lib/light-state";

export default function GlobalLightToggle() {
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    setLightsOn(readPersistedLightsOn());
  }, []);

  const handleToggleLight = () => {
    setLightsOn((prev) => {
      const next = !prev;
      persistLightsOn(next);
      return next;
    });
  };

  return <MusicPlayer onToggleLight={handleToggleLight} lightsOn={lightsOn} />;
}
