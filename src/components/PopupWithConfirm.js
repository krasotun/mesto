import { Popup } from "./Popup.js";
export class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = popupSelector.querySelector('.form');
    this._submitBinded = this._submitEvent.bind(this);
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

