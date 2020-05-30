import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { $ } from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }
  toHTML() {
    return createTable(20);
  }
  onMousedown(event) { // TODO: resize rows
    if (event.target.dataset.resize) {
      const $target = $(event.target);
      const $parent = $target.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const col = $parent.data.col;
      const cells = this.$root.findAll(`[data-col="${col}"]`);
      document.onmousemove = (e) => {
        const delta = e.pageX - coords.right;
        const value = coords.width + delta;
        cells.forEach((cell) => cell.style.width = value + 'px');
        $parent.$el.style.width = value + 'px';
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }
}
