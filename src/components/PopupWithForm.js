import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = popupSelector.querySelector('.form');
    this._formSubmitButton = this._form.querySelector('.form__submit-button');
    this._formSubmitButtonText = this._formSubmitButton.textContent;
    this._inputList = this._form.querySelectorAll('.form__item');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmit(this._getInputValues());
    });
  }
  toggleSubmitButtonText(status) {
    if (status) {
      this._formSubmitButton.textContent = 'Сохранение...'
    } else {
      this._formSubmitButton.textContent = this._formSubmitButtonText;
    }
  }
  close() {
    this._form.reset();
    super.close();
  }
};

