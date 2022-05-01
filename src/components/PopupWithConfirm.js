import { Popup } from "./Popup.js";
export class PopupWithConfirm extends Popup {
  constructor(selector, { handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit;
  }
}

