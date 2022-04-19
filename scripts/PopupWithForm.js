import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = popupSelector.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmit(this._getInputValues());
      this._form.reset();
    });
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  close() {
    this._form.reset();
    super.close();
  }
};

