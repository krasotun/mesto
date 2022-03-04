// Объект с исходными данными
const obj = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
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
  input.addEventListener('input', () => console.log(input.validationMessage));
};

// Проверка валидности введенных данных
const checkValidity = (input) => {
  if (input.validity.valid) {
    // скрыть ошибку под полем
  } else {
    // показать ошибку под полем
  }
};
enableValidation(obj);



// Показать ошибку под полем
const showInputError = (input) => {

};

showInputError(formTest);
// Скрыть ошибку под полем
