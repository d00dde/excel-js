import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';

export class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector);
    if (this.$placeholder.isEmpty) {
      throw new Error('Router must have a root element');
    }
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  changePageHandler() {
    this.page ? this.page.destroy() : null;
    this.$placeholder.clear();
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
  destroy() {
    this.page.destroy();
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
