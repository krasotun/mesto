import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationObject } from '../utils/validationObject.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

import './../pages/index.css';

const buttonEditInfo = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup-edit');
const buttonAddNewCard = document.querySelector('.profile__post-button');
const popupAdd = document.querySelector('.popup-add');
const popupCard = document.querySelector('.popup-card');
const formEditElement = document.querySelector('.form-edit');
const formAddElement = document.querySelector('.form-add');
const nameInput = formEditElement.querySelector('#name');
const jobInput = formEditElement.querySelector('#about');
const cardListSelector = '.elements';
const validateFormEdit = new FormValidator(validationObject, formEditElement);
const validateFormAdd = new FormValidator(validationObject, formAddElement);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '99499664-2026-410c-a4a5-b475d910be99',
    'Content-Type': 'application/json'
  }
});
validateFormEdit.enableValidation();
validateFormAdd.enableValidation();

const createCard = (data) => {
  const card = new Card({
    data, handleCardClick: () => {
      newPopupWithImage.open(data.name, data.link);
    }
  }, '#card-template'
  );
  return card
}

const cards = new Section({
  renderer: (initialCards) => {
    const card = createCard(initialCards);
    const newCardFromTemplate = card.generateCard();
    return newCardFromTemplate;
  }
}, cardListSelector)

api.getInitialInfo()
  .then((data) => {
    const [initialInfo, initialCards] = data;
    userInfo.setUserInfo(initialInfo);
    userInfo.setUserAvatar(initialInfo);
    cards.renderItems(initialCards);
  });

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
})
const newPopupEdit = new PopupWithForm(popupEdit,
  {
    handleSubmit: (formData) => {
      api.setUserInfo(formData);
      userInfo.setUserInfo(formData);
      newPopupEdit.close();
    }
  }
)

buttonEditInfo.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
  validateFormEdit.toggleButtonState();
  newPopupEdit.open();
});

const newPopupAddNewCard = new PopupWithForm(popupAdd,
  {
    handleSubmit: (formData) => {
      cards.addItem(formData);
    }
  }
)
buttonAddNewCard.addEventListener('click', () => {
  validateFormAdd.toggleButtonState();
  newPopupAddNewCard.open();
});

const newPopupWithImage = new PopupWithImage(popupCard);







