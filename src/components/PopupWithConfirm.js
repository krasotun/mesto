import { Popup } from "./Popup.js";
export class PopupWithConfirm extends Popup {
  constructor(selector, { handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = selector.querySelector('.form');
    this._submitBinded = this._submitEvent.bind(this);
    console.log(this._form);
  }

  _submitEvent(event) {
    event.preventDefault();
    this._handleSubmit(this._data);
  }
  setEventListeners() {
    this._form.addEventListener('submit', this._submitBinded);
    super.setEventListeners();
  }
  open(data) {
    this._data = data;
    super.open();
  }
}

