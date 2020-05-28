import { ExcelComponent } from '@core/ExcelComponent';
import { capitalize } from '@core/utils';

export class ResizedExcelComponent extends ExcelComponent {
  constructor($root, options) {
    if (!options.listeners) options.listeners = [];
    options.listeners = options.listeners.concat(['mousedown', 'mouseup']);
    super($root, options);
    this.resized = options.resized;
    this.resized = {
      target: null,
      startPosition: 0,
    };
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.resizeStart(event);
      this.addListener('mousemove'); // TODO: add resize element
    }
  }
  onMouseup(event) {
    if (this.resized.target) {
      this.resizeEnd(event);
      this.removeListener('mousemove');
    }
  }
  onMousemove(event) {
    console.log(event);
    event.target.style.right =
      this.resized.startPosition - event.clientX + 'px';
  }
  resizeStart(event) {
    this.resized.target = event.target;
    const resizeType = event.target.dataset.resize;
    this.resized.startPosition = event[this.getResizeAxis(resizeType)];
  }
  resizeEnd(event) {
    const resizeType = this.resized.target.dataset.resize;
    const target = this.resized.target.parentNode;
    const resizeAttrName = this.getResizeAttrName(resizeType);
    const newSize = this.calcSize(
      resizeAttrName,
      event[this.getResizeAxis(resizeType)],
    );
    this.resizeFirstElement(resizeType, target, resizeAttrName, newSize);
    document.querySelectorAll('.cell').forEach((cell) => {
      if (cell.dataset[resizeType] === target.innerText) {
        cell.style[resizeAttrName] = newSize;
      }
    });
    this.cleanResized();
  }
  cleanResized() {
    this.resized.target = null;
    this.resized.startPosition = 0;
  }
  getResizeAxis(resizeType) {
    if (resizeType === 'column') return 'clientX';
    if (resizeType === 'row') return 'clientY';
  }
  getResizeAttrName(resizeType) {
    if (resizeType === 'column') return 'width';
    if (resizeType === 'row') return 'height';
  }
  resizeFirstElement(resizeType, target, resizeAttrName, newSize) {
    if (resizeType === 'row') {
      target.parentNode.style[resizeAttrName] = newSize;
    } else if (resizeType === 'column') {
      target.style[resizeAttrName] = newSize;
    }
  }
  calcSize(direction, endPosition) {
    const capDirection = capitalize(direction);
    const startSize = +this.resized.target.parentNode['offset' + capDirection];
    return startSize + endPosition - this.resized.startPosition + 'px';
  }
}
