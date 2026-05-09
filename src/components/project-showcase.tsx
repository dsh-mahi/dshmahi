'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/projects';

function formatAssetCaption(assetPath: string) {
  const fileName = assetPath.split('/').pop() ?? '';
  const withoutExtension = fileName.replace(/\.[^/.]+$/, '');
  return withoutExtension
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getYouTubeEmbedUrl(url: string) {
  try {
    const urlObj = new URL(url);
    const isShortLink = urlObj.hostname.includes('youtu.be');
    const videoId = isShortLink ? urlObj.pathname.replace('/', '') : urlObj.searchParams.get('v');
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default function ProjectShowcase({
  project,
  showHeader = true,
}: {
  project: Project;
  showHeader?: boolean;
}) {
  const assets = project.modalAssets ?? [];

  const embedUrl = useMemo(() => {
    if (!project.externalUrl) return null;
    if (!project.externalUrl.includes('youtube.com') && !project.externalUrl.includes('youtu.be')) return null;
    return getYouTubeEmbedUrl(project.externalUrl);
  }, [project.externalUrl]);

  if (embedUrl) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          {showHeader ? <h2 className="text-2xl font-semibold">{project.title}</h2> : <div />}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Open link
            </a>
          )}
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            width="100%"
            height="100%"
            src={`${embedUrl}?autoplay=0`}
            title={`${project.title} video`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (project.modalKind === 'pdf') {
    const pdfAsset = assets[0] ?? '';
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          {showHeader ? <h2 className="text-2xl font-semibold">{project.title}</h2> : <div />}
          {project.externalUrl && (
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Open link
            </a>
          )}
        </div>
        <iframe
          src={encodeURI(pdfAsset)}
          title={`${project.title} PDF`}
          className="w-full h-[62vh] sm:h-[75vh] rounded-xl bg-white"
        />
        <p className="text-sm text-muted-foreground">{formatAssetCaption(pdfAsset)}</p>
      </div>
    );
  }

  if (project.modalKind === 'gallery') {
    return (
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {showHeader ? (
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
          ) : (
            <div />
          )}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground ml-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open link
              </a>
            )}
          </div>
        </div>

        <div className="space-y-8">
          {assets.map((asset) => {
            const normalizedAsset = encodeURI(asset);
            const isPdf = normalizedAsset.toLowerCase().endsWith('.pdf');
            return (
              <div key={asset} className="space-y-2">
                {isPdf ? (
                  <iframe
                    src={normalizedAsset}
                    title={`${project.title} document`}
                    className="w-full h-[62vh] sm:h-[75vh] rounded-xl bg-white"
                  />
                ) : (
                  <Image
                    src={normalizedAsset}
                    alt={`${project.title} preview`}
                    width={1600}
                    height={900}
                    unoptimized
                    className="w-full h-[52vh] sm:h-[70vh] object-contain rounded-xl bg-black"
                  />
                )}
                <p className="text-sm text-muted-foreground">{formatAssetCaption(asset)}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {showHeader && (
        <>
          <h2 className="text-2xl font-semibold">{project.title}</h2>
          <p className="text-muted-foreground">{project.description}</p>
        </>
      )}
      {project.externalUrl && (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          Open link
        </a>
      )}
    </div>
  );
}

