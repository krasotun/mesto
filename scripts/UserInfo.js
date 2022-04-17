export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this.name = document.querySelector(this._nameSelector);
    this.job = document.querySelector(this._jobSelector);

  }
  getUserInfo() {

  }
  setUserInfo() {

  }
}
