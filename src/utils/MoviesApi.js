class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}//beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const configApi = {
  url: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
};

const movApi = new MoviesApi(configApi);

export default movApi;
