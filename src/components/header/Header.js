import { ExcelComponent } from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
    });
  }
  init() {
    super.init();
    // this.$title = this.$root.find('#formula');
  }

  toHTML() {
    return `
      <input
        type="text"
        class="table-name-input"
        placeholder="Введите название..."
      />
      <div class="table-controls">
      <div class="button">
      <span class="material-icons">
      delete_forever
      </span>
      </div>
      <div class="button">
      <span class="material-icons">
      exit_to_app
      </span>
      </div>
      </div>
      `;
  }
}
