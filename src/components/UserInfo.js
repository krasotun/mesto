export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector;
    this._userName = document.querySelector(this._nameSelector);
    this._userJob = document.querySelector(this._jobSelector);
    this._userAvatar = document.querySelector(this._avatarSelector);
  }
  getUserInfo() {
    const userData = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
    return userData
  }
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}
