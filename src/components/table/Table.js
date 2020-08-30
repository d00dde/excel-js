import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '@core/dom';
import { parse } from '@core/parse';
import {
  tableResize,
  changeText,
  changeStyles,
  applyStyle,
} from '@/redux/actions';
import { defaultStyles } from '@/constants';

export class Table extends ExcelComponent {
  static className = 'excel__table';
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }
  prepare() {
    this.selection = new TableSelection();
  }
  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="0:0"]'));
    this.$on('Formula: input', (value) => {
      this.selection.current.attr('data-value', value).text(parse(value));
      this.updateTextInStore(value);
    });
    this.$on('Formula: done', () => {
      this.selection.current.focus();
    });
    this.$on('Toolbar: applyStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(
        applyStyle({
          value: style,
          ids: this.selection.selectedIds,
        }),
      );
    });
  }
  toHTML() {
    const state = this.store.getState();
    return createTable(20, state);
  }
  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('Table: select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(tableResize(data));
    } catch (e) {
      console.error('Resize error: ', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event.target)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const target = $target.id(':');
        const current = this.selection.current.id(':');
        const $cells = matrix(target, current).map((id) =>
          this.$root.find(`[data-id="${id}"]`),
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const current = this.selection.current.id(':');
      const $next = this.$root.find(nextSelector(key, current));
      this.selectCell($next);
    }
  }
  onInput(event) {
    // this.$emit('Table: input', $(event.target).text());
    this.updateTextInStore($(event.target).text());
  }
  updateTextInStore(value) {
    this.$dispatch(
      changeText({
        id: this.selection.current.id(),
        value,
      }),
    );
  }
}
