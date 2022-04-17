export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupCloseButton = this._popupSelector.querySelector('.popup__close');
  }
  setEventListeners() {
    this.popupCloseButton.addEventListener('click', this.close.bind(this)); // Закрытие по клику
    document.addEventListener('keydown', this._handleEscClose.bind(this)); // Закрытие по ESC
    document.addEventListener('click', (evt => { // Закрытие по оверлею
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    }));
  }
  removeEventListeners() {
    this.popupCloseButton.removeEventListener('click', this.close);
    document.removeEventListener('keydown', this._handleEscClose);
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    this.removeEventListeners();

  }
  _handleEscClose(evt) {
    const escCode = 'Escape';
    if (evt.key === escCode) {
      this.close();
    }
  }
}
