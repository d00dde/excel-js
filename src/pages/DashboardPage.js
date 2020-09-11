import { Page } from '@core/Page';
import { $ } from '@core/dom';

export class DashboardPage extends Page {
  constructor(params) {
    super(params);
  }
  getRoot() {
    const id = Date.now().toString();
    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Exel-like application JS</h1>
      </div>
      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${id}" class="db__create">
            Новая <br/> таблица
          </a>
        </div>
      </div>
      <div class="db__table db__view">
        <div class="db__list-header">
          <span>Название таблицы</span>
          <span>Дата открытия</span>
        </div>
        <ul class="db__list">
          <li class="db__record">
            <a href="#">Table 1</a>
            <strong>18/06/2020</strong>
          </li>
        </ul>
      </div>
    `);
  }
}
