import { $ } from '../dom';
import { ActiveRoute } from './ActiveRoute';
import { loader } from '../../components/Loader';

export class Router {
  constructor(selector, routes) {
    this.$placeholder = $(selector);
    if (this.$placeholder.isEmpty) {
      throw new Error('Router must have a root element');
    }
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.loader = loader();
    this.init();
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  async changePageHandler() {
    this.page ? this.page.destroy() : null;
    this.$placeholder.clear().append(this.loader);
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;
    this.page = new Page(ActiveRoute.param);
    const root = await this.page.getRoot();
    this.$placeholder.clear().append(root);
    this.page.afterRender();
  }
  destroy() {
    this.page.destroy();
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}
