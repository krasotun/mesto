export class Card {
  constructor({ data, ownerId, handleCardClick, handleDeleteCard, addLikeToServer, removeLikeFromServer }, selector) {
    this.data = data;
    this.selector = selector;
    this.handleCardClick = handleCardClick;
    this.handleDeleteCard = handleDeleteCard;
    this._ownerId = ownerId;
    this._addLiketoServer = addLikeToServer;
    this._removeLikefromServer = removeLikeFromServer
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
  _addEventListeners() {
    this._likeButton.addEventListener('click', () => {
      if (this._likeButton.classList.contains('elements__like_active')) {
        this._removeLike()
      } else {
        this._addLike()
      }
    });
    this._removeButton.addEventListener('click', this.handleDeleteCard);
    this._cardImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  }
  _checkOwner() {
    return (this.data.owner._id === this._ownerId)
  }
  _changeDeleteButtonVisibility() {
    if (!this._checkOwner()) {
      this._removeButton.classList.add('elements__delete_hidden')
    }
  }
  _addLike(data) {
    this._addLikeClass()
    this._addLiketoServer(data);
  }
  _removeLike(data) {
    this._removeLikeClass()
    this._removeLikefromServer(data);
  }
  _addLikeClass() {
    this._likeButton.classList.add('elements__like_active')
  }
  _removeLikeClass() {
    this._likeButton.classList.remove('elements__like_active')
  }
  setLikesCount(data) {
    this._likeCount.textContent = data.likes.length;
  }
  _checkOwnLike() {
    this.data.likes.forEach((likeOwner) => {
      if (likeOwner._id === this._ownerId) {
        this._addLikeClass();
      }
    })
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
    this._checkOwnLike();
    this.setLikesCount(this.data);
    this._changeDeleteButtonVisibility();
    this._addEventListeners();
    return this._element
  }
}
