export class Card {
  constructor({ data, handleCardClick }, selector) {
    this.data = data;
    this.selector = selector;
    this.handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this.selector)
      .content
      .querySelector('.elements__card-container')
      .cloneNode(true);
    return cardElement
  }
  _removeCardFromPage() {
    this._element.remove();
    this._element = null;
  }
  _toggleLikeOnCard() {
    this._likeButton.classList.toggle('elements__like_active');
  }
  _addEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._toggleLikeOnCard(evt);
    });
    this._removeButton.addEventListener('click', (evt) => {
      this._removeCardFromPage(evt);
    });
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.elements__like');
    this._removeButton = this._element.querySelector('.elements__delete');
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardText = this._element.querySelector('.elements__text');
    this._cardImage.src = this.data.link;
    this._cardImage.alt = this.data.place;
    this._cardText.textContent = this.data.place;
    this._addEventListeners();
    return this._element
  }
}
