// Объект с исходными данными
const obj = {
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
    setEventListiners(form);
  });
}
enableValidation(obj);

// Функция для "навешенивания" событий на инпуты
function setEventListiners(form) {
  const inputList = Array.from(form.querySelectorAll(obj.inputSelector));
  const submitButton = form.querySelector(obj.submitButtonSelector);
  /* toggleButtonState(inputList, submitButton); // задаем изначальное состояние кнопки */
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement); // проверяем инпут
      toggleButtonState(inputList, submitButton); // переключаем кнопку
    });
  });
}


// Проверяем валидность иппута
function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement);
  } else {
    hideInputError(inputElement);
  }
}

// Показываем ошибку для невалидного инпута
function showInputError(inputElement) {
  const formInputElementName = inputElement.getAttribute('name');
  const errorName = document.getElementById(`${formInputElementName}-error`);
  errorName.classList.add(obj.errorClass);
  errorName.textContent = inputElement.validationMessage;
}

// Скрываем ошибку у валидного инпута
function hideInputError(inputElement) {
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
function toggleButtonState(inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(obj.inactiveButtonClass);
    submitButton.setAttribute('disabled', true);
  } else {
    submitButton.classList.remove(obj.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  }
}
