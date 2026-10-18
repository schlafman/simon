export type Color = 'green' | 'red' | 'yellow' | 'blue';

// Spatial board order (row by row, left to right): it must not flip under RTL.
export const BOARD_ORDER: readonly Color[] = ['green', 'red', 'yellow', 'blue'];

export const COLOR_LABELS: Record<Color, string> = {
  green: 'ירוק',
  red: 'אדום',
  yellow: 'צהוב',
  blue: 'כחול',
};

export const TOTAL_ROUNDS = 10;
