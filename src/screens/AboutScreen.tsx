import { TOTAL_ROUNDS } from '../game/colors.ts';
import './AboutScreen.css';

export default function AboutScreen() {
  return (
    <section className="about" aria-labelledby="about-title">
      <header className="screen-header">
        <h1 id="about-title">אודות</h1>
      </header>

      <article className="card about__intro">
        <h2>על המשחק</h2>
        <p>סיימון הוא משחק זיכרון של צבעים וצלילים.</p>
        <p>צפה ברצף הצבעים שהמשחק מציג, ואז הקש על הצבעים באותו הסדר.</p>
        <p>בכל שלב נוסף צבע אחד לרצף. טעות אחת מסיימת את המשחק.</p>
        <p>
          השלם את כל <bdi>{TOTAL_ROUNDS}</bdi> השלבים כדי לנצח!
        </p>
      </article>

      <section className="about__history" aria-labelledby="history-title">
        <h2 id="history-title">10 המשחקים האחרונים</h2>
        <p className="card about__empty">עדיין אין משחקים שמורים.</p>
      </section>
    </section>
  );
}
