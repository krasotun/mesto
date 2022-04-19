import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.popupCardImage = selector.querySelector('.popup-card__image');
    this.popupCardText = selector.querySelector('.popup-card__text');
  }
  open(title, source) {
    this.popupCardImage.src = source;
    this.popupCardImage.alt = title;
    this.popupCardText.textContent = title;
    super.open();
  }
}
