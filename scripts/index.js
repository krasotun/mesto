import {
  Card
} from './Card.js';
import {
  FormValidator
} from './FormValidator.js';
import {
  initialCards,
  validationObject
} from './data.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';



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
// Находим формы
const formEditElement = document.querySelector('.form-edit'); // редактирования инфо
const formAddElement = document.querySelector('.form-add'); // добавление карточки
// Находим поля формы для отправки информации   в DOM
const nameInput = formEditElement.querySelector('#name');
const jobInput = formEditElement.querySelector('#job');
// Выбираем секцию, в которой будем создавать карточки
const elements = document.querySelector('.elements');
// Находим поля формы для добавления карточки   в DOM
const placeInput = formAddElement.querySelector('#place');
const linkInput = formAddElement.querySelector('#link');

// Функция для открытия попапа редактирования информации
function openPopupEdit() {
  openPopup(popupEdit);
  setDefaultVariables();
}

// Попап для редактирования информации
const newPopupEdit = new PopupWithForm(popupEdit,
  {
    submit: () => console.log('Edit form submitted')
  }
)
buttonEditInfo.addEventListener('click', () => {
  newPopupEdit.open();
});


// Попап для добавления карточки
const newPopupAddNewCard = new PopupWithForm(popupAdd,
  {
    submit: () => console.log('Add form submitted')
  }
)
buttonAddNewCard.addEventListener('click', () => {
  newPopupAddNewCard.open();
});

/* buttonClosePopupAdd.addEventListener('click', () => closePopup(popupAdd)); */

//Функция для вставки карточек созданных из массива
const cardListSelector = '.elements';
const firstAddCards = new Section({
  items: initialCards,
  renderer: (items) => {
    const card = new Card({
      data: items, handleCardClick: () => {
        const newPopupWithImage = new PopupWithImage(popupCard);
        newPopupWithImage.open(items.name, items.link);
      }
    }, '#card-template');
    const newCardFromTemplate = card.generateCard();
    firstAddCards.addItem(newCardFromTemplate);
  }
}, cardListSelector);
firstAddCards.renderItems();



// Функция для вставки карточки из формы
function addCardFromForm() {
  elements.prepend(createCard(placeInput.value, linkInput.value, '#card-template'));
}

// Объявляем функцию для подстановки изначальных значений в поля формы
function setDefaultVariables() {
  nameInput.value = profileTitleText.textContent;
  jobInput.value = profileSubTitleText.textContent;
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
  formAddElement.reset();
  validateFormAdd.toggleButtonState();
  closePopup(popupAdd);
}

// Прикрепляем обработчик к форме редактирования:
formEditElement.addEventListener('submit', editAccountInfo);

// Прикрепляем обработчик к форме создания карточки:
formAddElement.addEventListener('submit', appendNewCard);

// Вызов валидации форм из конструктора
const validateFormEdit = new FormValidator(validationObject, formEditElement);
validateFormEdit.enableValidation();
const validateFormAdd = new FormValidator(validationObject, formAddElement);
validateFormAdd.enableValidation();


/* // Открытие попапа по клику на карточку
export function openPopupCard(title, source) {
  popupCardImage.src = source;
  popupCardImage.alt = title;
  popupCardText.textContent = title;
  openPopup(popupCard);
} */
/*
const firstAddCards = new Section({
  items: initialCards,
  renderer: (items) => {
    const card = new Card(items.name, items.link, '#card-template');
    const newCardFromTemplate = card.generateCard();
    firstAddCards.addItem(newCardFromTemplate);
  }
}, cardListSelector); */
/* // Функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  removePopupEventListener();
} */

/* // Функция закрытия попопа по ESC
const escCode = 'Escape';

function closePopupByEsc(evt) {
  if (evt.key === escCode) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрытие попапа по клику по оверлею
document.addEventListener('click', (evt => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
})); */

/* // Событие для поп-апа по клику на карточке
buttonClosePopupCard.addEventListener('click', () => closePopup(popupCard)); */


/*
function firstAddCards() {
  initialCards.forEach((item) => {
    elements.append(createCard(item.name, item.link, '#card-template'));
  });
}
firstAddCards(); */

/* // Функция для создания карточки
function createCard(name, link, selector) {
  const card = new Card(name, link, selector);
  const newCardFromTemplate = card.generateCard();
  return newCardFromTemplate
} */


/* // Установка слушателя на popup (для закрытия по esc)
function addPopupEventListener() {
  document.addEventListener('keydown', closePopupByEsc);
}

// Удаление слушателя с popup (для закрытия по esc)
function removePopupEventListener() {
  document.removeEventListener('keydown', closePopupByEsc);
} */

/* // Функция открытия попапа
export function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  addPopupEventListener();
} */
/* buttonClosePopupEDit.addEventListener('click', () => closePopup(popupEdit)); */

