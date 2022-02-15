// Переменные для работы с поп-апом редактирования информации
const buttonEditInfo = document.querySelector('.profile__edit-button');
const buttonClosePopupEDit = document.querySelector('.popup-edit__close');
const popupEdit = document.querySelector('.popup-edit');

// Переменные для работы с поп-апом добавления карточки
const buttonAddNewCard = document.querySelector('.profile__post-button');
const buttonClosePopupAdd = document.querySelector('.popup-add__close');
const popupAdd = document.querySelector('.popup-add');

// Переменные для работы с попапом из карточки
const buttonClosePopupCard = document.querySelector('.popup-card__close');
const popupCard = document.querySelector('.popup-card');
const popupCardImage = popupCard.querySelector('.popup-card__image');
const popupCardText = popupCard.querySelector('.popup-card__text');


// Переменные для работы с формой отправки информации
const profileTitleText = document.querySelector('.profile__title');
const profileSubTitleText = document.querySelector('.profile__subtitle');

// Находим форму для отправки информации в DOM
const formEditElement = document.querySelector('.form-edit');

// Находим поля формы для отправки информации   в DOM
const nameInput = formEditElement.querySelector('#name');
const jobInput = formEditElement.querySelector('#job');

// Находим форму для добавления карточки в DOM
const formAddElement = document.querySelector('.form-add');


// Выбираем секцию, в которой будем создавать карточки
const elements = document.querySelector('.elements');

// Выбираем шаблон (template) карточки
const cardTemplate = document.querySelector('#card-template').content;

//Функция для переключения открыт/закрыт класса поп-апа
function togglePopup(popupName) {
  popupName.classList.toggle('popup_opened');
}
// Функция для открытия попапа редактирования информации

function openPopupEdit() {
  togglePopup(popupEdit);
  setDefaultVariables();
}

// События для поп-апа редактирования информации
buttonEditInfo.addEventListener('click', openPopupEdit);
buttonClosePopupEDit.addEventListener('click', () => togglePopup(popupEdit));

// События для поп-апа добавления карточки
buttonAddNewCard.addEventListener('click', () => togglePopup(popupAdd));
buttonClosePopupAdd.addEventListener('click', () => togglePopup(popupAdd));

// Событие для поп-апа по клику на карточке
buttonClosePopupCard.addEventListener('click', () => togglePopup(popupCard));

// Функция для открытия попапа  при клике на картинку карточки (используем Event Delegation)
elements.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__image')) {
    popupCardImage.src = evt.target.src;
    popupCardImage.alt = evt.target.alt;
    popupCardText.textContent = evt.target.alt;
    togglePopup(popupCard);
  }
});

// Функция "Урна" (используем Event Delegation)
elements.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__delete')) {
    evt.target.closest('article').remove();
  }
});

// Функция like (используем Event Delegation)
elements.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('elements__like')) {
    evt.target.classList.toggle('elements__like_active');
  }
});

// Находим поля формы для добавления карточки   в DOM
const placeInput = formAddElement.querySelector('#place');
const linkInput = formAddElement.querySelector('#link');
// Функция для создания карточки
function createCard(item) {
  const cardElement = cardTemplate.querySelector('.elements__card-container').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.elements__image');
  const cardElementText = cardElement.querySelector('.elements__text');
  cardElementImage.src = item.link;
  cardElementImage.alt = item.name;
  cardElementText.textContent = item.name;
  return cardElement;
}
//Функция для вставки карточек созданных из массива
function firstAddCards() {
  initialCards.forEach((item) => {
    const newCardFromTemplate = createCard(item);
    elements.append(newCardFromTemplate);
  });
}
firstAddCards();

// Функция для первичного заполнения карточками из массива
/* const firstAddCards = () => {
  initialCards.forEach((item, index, array) => { // Парсим массив
    const newCardFromTemplate = cardTemplate.querySelector('.elements__card-container').cloneNode(true); // Клонируем шаблон
    newCardFromTemplate.querySelector('.elements__image').src = array[index].link; // Заполняем контентом
    newCardFromTemplate.querySelector('.elements__image').alt = array[index].name;
    newCardFromTemplate.querySelector('.elements__text').textContent = array[index].name;
    elements.append(newCardFromTemplate); // выводим на страницу
  });
};
firstAddCards(); */

/* // Функция для создания  карточки из формы
const createCardFromForm = () => {
  const newCardFromTemplate = cardTemplate.querySelector('.elements__card-container').cloneNode(true);
  newCardFromTemplate.querySelector('.elements__image').src = linkInput.value;
  newCardFromTemplate.querySelector('.elements__image').alt = placeInput.value;
  newCardFromTemplate.querySelector('.elements__text').textContent = placeInput.value;
  elements.prepend(newCardFromTemplate);
}; */

// Объявляем функцию для подстановки изначальных значений в поля формы
function setDefaultVariables() {
  nameInput.value = profileTitleText.textContent;
  jobInput.value = profileSubTitleText.textContent;
}

// Объявляем функцию для очистки значений после отправки
function clearFormAddDefaultValues() {
  placeInput.value = '';
  linkInput.value = '';
}

// Работа с формами

// Обработчик «отправки» формы редактирования
function editAccountInfo(evt) {
  evt.preventDefault(); //
  profileTitleText.textContent = nameInput.value;
  profileSubTitleText.textContent = jobInput.value;
  togglePopup(popupEdit);
}

// Обработчик «отправки» формы добавления карточки
function appendNewCard(evt) {
  evt.preventDefault(); //
  createCardFromForm();
  clearFormAddDefaultValues();
  togglePopup(popupAdd);
}


// Прикрепляем обработчик к форме редактирования:
formEditElement.addEventListener('submit', editAccountInfo);

// Прикрепляем обработчик к форме создания карточки:
formAddElement.addEventListener('submit', appendNewCard);
