import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { validationObject } from '../utils/validationObject.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import {
  buttonEditInfo,
  buttonAddNewCard,
  buttonEditAvatar,
  popupEdit,
  popupAdd,
  popupConfirm,
  popupCard,
  popupEditAvatar,
  formEditElement,
  nameInput,
  jobInput,
  formEditAvatar,
  avatarInput,
  formAddElement,
  cardListSelector,
} from '../utils/constants.js'
import './../pages/index.css';

let cardForDelete = null;
let userId = null;

const validateFormEdit = new FormValidator(validationObject, formEditElement);
const validateFormAdd = new FormValidator(validationObject, formAddElement);
const validateFormEditAvatar = new FormValidator(validationObject, formEditAvatar);


validateFormEdit.enableValidation();
validateFormAdd.enableValidation();
validateFormEditAvatar.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '99499664-2026-410c-a4a5-b475d910be99',
    'Content-Type': 'application/json'
  }
});

api.getInitialInfo()
  .then((data) => {
    const [initialInfo, initialCards] = data;
    userInfo.setUserInfo(initialInfo);
    userInfo.setUserAvatar(initialInfo);
    userId = initialInfo._id;
    console.log(`Мой userId: ${userId}`);
    cards.renderItems(initialCards);
  })
  .catch((error => {
    console.log(error);
  }))

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar',
})

const createCard = (data) => {
  const card = new Card({
    data, ownerId: userId, handleCardClick: () => {
      newPopupWithImage.open(data.name, data.link);
    },
    handleDeleteCard: () => {
      cardForDelete = card;
      newPopupConfirm.open(data);
    }, addLikeToServer: () => {
      api.addLike(data)
        .then((data) => {
          card.addLikeClass();
          card.setLikesCount(data);
        })
        .catch((error => {
          console.log(error);
        }))
    }, removeLikeFromServer: () => {
      api.removeLike(data)
        .then((data) => {
          card.removeLikeClass();
          card.setLikesCount(data);
        })
        .catch((error => {
          console.log(error);
        }))
    }
  },
    '#card-template'
  );
  return card
}

const cards = new Section({
  renderer: (initialCards) => {
    const card = createCard(initialCards);
    const newCardFromTemplate = card.generateCard();
    cards.addItem(newCardFromTemplate, 'append')
  }
}, cardListSelector)



const newPopupEdit = new PopupWithForm(popupEdit,
  {
    handleSubmit: (formData) => {
      newPopupEdit.toggleSubmitButtonText(true);
      api.setUserInfo(formData)
        .then((res) => {
          userInfo.setUserInfo(res);
          newPopupEdit.close();
        })
        .catch((error => {
          console.log(error);
        }))
        .finally(() => {
          newPopupEdit.toggleSubmitButtonText(false)
        })
    }
  }
)
newPopupEdit.setEventListeners();

const newPopupEditAvatar = new PopupWithForm(popupEditAvatar,
  {
    handleSubmit: (formData) => {
      newPopupEditAvatar.toggleSubmitButtonText(true);
      api.updateAvatar(formData)
        .then((res => {
          userInfo.setUserAvatar(res);
          newPopupEditAvatar.toggleSubmitButtonText(false)
          newPopupEditAvatar.close();
        }))
        .catch((error => {
          console.log(error);
        }))
        .finally(() => {
          newPopupEditAvatar.toggleSubmitButtonText(false)
        })
    }

  })
newPopupEditAvatar.setEventListeners();

const newPopupConfirm = new PopupWithConfirm(popupConfirm, {
  handleSubmit: (data) => {
    api.deleteCard(data)
      .then(() => {
        cardForDelete.deleteCard();
      })
      .then(() => {
        cardForDelete = null;
        newPopupConfirm.close();
      })
      .catch((error => {
        console.log(error);
      }))
  }
})
newPopupConfirm.setEventListeners();

buttonEditInfo.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
  validateFormEdit.toggleButtonState();
  newPopupEdit.open();
});

buttonEditAvatar.addEventListener('click', () => {
  const userAvatar = userInfo.getUserAvatar();
  avatarInput.value = userAvatar;
  validateFormEditAvatar.toggleButtonState();
  newPopupEditAvatar.open();
})

const newPopupAddNewCard = new PopupWithForm(popupAdd,
  {
    handleSubmit: (formData) => {
      newPopupAddNewCard.toggleSubmitButtonText(true);
      api.postNewCard(formData)
        .then((data) => {
          const card = createCard(data);
          const newCardFromTemplate = card.generateCard();
          cards.addItem(newCardFromTemplate, 'prepend');
          newPopupAddNewCard.toggleSubmitButtonText(false);
          newPopupAddNewCard.close();
        })
        .catch((error => {
          console.log(error);
        }))
        .finally(() => {
          newPopupAddNewCard.toggleSubmitButtonText(false)
        })


    }
  }
)
newPopupAddNewCard.setEventListeners();

buttonAddNewCard.addEventListener('click', () => {
  validateFormAdd.toggleButtonState();
  newPopupAddNewCard.open();
});

const newPopupWithImage = new PopupWithImage(popupCard);
newPopupWithImage.setEventListeners();
