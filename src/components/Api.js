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
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._checkServerStatus)
  }
  postNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    })
  }
  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._checkServerStatus)
  }

  addLike(data) {
    console.log(data);
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "PUT",
      headers: this._headers
    }).then(this._checkServerStatus)
  }

  removeLike(data) {
    return fetch(`${this._baseUrl}/cards/${data._id}/likes`, {
      method: "DELETE",
      headers: this._headers
    }).then(this._checkServerStatus)
  }
}

