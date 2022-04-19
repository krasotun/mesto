export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  addItem(element) {
    const renderedItem = this._renderer(element);
    this._container.prepend(renderedItem);
  }
  renderItems() {
    this._items.forEach((item) => {
      this.addItem(item);
    });
  }
}
