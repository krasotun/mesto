export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._userName = document.querySelector(this._nameSelector);
    this._userJob = document.querySelector(this._jobSelector);

  }
  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
    return userData
  }
  setUserInfo(userData) {
    this._userName.textContent = userData.userName;
    this._userJob.textContent = userData.userJob;
  }
}
