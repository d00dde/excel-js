import { defaultStyles } from '@/constants';
import { toInlineStyles } from '@core/utils';
import { parse } from '@core/parse';

const CODES = {
  A: 65,
  Z: 90,
  get colsCount() {
    return this.Z - this.A + 1;
  },
};
const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 20;

const defaultCellStyles = toInlineStyles(defaultStyles);

function createRow(row, content, state = {}) {
  const resize =
    row !== null ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div
      class="row"
      data-row=${row}
      data-type="resizable"
      style="height: ${calcHeight(state.rowState, row)}"
    >
      <div class="row-info">
        ${row !== null ? row + 1 : ''}
        ${resize}
      </div>
      <div class="row-data">
        ${content}
      </div>
    </div>
    `;
}

function getColTitle(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createColumn({ title, index, width }) {
  return `
  <div
    class="column"
    data-type="resizable"
    data-col=${index}
    style="width: ${width}"
  >
    ${title}
    <div class="col-resize" data-resize="column"></div>
  </div>
  `;
}
function createCell(state, row) {
  return (_, col) => {
    const id = `${row}:${col}`;
    const content = state.dataState[id] || '';
    const styles = computedStyles(state, id);
    return `
      <div
        class="cell"
        contenteditable
        data-col=${col}
        data-type="cell"
        data-id=${id}
        data-value="${content}"
        style="${styles} width: ${calcWidth(state.colState, col)}"
      >
        ${parse(content)}
      </div>
    `;
  };
}

function createIndicators() {
  return `
    <div class="indicator-col"></div>
    <div class="indicator-row"></div>
  `;
}

function calcWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px';
}

function calcHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function withWidthFrom(state) {
  return (title, index) => {
    return {
      title,
      index,
      width: calcWidth(state.colState, index),
    };
  };
}
function computedStyles(state, id) {
  return state.stylesState[id]
    ? toInlineStyles(state.stylesState[id])
    : defaultCellStyles;
}

export function createTable(rowsCount = 15, state = {}) {
  const rows = [];
  const columns = new Array(CODES.colsCount)
    .fill('')
    .map(getColTitle)
    .map(withWidthFrom(state))
    .map(createColumn)
    .join('');
  rows.push(createRow(null, columns, state));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(CODES.colsCount)
      .fill('')
      .map(createCell(state, row))
      .join('');
    rows.push(createRow(row, cells, state));
  }
  rows.push(createIndicators());
  return rows.join('');
}
