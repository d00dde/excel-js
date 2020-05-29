import { ExcelComponent } from '@core/ExcelComponent';
import { capitalize } from '@core/utils';

export class ResizedExcelComponent extends ExcelComponent {
  constructor($root, options) {
    if (!options.listeners) options.listeners = [];
    options.listeners = options.listeners.concat(['mousedown', 'mouseup']);
    super($root, options);
    this.resized = {
      target: null,
      startPosition: 0,
      attributes: {
        type: '',
        axis: '',
        name: '',
        offset: '',
      },
      indicator: {
        column: '.indicator-col',
        row: '.indicator-row',
        current: null,
        tableOffset: 0,
      },
    };
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resized.attributes = this.setResizeAttr(event.target.dataset.resize);
      this.resizeStart(event);
      this.addListener('mousemove');
      this.startIndicator();
    }
  }
  onMouseup(event) {
    if (this.resized.target) {
      this.endIndicator();
      this.resizeEnd(event);
      this.removeListener('mousemove');
    }
  }
  onMousemove(event) {
    const { offset, axis } = this.resized.attributes;
    const { current, tableOffset } = this.resized.indicator;
    current.style[offset] = event[axis] - tableOffset + 'px';
  }
  resizeStart(event) {
    this.resized.target = event.target;
    this.resized.startPosition = event[this.resized.attributes.axis];
  }
  startIndicator() {
    const indicator = this.resized.indicator;
    const type = this.resized.attributes.type;
    const offset = this.resized.attributes.offset;
    indicator.current = document.querySelector(indicator[type]);
    const table = indicator.current.offsetParent;
    indicator.tableOffset = this.calcOffset(table, offset);
  }
  endIndicator() {
    const state = this.resized;
    state.indicator.current.style[state.attributes.offset] = '-2px';
    state.indicator.current = null;
  }
  resizeEnd(event) {
    const { type, name, axis } = this.resized.attributes;
    const target = this.resized.target.parentNode;
    const newSize = this.calcSize(name, event[axis]);
    this.resizeFirstElement(type, target, name, newSize);
    document.querySelectorAll('.cell').forEach((cell) => {
      if (cell.dataset[type] === target.innerText) {
        cell.style[name] = newSize;
      }
    });
    this.cleanResized();
  }
  cleanResized() {
    this.resized.target = null;
    this.resized.startPosition = 0;
    this.resized.attributes = {};
  }
  setResizeAttr(type) {
    if (type === 'column') {
     return {
        type,
        axis: 'clientX',
        name: 'width',
        offset: 'left',
      };
    }
    if (type === 'row') {
      return {
        type,
        axis: 'clientY',
        name: 'height',
        offset: 'top',
      };
    }
  }
  resizeFirstElement(type, target, name, newSize) {
    if (type === 'row') {
      target.parentNode.style[name] = newSize;
    } else if (type === 'column') {
      target.style[name] = newSize;
    }
  }
  calcSize(direction, endPosition) {
    const capDirection = capitalize(direction);
    const startSize = +this.resized.target.parentNode['offset' + capDirection];
    return startSize + endPosition - this.resized.startPosition + 'px';
  }
  calcOffset(positioned, direction) {
    return positioned['offset' + capitalize(direction)];
  }
}
