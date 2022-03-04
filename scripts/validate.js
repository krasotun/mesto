const formEditItem = formEditElement.querySelectorAll('.form__item');
console.log(formEditItem);


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = ({
  formSelector: '.form',
  inputSelector: '.form__item"',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_type_error',
  errorClass: 'form__error_visible'
});
