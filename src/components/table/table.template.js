const CODES = {
  A: 65,
  Z: 90,
  get colsCount() {
    return this.Z - this.A + 1;
  },
};

function createRow(index, content) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return `
    <div class="row">
      <div class="row-info">
        ${index ? index : ''}
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

function createColumn(title) {
  return `
  <div class="column">
    ${title}
    <div class="col-resize" data-resize="column"></div>
  </div>
  `;
}
function createCell(el, index) {
  return `
    <div
      class="cell"
      contenteditable
      data-column=${el}
      data-row=${index + 1}
    >
    </div>`;
}

export function createTable(rowsCount = 15) {
  const rows = [];
  const columns = new Array(CODES.colsCount)
    .fill('')
    .map(getColTitle)
    .map(createColumn)
    .join('');
  rows.push(createRow(null, columns));
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(CODES.colsCount)
      .fill('')
      .map(getColTitle)
      .map((el) => createCell(el, i))
      .join('');
    rows.push(createRow(i + 1, cells));
  }
  return rows.join('');
}
