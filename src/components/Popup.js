export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupCloseButton = this._popupSelector.querySelector('.popup__close');
    this._closeBinded = this.close.bind(this);
    this._escClose = this._handleEscClose.bind(this);
    this._overlayBinded = this._handleOverlayClose.bind(this);
  }
  setEventListeners() {
    this.popupCloseButton.addEventListener('click', this._closeBinded);
    document.addEventListener('keydown', this._escClose);
    document.addEventListener('click', this._overlayBinded);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
  }
  close() {
    document.removeEventListener('keydown', this._escBinded);
    this._popupSelector.classList.remove('popup_opened');
  }
  _handleEscClose(evt) {
    const escCode = 'Escape';
    if (evt.key === escCode) {
      this.close();
    }
  }
  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }
}
