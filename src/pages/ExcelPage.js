import { Page } from '@core/Page/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/store/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '@/redux/initialState';
import { StateProcessor } from '@core/Page/StateProcessor';
import { LocalStorageClient } from '@/localStorage/LocalStorageClient';

export class ExcelPage extends Page {
  constructor(params) {
    super(params);
    this.storeSub = null;
    this.processor = new StateProcessor(new LocalStorageClient(params));
  }
  async getRoot() {
    const state = await this.processor.get();
    const store = createStore(rootReducer, normalizeInitialState(state));
    this.storeSub = store.subscribe(this.processor.listen);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }
  afterRender() {
    this.excel.init();
  }
  destroy() {
    this.storeSub.unsubscribe();
    this.excel.destroy();
  }
}
