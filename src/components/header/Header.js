import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/redux/actions';
import { $ } from '@core/dom';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }
  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(changeTitle($target.text()));
  }

  toHTML() {
    const state = this.store.getState();
    return `
      <input
        type="text"
        class="table-name-input"
        placeholder="Введите название..."
        value="${state.title}"
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
