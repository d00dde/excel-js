const CODES = {
  A: 65,
  Z: 90,
  get colsCount() {
    return this.Z - this.A + 1;
  },
};

/* function createRow(rowInfo, isFirst) {
  let row = `
  <div class="row">
    <div class="row-info">${rowInfo}</div>
    <div class="row-data">
  `;
  for (let i = 0; i <= CODES.colsCount(); i++) {
    row += isFirst
      ? `<div class="column"> ${String.fromCharCode(CODES.A + i)}</div>`
      : `<div class="cell" contenteditable></div>`;
  }
  row += "</div></div>";
  return row;
} */

function createRow(rowInfo, content) {
  return `
    <div class="row">
      <div class="row-info">${rowInfo}</div>
      <div class="row-data">${content}</div>
    </div>
    `;
}

function getColTitle(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createColumn(title) {
  return `<div class="column">${title}</div>`;
}
function createCell() {
  return `<div class="cell" contenteditable></div>`;
}

export function createTable(rowsCount = 15) {
  const rows = [];
  const columns = new Array(CODES.colsCount)
    .fill('')
    .map(getColTitle)
    .map(createColumn)
    .join('');
  rows.push(createRow('', columns));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(CODES.colsCount)
      .fill('')
      .map(createCell)
      .join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
