import { capitalize } from '@core/utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root parameter in DOMListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = createMethodName(listener);
      if (!this[method]) {
        throw new Error(
          `Method ${method} not implemented in ${this.name} Component`
        );
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = createMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}

function createMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
