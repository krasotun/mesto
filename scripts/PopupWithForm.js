import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submit }) {
    super(popupSelector);
    this.submit = submit;
    this.form = popupSelector.querySelector('.form');
  }
  setEventListeners() {
    this.form.addEventListener('submit', this.formSubmit);
    super.setEventListeners();
  }
  formSubmit() {
    console.log('Submited');
  }

  _getInputValues() {

  }
}
