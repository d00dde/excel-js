import { range } from '@core/utils';
export function shouldResize(event) {
  return event.target.dataset.resize;
}
export function isCell($target) {
  return $target.dataset.type === 'cell';
}
export function matrix(target, current) {
  const cols = range(target.col, current.col);
  const rows = range(target.row, current.row);
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}
export function nextSelector(key, { row, col }) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
    default:
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
