const CODES = {
  A: 65,
  Z: 90,
  /* get colsCount: function calcCols() {
    return this.Z - this.A;
  } */
  colsCount: function calcCols() {
    return this.Z - this.A;
  },
};

function createRow(rowInfo, isFirst) {
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
  row += '</div></div>';
  return row;
}

export function createTable(rowsCount = 15) {
  let table = createRow('', true);
  for (let i = 0; i < rowsCount; i++) {
    table += createRow(i + 1, false);
  }
  return table;
}
