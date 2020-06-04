const CODES = {
  A: 65,
  Z: 90,
  get colsCount() {
    return this.Z - this.A + 1;
  },
};

function createRow(row, content) {
  const resize =
    row !== null ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="row" data-row=${row} data-type="resizable">
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

function createColumn(title, index) {
  return `
  <div class="column" data-type="resizable" data-col=${index}>
    ${title}
    <div class="col-resize" data-resize="column"></div>
  </div>
  `;
}
function createCell(row) {
  return function(_, col) {
    return `
      <div
        class="cell"
        contenteditable
        data-col=${col}
        data-id='${row}:${col}'
      >
      </div>
    `;
  }
}

function createIndicators() {
  return `
    <div class="indicator-col"></div>
    <div class="indicator-row"></div>
  `;
}

export function createTable(rowsCount = 15) {
  const rows = [];
  const columns = new Array(CODES.colsCount)
    .fill('')
    .map(getColTitle)
    .map(createColumn)
    .join('');
  rows.push(createRow(null, columns));
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(CODES.colsCount)
      .fill('')
      .map(createCell(row))
      .join('');
    rows.push(createRow(row, cells));
  }
  rows.push(createIndicators());
  return rows.join('');
}
