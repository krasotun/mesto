export class FormValidator {
  constructor(obj, formName) {
    this.formName = formName;
    this.formSelector = obj.formSelector;
    this.inputSelector = obj.inputSelector;
    this.submitButtonSelector = obj.submitButtonSelector;
    this.inactiveButtonClass = obj.inactiveButtonClass;
    this.inputErrorClass = obj.inputErrorClass;
    this.errorClass = obj.errorClass;
  }
  _setEventListeners() { // Устанавливаем обработчики событий
    const inputList = Array.from(this.formName.querySelectorAll(this.inputSelector));
    const submitButton = this.formName.querySelector(this.submitButtonSelector);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement); // проверяем инпут
        this._toggleButtonState(inputList, submitButton); // переключаем кнопку
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
    errorName.classList.add(this.errorClass);
    errorName.textContent = inputElement.validationMessage;
  }
  _hideInputError(inputElement) { // Скрываем ошибку у валидного инпута
    const formInputElementName = inputElement.getAttribute('name');
    const errorName = document.getElementById(`${formInputElementName}-error`);
    errorName.classList.remove(this.errorClass);
    errorName.textContent = '';
  }
  _hasInvalidInput(inputList) { // Проверяем валмидность у всех инпутов
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }
  _toggleButtonState(inputList, submitButton) { // Переключаем состояние кнопки сабмита
    if (this._hasInvalidInput(inputList)) {
      submitButton.classList.add(this.inactiveButtonClass);
      submitButton.setAttribute('disabled', true);
    } else {
      submitButton.classList.remove(this.inactiveButtonClass);
      submitButton.removeAttribute('disabled');
    }
  }
  enableValidation() { //  Функция для валидации
    this.formName.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
