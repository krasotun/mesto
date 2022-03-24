import {
  openPopupCard,
  openPopup
}
from "./index.js";

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
    this._element.querySelector('.elements__delete').closest('article').remove();
  }
  _toggleLikeOnCard() { // Функция Лайк
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }
  _openNewPopup() { // Открываем попап
    const test1 = 12;
    const test2 = 15;
    openPopupCard(this.name, this.link);
  }
  _addEventListeners() { // Навешиваем события
    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._toggleLikeOnCard();
    });
    this._element.querySelector('.elements__delete').addEventListener('click', () => {
      this._removeCardFromPage();
    });
    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._openNewPopup();
    });
  }

  generateCard() { // Создаем карточку
    this._element = this._getTemplate();
    this._element.querySelector('.elements__image').src = this.link;
    this._element.querySelector('.elements__image').alt = this.name;
    this._element.querySelector('.elements__text').textContent = this.name;
    this._addEventListeners();
    return this._element
  }
}
