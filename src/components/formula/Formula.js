import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }
  init() {
    super.init();
    this.$formula = this.$root.find('#formula');
    this.$on('Table: select', ($cell) => {
      this.$formula.text($cell.text());
    });
    this.$on('Table: input', (value) => {
      this.$formula.text(value);
    })
  }

  static className = 'excel__formula';

  toHTML() {
    return `<div class="title">f(x)</div>
          <div id="formula" class="formula-input" contenteditable spellcheck="false"></div>`;
  }
  onInput(event) {
    this.$emit('Formula: input', $(event.target).text());
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if(keys.includes(event.key)){
      event.preventDefault();
      this.$emit('Formula: done');
    }
  }
}
