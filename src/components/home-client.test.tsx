import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomeClient from './home-client';

vi.mock('@/components/nav', () => ({
  default: () => <div>Nav</div>,
}));

vi.mock('@/components/music-player', () => ({
  default: ({ onToggleLight }: { onToggleLight: () => void }) => (
    <button onClick={onToggleLight}>Toggle Light</button>
  ),
}));

vi.mock('@/components/hero-section', () => ({
  default: ({
    onPersonalize,
    onPersonalizationMeta,
  }: {
    onPersonalize: (interests: string) => Promise<void>;
    onPersonalizationMeta?: (meta: { interestsCsv: string; selectedInterests: string[]; greeting: string }) => void;
  }) => (
    <button
      onClick={() => {
        onPersonalizationMeta?.({
          interestsCsv: 'seo',
          selectedInterests: ['SEO'],
          greeting: 'hi',
        });
        onPersonalize('seo');
      }}
    >
      Personalize Trigger
    </button>
  ),
}));

vi.mock('@/components/socials-section', () => ({
  default: () => <div>Socials</div>,
}));

vi.mock('@/components/projects-section', () => ({
  default: ({ projects }: { projects: Array<{ title: string }> }) => (
    <div data-testid="project-order">{projects.map((project) => project.title).join(' | ')}</div>
  ),
}));

describe('HomeClient personalization', () => {
  it('reorders projects based on local keyword matching', async () => {
    render(<HomeClient />);
    fireEvent.click(screen.getByRole('button', { name: 'Personalize Trigger' }));

    await waitFor(() => {
      expect(screen.getByTestId('project-order').textContent?.startsWith('SEO Optimization - Sip Hygiene')).toBe(
        true
      );
    });
  });
});
