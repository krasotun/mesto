export class FormValidator {
  constructor(obj, formName) {
    this.formSelector = obj.formSelector;
    this.inputSelector = obj.inputSelector;
    this.submitButtonSelector = obj.submitButtonSelector;
    this.inactiveButtonClass = obj.inactiveButtonClass;
    this.inputErrorClass = obj.inputErrorClass;
    this.errorClass = obj.errorClass;
  }
  enableValidation() {

  }
}
