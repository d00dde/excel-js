import { ExcelComponent } from '@core/ExcelComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '@core/dom';

export class Toolbar extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  static className = 'excel__toolbar';

  toHTML() {
    return createToolbar();
  }
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      console.log($target.text());
    }
  }
}
