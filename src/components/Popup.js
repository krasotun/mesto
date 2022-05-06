export class Popup {
  constructor(popupName) {
    this._popupName = popupName;
    this.popupCloseButton = this._popupName.querySelector('.popup__close');
    this._closeBinded = this.close.bind(this);
    this._escClose = this._handleEscClose.bind(this);
    this._overlayBinded = this._handleOverlayClose.bind(this);
  }
  setEventListeners() {
    this.popupCloseButton.addEventListener('click', this._closeBinded);
    document.addEventListener('click', this._overlayBinded);
  }
  open() {
    document.addEventListener('keydown', this._escClose);
    this._popupName.classList.add('popup_opened');
  }
  close() {
    document.removeEventListener('keydown', this._escClose);
    this._popupName.classList.remove('popup_opened');
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
