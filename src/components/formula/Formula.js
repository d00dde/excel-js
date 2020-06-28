import { ExcelComponent } from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
      ...options,
    });
  }

  static className = 'excel__formula';

  toHTML() {
    return `<div class="title">f(x)</div>
          <div class="formula-input" contenteditable spellcheck="false"></div>`;
  }
  onInput(event) {
    console.log('Formula: input', event.target.textContent.trim());
  }
}
