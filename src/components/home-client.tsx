"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import SocialsSection from "@/components/socials-section";
import Nav from "@/components/nav";
import MusicPlayer from "@/components/music-player";
import { Lightbulb } from "lucide-react";
import { initialProjects, type Project } from "@/lib/projects";
import {
  clearPersonalizationMemory,
  getPersonalizationMemory,
  setPersonalizationMemory,
} from "@/lib/personalization-memory";

export default function HomeClient() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [hasPersonalization, setHasPersonalization] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [initialSelectedInterests, setInitialSelectedInterests] = useState<string[]>([]);
  const [initialGreeting, setInitialGreeting] = useState<string | null>(null);

  const computePersonalizedProjects = (interests: string) => {
    const keywords = interests
      .toLowerCase()
      .split(/[,\s]+/)
      .map((term) => term.trim())
      .filter((term) => term.length > 1);

    const sortedProjects = [...initialProjects].sort((a, b) => {
      const score = (project: Project) => {
        const haystack = [
          project.title,
          project.description,
          project.category,
          ...project.tags,
          ...project.techStack,
        ]
          .join(" ")
          .toLowerCase();

        return keywords.reduce(
          (total, keyword) => total + (haystack.includes(keyword) ? 1 : 0),
          0,
        );
      };

      return score(b) - score(a);
    });

    const filteredProjects = sortedProjects.filter((project) => {
      const haystack = [
        project.title,
        project.description,
        project.category,
        ...project.tags,
        ...project.techStack,
      ]
        .join(" ")
        .toLowerCase();
      return keywords.some((keyword) => haystack.includes(keyword));
    });

    return filteredProjects.length > 0 ? filteredProjects : sortedProjects;
  };

  useEffect(() => {
    const savedLightsState = window.localStorage.getItem("dshmahi-lights-on");
    if (savedLightsState === "true") {
      setLightsOn(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("dshmahi-lights-on", String(lightsOn));
  }, [lightsOn]);

  useEffect(() => {
    const saved = getPersonalizationMemory();
    if (!saved?.active) return;
    setProjects(computePersonalizedProjects(saved.interestsCsv));
    setHasPersonalization(true);
    setInitialSelectedInterests(saved.selectedInterests);
    setInitialGreeting(saved.greeting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const availableInterests = Array.from(
    new Set(
      initialProjects
        .flatMap((project) => project.tags)
        .filter((tag) => tag.toLowerCase() !== "personal"),
    ),
  );

  const handlePersonalizeProjects = async (interests: string) => {
    if (!interests) return;
    setIsPersonalizing(true);
    try {
      const next = computePersonalizedProjects(interests);
      setProjects(next);
      setHasPersonalization(true);
    } catch (error) {
      console.error("Failed to personalize projects:", error);
    } finally {
      setIsPersonalizing(false);
    }
  };

  const handleClearPersonalization = () => {
    setProjects(initialProjects);
    setHasPersonalization(false);
    setInitialSelectedInterests([]);
    setInitialGreeting(null);
    clearPersonalizationMemory();
  };

  return (
    <main className="relative animate-fade-in">
      <Nav />
      <MusicPlayer
        onToggleLight={() => setLightsOn((prev) => !prev)}
        lightsOn={lightsOn}
      />
      <HeroSection
        onPersonalize={handlePersonalizeProjects}
        onClearPersonalization={handleClearPersonalization}
        onPersonalizationMeta={(meta) => {
          setPersonalizationMemory({
            active: true,
            interestsCsv: meta.interestsCsv,
            selectedInterests: meta.selectedInterests,
            greeting: meta.greeting,
          });
          setInitialSelectedInterests(meta.selectedInterests);
          setInitialGreeting(meta.greeting);
        }}
        isPersonalizing={isPersonalizing}
        hasPersonalization={hasPersonalization}
        availableInterests={availableInterests}
        initialSelectedInterests={initialSelectedInterests}
        initialGreeting={initialGreeting}
      />

      {!lightsOn && (
        <div className="text-center my-16 animate-fade-in px-4">
          <Lightbulb className="mx-auto h-8 w-8 text-yellow-300/50 mb-4" />
          <p className="text-muted-foreground max-w-md mx-auto">
            It&apos;s a bit dark in here... Can you find the light switch?
            <br />
            <span className="text-xs">Maybe the melody holds the key.</span>
          </p>
        </div>
      )}

      <div>
        <ProjectsSection projects={projects} isIlluminated={lightsOn} />
        <SocialsSection isIlluminated={lightsOn} />
      </div>

      <footer className="text-center text-muted-foreground py-8 px-4">
        <p>&copy; {new Date().getFullYear()} Dsh Mahi. All Rights Reserved.</p>
        <p className="text-xs mt-2">Crafted by human and ai minds.</p>
      </footer>
    </main>
  );
}
