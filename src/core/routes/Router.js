import { $ } from '@core/dom';
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
    this.$placeholder.html(ActiveRoute.param);
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
