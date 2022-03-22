export class Card {
  constructor(name, link, cardSelector) {
    this.name = name;
    this.link = link;
    this.cardSelector = cardSelector;
  }
  _getTemplate() { // получаем шаблон
    const cardElement = document
      .querySelector(this.cardSelector)
      .content
      .querySelector('.elements__card-container')
      .cloneNode(true);
    return cardElement
  }
  _removeCardFromPage(card) { // Функция "Урна"
    card.closest('article').remove();
  };
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
      openPopupCard(cardElementText, cardElementImage);
    });
    cardElementLike.addEventListener('click', () => {
      toggleLikeOnCard(cardElementLike);
    });
    cardElementRemove.addEventListener('click', () => {
      this._removeCardFromPage(cardElementRemove);
    });
    return this.element
  }
}
