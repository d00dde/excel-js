import { ExcelStateComponent } from '@core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';
import { $ } from '@core/dom';
import { defaultStyles } from '@/constants';

export class Toolbar extends ExcelStateComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  static className = 'excel__toolbar';

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this.state);
  }
  storeChanged(styles) {
    this.setState(styles.currentStyles);
  }

  toHTML() {
    return this.template;
  }
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('Toolbar: applyStyle', value);
    }
  }
}
