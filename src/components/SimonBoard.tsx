import { BOARD_ORDER, COLOR_LABELS } from '../game/colors.ts';
import './SimonBoard.css';

export default function SimonBoard() {
  return (
    <div className="board" role="group" aria-label="לוח המשחק">
      <div className="board__grid">
        {BOARD_ORDER.map((color) => (
          <button
            key={color}
            type="button"
            className={`board__pad board__pad--${color}`}
            aria-label={COLOR_LABELS[color]}
            // No game logic yet – pads become interactive in Milestone 2
            disabled
          />
        ))}
      </div>
      <div className="board__center" aria-hidden="true" />
    </div>
  );
}
