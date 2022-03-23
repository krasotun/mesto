import {
  openPopup
} from "./index.js";

export class Card {
  constructor(name, link, cardSelector) {
    this.name = name;
    this.link = link;
    this.cardSelector = cardSelector;
  }
  _getTemplate() { // Получаем шаблон
    const cardElement = document
      .querySelector(this.cardSelector)
      .content
      .querySelector('.elements__card-container')
      .cloneNode(true);
    return cardElement
  }
  _removeCardFromPage(card) { // Функция "Урна"
    card.closest('article').remove();
  }
  _toggleLikeOnCard(card) { // Функция Лайк
    card.classList.toggle('elements__like_active');
  }
  _openPopupCard(name, link) { // Открытие попапа
    const popupCard = document.querySelector('.popup-card');
    const popupCardImage = popupCard.querySelector('.popup-card__image');
    const popupCardText = popupCard.querySelector('.popup-card__text');
    popupCardImage.src = link.src;
    popupCardImage.alt = name.textContent;
    popupCardText.textContent = name.textContent;
    openPopup(popupCard);
  }
  _addEventListeners(like, remove) {
    like.addEventListener('click', () => {
      this._toggleLikeOnCard(like);
    });
    remove.addEventListener('click', () => {
      this._removeCardFromPage(remove);
    });

  }
  generateCard() {
    this.element = this._getTemplate();
    const cardElementText = this.element.querySelector('.elements__text');
    const cardElementImage = this.element.querySelector('.elements__image');
    const cardElementLike = this.element.querySelector('.elements__like');
    const cardElementRemove = this.element.querySelector('.elements__delete');
    cardElementImage.src = this.link;
    cardElementImage.alt = this.name;
    cardElementText.textContent = this.name;
    cardElementImage.addEventListener('click', () => {
      this._openPopupCard(cardElementText, cardElementImage);
    });

    this._addEventListeners(cardElementLike, cardElementRemove);
    return this.element
  }
}
