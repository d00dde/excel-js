import { $ } from '@core/dom';

export function resizeHandler(event, $root) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const col = $parent.data.col;
    const cells = $root.findAll(`[data-col="${col}"]`);
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
      let value;
      if (type === 'column') {
        value = coords.width + delta;
        cells.forEach((cell) => (cell.style.width = value + 'px'));
        $parent.css({
          width: value + 'px',
        });
        $resizer.css({ opacity: '', height: '', right: '' });
      } else {
        value = coords.height + delta;
        $parent.css({
          height: value + 'px',
        });
        $resizer.css({ opacity: '', width: '', bottom: '' });
      }
      resolve({
        value,
        id: type === 'column' ? $parent.data.col : null,
      });
    };
  });
}
