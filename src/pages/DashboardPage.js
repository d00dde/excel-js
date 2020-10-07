import { Page } from '@core/Page/Page';
import { $ } from '@core/dom';
import { createTablesList } from './dashboard.functions';

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
        ${createTablesList()}
      </div>
    `);
  }
}
