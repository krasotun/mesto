class Card {
  constructor(data, cardSelector) {
    this.name = data.name;
    this.link = data.link;
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
  generateCard() {
    this.element = this._getTemplate();
    const cardElementText = this.element.querySelector('.elements__text');
    const cardElementImage = this.element.querySelector('.elements__image');
    cardElementImage.src = this.link;
    cardElementImage.alt = this.name;
    cardElementText.textContent = this.name;
    return this.element
  }

}
