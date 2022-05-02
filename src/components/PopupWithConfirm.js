import { Popup } from "./Popup.js";
export class PopupWithConfirm extends Popup {
  constructor(selector, { handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = selector.querySelector('.form');
    this._submitBinded = this._handleSubmit.bind(this);
    console.log(this._form);
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitBinded);
  }
}

