export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _checkServerStatus(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkServerStatus)
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkServerStatus)
  }

  getInitialInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }
}
