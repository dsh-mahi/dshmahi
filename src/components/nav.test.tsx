import { render, screen } from '@testing-library/react';
import Nav from './nav';

describe('Nav', () => {
  it('renders anchor links to page sections', () => {
    render(<Nav />);

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#hero');
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: 'Connect' })).toHaveAttribute('href', '#socials');
  });
});
