import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsSection from './projects-section';
import type { Project } from '@/lib/projects';

const projects: Project[] = [
  {
    id: 1,
    slug: 'portfolio',
    title: 'Portfolio',
    description: 'My portfolio project',
    category: 'Personal',
    techStack: ['Next.js'],
    projectUrl: 'https://example.com',
    siteUrl: 'example.com',
    tags: ['Web'],
  },
];

describe('ProjectsSection', () => {
  it('shows empty state for client tab when no client projects exist', async () => {
    const user = userEvent.setup();
    render(<ProjectsSection projects={projects} isIlluminated />);

    await user.click(screen.getByRole('tab', { name: /Client \(0\)/i }));

    expect(screen.getByText('No client projects to show yet.')).toBeInTheDocument();
  });
});
