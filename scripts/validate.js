// Объект с исходными данными
const validationObject = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

// Функция для валидации
function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector)); // Выбираем все формы на странице
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => { // Отменяем дефолтное поведение
      evt.preventDefault();
    });
    setEventListiners(form, validationObject);
  });
}
/* enableValidation(validationObject); */

// Функция для "навешенивания" событий на инпуты
function setEventListiners(form, obj) {
  const inputList = Array.from(form.querySelectorAll(obj.inputSelector));
  const submitButton = form.querySelector(obj.submitButtonSelector);
  /* toggleButtonState(inputList, submitButton); // задаем изначальное состояние кнопки */
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement); // проверяем инпут
      toggleButtonState(inputList, submitButton, validationObject); // переключаем кнопку
    });
  });
}


// Проверяем валидность иппута
function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, validationObject);
  } else {
    hideInputError(inputElement, validationObject);
  }
}

// Показываем ошибку для невалидного инпута
function showInputError(inputElement, obj) {
  const formInputElementName = inputElement.getAttribute('name');
  const errorName = document.getElementById(`${formInputElementName}-error`);
  errorName.classList.add(obj.errorClass);
  errorName.textContent = inputElement.validationMessage;
}

// Скрываем ошибку у валидного инпута
function hideInputError(inputElement, obj) {
  const formInputElementName = inputElement.getAttribute('name');
  const errorName = document.getElementById(`${formInputElementName}-error`);
  errorName.classList.remove(obj.errorClass);
  errorName.textContent = '';
}

// Проверяем валидность всех инпутов в форме
// Применяем к массиву метод some - если встречаем хоть один элемент - отдает true
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  });
}

// Переключаем состояние кнопки сабмита
function toggleButtonState(inputList, submitButton, obj) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(obj.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(obj.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}
