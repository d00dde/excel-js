import { describe, test, expect, beforeEach } from '@jest/globals';
import { Router } from './Router';
import { Page } from '../Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}
class ExcelPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'excel';
    return root;
  }
}

describe('Router:', () => {
  let router;
  let $root;
  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router(null, {
      dashboard: DashboardPage,
      excel: ExcelPage,
    });
  });
  test('should be defined', () => {
    expect(router).toBeDefined();
  });
  test('should render DashboardPage', () => {
    router.changePageHandler();
    expect($root.innerHTML).toBe('<div>dashboard1</div>');
  });
});
