import SimonBoard from '../components/SimonBoard.tsx';
import { TOTAL_ROUNDS } from '../game/colors.ts';
import './HomeScreen.css';

export default function HomeScreen() {
  return (
    <section className="home" aria-labelledby="home-title">
      <header className="screen-header">
        <h1 id="home-title" lang="en" dir="ltr">
          Simon
        </h1>
      </header>

      <h3 className="home__round">
        שלב <bdi>1</bdi> מתוך <bdi>{TOTAL_ROUNDS}</bdi>
      </h3>

      {/* Reserved status line so the board doesn't shift once game states are added */}
      <p className="home__status" aria-live="polite" />

      <SimonBoard />

      <div className="home__actions">
        {/* Starts the game from Milestone 2 */}
        <button type="button" className="btn-primary">
          התחל
        </button>
      </div>
    </section>
  );
}
