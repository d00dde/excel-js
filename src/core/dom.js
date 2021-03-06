class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }
  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }
  clear() {
    this.html('');
    return this;
  }
  append(child) {
    if (child instanceof Dom) {
      child = child.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(child);
    } else {
      this.$el.appendChild(child);
    }
    return this;
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
  closest(selector) {
    return $(this.$el.closest(selector));
  }
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
  find(selector) {
    return $(this.$el.querySelector(selector));
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }
  get data() {
    return this.$el.dataset;
  }
  id(delim = null) {
    if (delim) {
      const parsed = this.id().split(delim);
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }
  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
    return this;
  }
  getStyles(styles = []) {
    return styles.reduce((res, style) => {
      res[style] = this.$el.style[style];
      return res;
    }, {});
  }
  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }
  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
  focus() {
    this.$el.focus();
    return this;
  }
  attr(name, value) {
    if (!(value === undefined)) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }
  get isEmpty() {
    return !this.$el;
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
