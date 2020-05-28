import { ResizedExcelComponent } from '@core/ResizedExcelComponent';
import { createTable } from './table.template';

export class Table extends ResizedExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['click'],
    });
  }
  toHTML() {
    return createTable(20);
  }
  onClick() {
    console.log('table click');
  }
}
