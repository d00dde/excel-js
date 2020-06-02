import { Resized } from './Resized';
import { createTable } from './table.template';

export class Table extends Resized {
  static className = 'excel__table';
  constructor($root) {
    super($root, {
      name: 'Table',
    });
  }
  toHTML() {
    return createTable(20);
  }
}
