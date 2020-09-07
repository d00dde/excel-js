import { Page } from '@core/Page';
import { Excel } from '@/components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { storage, debounce } from '@core/utils';
import { initialState } from '@/redux/initialState';
// import { $ } from '@core/dom';

export class ExcelPage extends Page {
  constructor(params) {
    super(params);
  }
  getRoot() {
    const store = createStore(rootReducer, initialState);
    const stateListener = debounce((store) => {
      storage('excel-state', store);
    }, 300);

    store.subscribe(stateListener);

    const excel = new Excel('#app', {
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return excel.getRoot();
  }
}
