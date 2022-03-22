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
    console.log(cardElement);
    return cardElement
  }
  _setEventListeners() { // вешаем обработчки событий
    this.element = this._getTemplate();
    const cardElementLike = this.element.querySelector('.elements__like');
    const cardElementRemove = this.element.querySelector('.elements__delete');
    const cardElementImage = this.element.querySelector('.elements__image');
    cardElementLike.addEventListener('click', () => {
      toggleLikeOnCard(cardElementLike);
    });
    cardElementRemove.addEventListener('click', () => {
      removeCardfromPage(cardElementRemove);
    });
    cardElementImage.addEventListener('click', () => {
      openPopupCard(cardElementText, cardElementImage);
    });


  }
  generateCard() {
    this.element = this._getTemplate();
    const cardElementText = this.element.querySelector('.elements__text');
    const cardElementImage = this.element.querySelector('.elements__image');
    cardElementImage.src = this.link;
    cardElementImage.alt = this.name;
    cardElementText.textContent = this.name;
    cardElementImage.addEventListener('click', () => {
      openPopupCard(cardElementText, cardElementImage);
    });
    return this.element
  }
}
