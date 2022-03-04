// Объект с исходными данными
const obj = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

// Показать ошибку под полем
const showInputError = (input) => {
  const formInputName = input.getAttribute('name');
  const errorName = document.getElementById(`${formInputName}-error`);
  errorName.classList.add(obj.errorClass);
  errorName.textContent = input.validationMessage;
};

// Скрыть ошибку под полем
const hideInputError = (input) => {
  const formInputName = input.getAttribute('name');
  const errorName = document.getElementById(`${formInputName}-error`);
  errorName.classList.remove(obj.errorClass);
  errorName.textContent = '';
};

// Функция включения валидации
function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector)); // Выбираем все формы
  forms.forEach(form => { // Перебираем  формы
    const inputs = form.querySelectorAll(obj.inputSelector); //Выбираем все инпуты
    inputs.forEach(input => {
      addEventListenersForInputs(input);
    });
  });
}

// Наложение обработчиков на поля форм
const addEventListenersForInputs = (input) => {
  input.addEventListener('input', () => {
    checkInputValidity(input);
    checkFormValidity(form);
  });
};

// Проверка валидности введенных данных в конкретный инпут
const checkInputValidity = (input) => {
  if (input.validity.valid) {
    hideInputError(input);
  } else {
    showInputError(input);
  }
};
// Проверка на валидность всех инпутов в  форме
const checkFormValidity = (form) => {
  const inputs = form.querySelectorAll(obj.inputSelector);
  inputs.forEach(input => {
    if (!input.validity.valid) {
      return false
    } else {
      return true
    }
  });
};

enableValidation(obj);

// Придумаать, как передавать нужную кнопку
const button = document.querySelector('.form-edit__submit-button');

//Делаем кнопку сабмита  активной
const setSubmitButtonActive = (button) => {
  if (checkFormValidity(form)) {
    button.classList.remove(obj.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

// Делаем кнопку сабмита неактивной
const setSubmitButtonNotActive = (button) => {
  button.classList.add(obj.inactiveButtonClass);
  button.setAttribute('disabled', true);
};
