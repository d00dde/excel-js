import { ExcelComponent } from '@core/ExcelComponent';
import { changeTitle } from '@/redux/actions';
import { ActiveRoute } from '@core/routes/ActiveRoute';
import { $ } from '@core/dom';

export class Header extends ExcelComponent {
  static className = 'excel__header';
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }
  onInput(e) {
    const $target = $(e.target);
    this.$dispatch(changeTitle($target.text()));
  }
  onClick(e) {
    const $target = $(e.target);
    switch ($target.data.button) {
      case 'delete':
        if (confirm('Вы действительно хотите удалить таблицу?')) {
          localStorage.removeItem('excel:' + ActiveRoute.param);
          ActiveRoute.navigate('');
        }
        break;
      case 'exit':
        ActiveRoute.navigate('');
        break;
    }
  }

  toHTML() {
    const state = this.store.getState();
    const buttons = [
      { value: 'delete', icon: 'delete_forever' },
      { value: 'exit', icon: 'exit_to_app' },
    ];
    return `
      <input
        type="text"
        class="table-name-input"
        placeholder="Введите название..."
        value="${state.title}"
      />
      <div class="table-controls">
      ${buttons.map(this.createButton).join('')}
      `;
  }
  createButton({ value, icon }) {
    const meta = `data-button="${value}"`;
    return `
      <div class="button" ${meta}>
        <span class="material-icons" ${meta}>
          ${icon}
        </span>
      </div>
    `;
  }
}
