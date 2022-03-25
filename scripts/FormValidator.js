export class FormValidator {
  constructor(obj, formName) {
    this.formName = formName;
    this._formSelector = obj.formSelector;
    this._inputSelector = obj.inputSelector;
    this._submitButtonSelector = obj.submitButtonSelector;
    this._inactiveButtonClass = obj.inactiveButtonClass;
    this._input_errorClass = obj.input_errorClass;
    this._errorClass = obj.errorClass;
  }
  _setEventListeners() { // Устанавливаем обработчики событий
    this._inputList = Array.from(this.formName.querySelectorAll(this._inputSelector));
    this._submitButton = this.formName.querySelector(this._submitButtonSelector);
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement); // проверяем инпут
        this.toggleButtonState(); // переключаем кнопку
      });
    });
  }
  _checkInputValidity(inputElement) { // Проверяем инпут
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }
  _showInputError(inputElement) { // Показываем ошибку для невалидного инпута
    const formInputElementName = inputElement.getAttribute('name');
    const errorName = document.getElementById(`${formInputElementName}-error`);
    errorName.classList.add(this._errorClass);
    errorName.textContent = inputElement.validationMessage;
  }
  _hideInputError(inputElement) { // Скрываем ошибку у валидного инпута
    const formInputElementName = inputElement.getAttribute('name');
    const errorName = document.getElementById(`${formInputElementName}-error`);
    errorName.classList.remove(this._errorClass);
    errorName.textContent = '';
  }
  _hasInvalidInput() { // Проверяем валмидность у всех инпутов
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }
  toggleButtonState() { // Переключаем состояние кнопки сабмита
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }
  enableValidation() { //  Функция для валидации
    this.formName.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
