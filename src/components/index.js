import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, validationObject } from './data.js';
import { Section } from './Section.js';
import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import './../pages/index.css';


const buttonEditInfo = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup-edit');
const buttonAddNewCard = document.querySelector('.profile__post-button');
const popupAdd = document.querySelector('.popup-add');
const popupCard = document.querySelector('.popup-card');
const formEditElement = document.querySelector('.form-edit');
const formAddElement = document.querySelector('.form-add');
const nameInput = formEditElement.querySelector('#name');
const jobInput = formEditElement.querySelector('#job');
const cardListSelector = '.elements';
const validateFormEdit = new FormValidator(validationObject, formEditElement);
const validateFormAdd = new FormValidator(validationObject, formAddElement);

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
})

const newPopupEdit = new PopupWithForm(popupEdit,
  {
    handleSubmit: (formData) => {
      userInfo.setUserInfo(formData);
      console.log(formData);
      newPopupEdit.close();
    }
  }
)

buttonEditInfo.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
  newPopupEdit.open();
});

const newPopupAddNewCard = new PopupWithForm(popupAdd,
  {
    handleSubmit: (formData) => {
      cards.addItem(formData);
      newPopupAddNewCard.close();
    }
  }
)

buttonAddNewCard.addEventListener('click', () => {
  newPopupAddNewCard.open();
});

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item, handleCardClick: () => {
        const newPopupWithImage = new PopupWithImage(popupCard);
        newPopupWithImage.open(item.name, item.link);
      }
    }, '#card-template');
    const newCardFromTemplate = card.generateCard();
    return newCardFromTemplate;
  }
}, cardListSelector);

cards.renderItems();

validateFormEdit.enableValidation();
validateFormAdd.enableValidation();

