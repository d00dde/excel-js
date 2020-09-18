import { Page } from '@core/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { storage, debounce } from '@core/utils';
import { normalizeInitialState } from '@/redux/initialState';

function storageName(param) {
  return 'excel:' + param;
}

export class ExcelPage extends Page {
  constructor(params) {
    super(params);
  }
  getRoot() {
    const param = this.params || Date.now().toString();
    const state = storage(storageName(param));
    const store = createStore(rootReducer, normalizeInitialState(state));
    const stateListener = debounce((store) => {
      storage(storageName(param), store);
    }, 300);

    store.subscribe(stateListener);

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
    this.excel.destroy();
  }
}
