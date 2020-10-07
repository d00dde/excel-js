import { storage } from '@core/utils';

function storageName(id) {
  return 'excel:' + id;
}

export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name || Date.now().toString());
  }
  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }
  getState() {
    // return Promise.resolve(storage(this.name));
    return new Promise((resolve) => {
      const state = storage(this.name);
      setTimeout(() => {
        resolve(state);
      }, 500);
    });
  }
}
