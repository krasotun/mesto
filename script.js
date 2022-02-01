// Работа с поп-апом
let buttonEditInfo = document.querySelector('.button_type_edit-info');
let buttonClosePopup = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');

function showPopUp() {
  popup.classList.add("popup_opened");
}

function hidePopUp() {
  popup.classList.remove("popup_opened");
}


buttonEditInfo.addEventListener('click', showPopUp);
buttonClosePopup.addEventListener('click', hidePopUp);

// Работа с формой

// Находим форму в DOM
let formElement = document.querySelector('form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('#name');
let jobInput = formElement.querySelector('#job');


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;


  // Выберите элементы, куда должны быть вставлены значения полей
  let profileTitleText = document.querySelector('.profile__title');
  let profileSubTitleText = document.querySelector('.profile__subtitle');

  // Вставьте новые значения с помощью textContent
  profileTitleText.textContent = nameInputValue;
  profileSubTitleText.textContent = jobInputValue;
  hidePopUp();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
