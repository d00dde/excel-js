import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '@core/dom';

export class Resized extends ExcelComponent {
  constructor($root, options) {
    if (!options.listeners) options.listeners = [];
    options.listeners = options.listeners.concat(['mousedown']);
    super($root, options);
  }
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const col = $parent.data.col;
      const cells = this.$root.findAll(`[data-col="${col}"]`);
      const type = event.target.dataset.resize;
      let delta = 0;
      $resizer.css({ opacity: 1 });
      document.onmousemove = (e) => {
        if (type === 'column') {
          delta = e.pageX - coords.right;
          $resizer.css({ height: '100vh', right: -delta + 'px' });
        } else {
          delta = e.pageY - coords.bottom;
          $resizer.css({ width: '100vw', bottom: -delta + 'px' });
        }
      };
      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
        if (type === 'column') {
          const value = coords.width + delta;
          cells.forEach((cell) => (cell.style.width = value + 'px'));
          $parent.css({
            width: value + 'px',
          });
          $resizer.css({ opacity: '', height: '', right: '' });
        } else {
          const value = coords.height + delta;
          $parent.css({
            height: value + 'px',
          });
          $resizer.css({ opacity: '', width: '', bottom: '' });
        }
      };
    }
  }
}
