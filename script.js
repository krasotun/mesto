// Переменные для работы с   поп-апом
const buttonEditInfo = document.querySelector('.profile__edit-button');
const buttonClosePopup = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

// Переменные для работы с формой
const profileTitleText = document.querySelector('.profile__title');
const profileSubTitleText = document.querySelector('.profile__subtitle');

// Находим форму в DOM
const formElement = document.querySelector('.form');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

// Объявляем функцию для открытия поп-апа
function showPopUp() {
  popup.classList.add("popup_opened"); // Показываем поп-ап
  letDefaultVariables(); // Заполняем дефолтные значения
}

// Объявляем функцию для подстановки изначальных значений в поля формы
function letDefaultVariables() {
  nameInput.value = profileTitleText.textContent;
  jobInput.value = profileSubTitleText.textContent;
}

// Объявляем функцию для закрытия поп-апа
function hidePopUp() {
  popup.classList.remove("popup_opened");
}

// Событие открытие поп-апа
buttonEditInfo.addEventListener('click', showPopUp);

// Событие закрытие поп-апа
buttonClosePopup.addEventListener('click', hidePopUp);

// Работа с формой

// Обработчик «отправки» формы
function editAccountInfo(evt) {
  evt.preventDefault(); //
  profileTitleText.textContent = nameInput.value;
  profileSubTitleText.textContent = jobInput.value;
  hidePopUp();
}

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', editAccountInfo);
