export class Page {
  constructor(params) {
    this.params = params;
  }
  getRoot() {
    throw new Error('Method "getRoot" sold be implemented');
  }
  afterRender() {}
  destroy() {}
}
