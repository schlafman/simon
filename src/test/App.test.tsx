import { readFileSync } from 'node:fs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.tsx';

describe('App shell', () => {
  it('renders the home screen with title, round, start button and board', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: 'Simon' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('שלב 1 מתוך 10');
    expect(screen.getByRole('button', { name: 'התחל' })).toBeInTheDocument();
    for (const name of ['ירוק', 'אדום', 'צהוב', 'כחול']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument();
    }
  });

  it('places the board pads in spatial order: green, red, yellow, blue', () => {
    render(<App />);
    const board = screen.getByRole('group', { name: 'לוח המשחק' });
    const labels = Array.from(board.querySelectorAll('button')).map((b) =>
      b.getAttribute('aria-label'),
    );
    expect(labels).toEqual(['ירוק', 'אדום', 'צהוב', 'כחול']);
  });

  it('navigates to About and back to Home without a reload', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'אודות' }));
    expect(screen.getByRole('heading', { name: 'על המשחק' })).toBeInTheDocument();
    expect(screen.getByText('עדיין אין משחקים שמורים.')).toBeInTheDocument();
    expect(screen.queryByRole('group', { name: 'לוח המשחק' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'אודות' })).toHaveAttribute('aria-current', 'page');

    await user.click(screen.getByRole('button', { name: 'בית' }));
    expect(screen.getByRole('group', { name: 'לוח המשחק' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'בית' })).toHaveAttribute('aria-current', 'page');
  });

  it('declares Hebrew and RTL in index.html', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).toContain('lang="he"');
    expect(html).toContain('dir="rtl"');
  });
});
