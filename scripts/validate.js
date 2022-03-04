const obj = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
};

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
  input.addEventListener('input', evt => console.log(evt));
};

enableValidation(obj);
