import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popupCardImage = popupSelector.querySelector('.popup-card__image');
    this.popupCardText = popupSelector.querySelector('.popup-card__text');
  }
  open(title, source) {
    this.popupCardImage.src = source;
    this.popupCardImage.alt = title;
    this.popupCardText.textContent = title;
    super.open();
  }
}
