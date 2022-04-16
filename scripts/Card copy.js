import {
  openPopupCard
} from './index.js';

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
  _removeCardFromPage() { // Функция "Урна"
    this._element.remove();
    this._element = null;
  }
  _toggleLikeOnCard() { // Функция Лайк
    this._likeButton.classList.toggle('elements__like_active');
  }
  _openNewPopup() { // Открываем попап
    openPopupCard(this.name, this.link);
  }
  _addEventListeners() { // Навешиваем события
    this._likeButton.addEventListener('click', (evt) => {
      this._toggleLikeOnCard(evt);
    });
    this._removeButton.addEventListener('click', (evt) => {
      this._removeCardFromPage(evt);
    });
    this._cardImage.addEventListener('click', (evt) => {
      this._openNewPopup(evt);
    });
  }
  generateCard() { // Создаем карточку
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.elements__like');
    this._removeButton = this._element.querySelector('.elements__delete');
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardText = this._element.querySelector('.elements__text');

    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._cardText.textContent = this.name;

    this._addEventListeners();
    return this._element
  }
}
