export class TableSelection {
  static selectedClassName = 'selected';
  constructor() {
    this.group = [];
    this.current = null;
  }
  select($el) {
    this.clear();
    this.current = $el;
    this.group.push($el);
    $el.focus().addClass(TableSelection.selectedClassName);
  }
  selectGroup($group = []) {
    this.clear();
    this.group = $group;
    this.group.forEach(($cell) =>
      $cell.addClass(TableSelection.selectedClassName),
    );
  }
  clear() {
    this.group.forEach(($el) =>
      $el.removeClass(TableSelection.selectedClassName),
    );
    this.group = [];
  }
}
