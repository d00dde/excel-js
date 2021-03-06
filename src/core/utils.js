export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill('').map((_, index) => start + index);
}
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}
export function camelToKebab(camelCase) {
  return camelCase.replace(/[A-Z]/g, (match) => {
    return `-${match.toLowerCase()}`;
  });
}
export function toInlineStyles(styles = {}) {
  return Object.keys(styles).reduce((result, style) => {
    return result + `${camelToKebab(style)}: ${styles[style]}; `;
  }, '');
}
export function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}
export function preventDefault(event) {
  event.preventDefault();
}
