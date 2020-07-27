import { DOMListener } from '@core/DOMListener';
export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubs = [];
    this.prepare();
  }
  prepare() {}
  toHTML() {
    return '';
  }
  $emit(eventName, ...args) {
    this.emitter.emit(eventName, ...args);
  }
  $on(eventName, fn) {
    this.unsubs.push(this.emitter.subscribe(eventName, fn));
  }
  init() {
    this.initDOMListeners();
  }
  $dispatch(action) {
    this.store.dispatch(action);
  }
  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubs.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
