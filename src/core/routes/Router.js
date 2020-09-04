import { $ } from '@core/dom';
export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Router must have a root element');
    }
    this.$placeholder = $(selector);
    console.log(this.$placeholder);
  }
}
