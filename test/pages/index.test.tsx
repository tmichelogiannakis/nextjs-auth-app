import { render, screen } from '@testing-library/react';
import IndexPage from '../../src/pages/index';

describe('IndexPage', () => {
  it('renders without crashing', () => {
    render(<IndexPage />);
    expect(
      screen.getByRole('heading', { name: 'Welcome to Next.js!' })
    ).toBeInTheDocument();
  });
});
