export class Card {
  constructor({ data, ownerId, handleCardClick, handleDeleteCard }, selector) {
    this.data = data;
    this.selector = selector;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this._ownerId = ownerId;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this.selector)
      .content
      .querySelector('.elements__card-container')
      .cloneNode(true);
    return cardElement
  }
  _removeCardFromPage(card) {
    card.remove();
    card = null;
  }
  deleteCard() {
    this._removeCardFromPage(this._element);
  }
  _toggleLikeOnCard() {
    this._likeButton.classList.toggle('elements__like_active');
  }
  _addEventListeners() {
    this._likeButton.addEventListener('click', (evt) => {
      this._toggleLikeOnCard(evt);
    });
    this._removeButton.addEventListener('click', this.handleDeleteCard);
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  }
  _checkOwner() {
    return (this._ownerId === 'a79fb8507009fd535bb760e3')
  }
  _changeDeleteButtonVisibility() {
    if (!this._checkOwner()) {
      this._removeButton.classList.add('elements__delete_hidden')
    }
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.elements__like');
    this._removeButton = this._element.querySelector('.elements__delete');
    this._cardImage = this._element.querySelector('.elements__image');
    this._cardText = this._element.querySelector('.elements__text');
    this._likeCount = this._element.querySelector('.elements__like-count');
    this._cardImage.src = this.data.link;
    this._cardImage.alt = this.data.name;
    this._cardText.textContent = this.data.name;
    this._likeCount.textContent = this.data.likes.length;
    this._changeDeleteButtonVisibility();
    this._addEventListeners();
    return this._element
  }
}
