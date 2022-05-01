export class PopupWithConfirm extends Popup {
  constructor(selector, { handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }
}

