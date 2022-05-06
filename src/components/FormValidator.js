export class FormValidator {
  constructor(obj, formName) {
    this.formName = formName;
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._inputErrorClass = obj.inputErrorClass;
    this._errorClass = obj.errorClass;
    this._inputList = Array.from(this.formName.querySelectorAll(this._inputSelector));
    this._submitButton = this.formName.querySelector(this._submitButtonSelector);
  }
  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
    this.formName.addEventListener('reset', () => {
      this._hideAllErrors();
      console.log('FormResetted');
    })
  }
  _hideAllErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const formInputElementName = inputElement.getAttribute('name');
    const errorName = document.getElementById(`${formInputElementName}-error`);
    errorName.classList.add(this._errorClass);
    errorName.textContent = inputElement.validationMessage;
  }
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    const formInputElementName = inputElement.getAttribute('name');
    const errorName = document.getElementById(`${formInputElementName}-error`);
    errorName.classList.remove(this._errorClass);
    errorName.textContent = '';
  }
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
  enableValidation() {
    this.formName.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
