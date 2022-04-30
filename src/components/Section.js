export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  addItem(element) {
    const renderedItem = this._renderer(element);
    this._container.prepend(renderedItem);
  }
  renderItems(data) {
    data.forEach((item) => {
      this.addItem(item);
    });
  }
}
