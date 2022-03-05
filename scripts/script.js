// Выбираем страницу
const page = document.querySelector('.page');

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

// Находим поля формы для добавления карточки   в DOM
const placeInput = formAddElement.querySelector('#place');
const linkInput = formAddElement.querySelector('#link');

// Функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add('popup_opened');

}

// Функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}


// Функция для открытия попапа редактирования информации
function openPopupEdit() {
  openPopup(popupEdit);
  setDefaultVariables();
}

// События для поп-апа редактирования информации
buttonEditInfo.addEventListener('click', openPopupEdit);
buttonClosePopupEDit.addEventListener('click', () => closePopup(popupEdit));


// События для поп-апа добавления карточки
buttonAddNewCard.addEventListener('click', () => openPopup(popupAdd));
buttonClosePopupAdd.addEventListener('click', () => closePopup(popupAdd));

// Событие для поп-апа по клику на карточке
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard));

// Функция "Урна"
function removeCardfromPage(element) {
  element.closest('article').remove();
}

// Функция like
function toggleLikeOnCard(element) {
  element.classList.toggle('elements__like_active');
}

// Функция для открытия попапа  при клике на картинку карточки
function openPopupCard(name, link) {
  popupCardImage.src = link.src;
  popupCardImage.alt = name.textContent;
  popupCardText.textContent = name.textContent;
}

// Функция для создания карточки
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.elements__card-container').cloneNode(true);
  const cardElementText = cardElement.querySelector('.elements__text');
  const cardElementLike = cardElement.querySelector('.elements__like');
  const cardElementRemove = cardElement.querySelector('.elements__delete');
  const cardElementImage = cardElement.querySelector('.elements__image');
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElementText.textContent = name;
  cardElementLike.addEventListener('click', () => {
    toggleLikeOnCard(cardElementLike);
  });
  cardElementRemove.addEventListener('click', () => {
    removeCardfromPage(cardElementRemove);
  });
  cardElementImage.addEventListener('click', () => {
    openPopupCard(cardElementText, cardElementImage);
    closePopup(popupCard);
  });
  return cardElement;
}

//Функция для вставки карточек созданных из массива
function firstAddCards() {
  initialCards.forEach((item) => {
    const newCardFromTemplate = createCard(item.name, item.link);
    elements.append(newCardFromTemplate);
  });
}
firstAddCards();

// Функция для вставки карточки из формы
function addCardFromForm() {
  const newCardFromTemplate = createCard(placeInput.value, linkInput.value);
  elements.prepend(newCardFromTemplate);
}

// Объявляем функцию для подстановки изначальных значений в поля формы
function setDefaultVariables() {
  nameInput.value = profileTitleText.textContent;
  jobInput.value = profileSubTitleText.textContent;
}

// Объявляем функцию для очистки значений после отправки формы
function clearFormAddDefaultValues() {
  placeInput.value = '';
  linkInput.value = '';
}

// Работа с формами

// Обработчик «отправки» формы редактирования
function editAccountInfo() {
  profileTitleText.textContent = nameInput.value;
  profileSubTitleText.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Обработчик «отправки» формы добавления карточки
function appendNewCard() {
  addCardFromForm();
  clearFormAddDefaultValues();
  closePopup(popupAdd);
}

// Прикрепляем обработчик к форме редактирования:
formEditElement.addEventListener('submit', editAccountInfo);

// Прикрепляем обработчик к форме создания карточки:
formAddElement.addEventListener('submit', appendNewCard);

// Закрытие попапа по клику по оверлею
page.addEventListener('click', (evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}));

// Закрытие попапа по esc
page.addEventListener('keydown', (evt => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}));
