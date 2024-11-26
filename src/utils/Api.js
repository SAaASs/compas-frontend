export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
    uploadFiles(filesArray) {
        return fetch(this._baseUrl + 'upload', {
            method: 'POST',
            headers: this._headers,
            body: filesArray
        }).then(this._checkResponse);
    }
}

export const baseApi = new Api({
    baseUrl: 'https://cdi.althgamer.ru/',
    headers: {
        'Content-Type': 'application/json',
    },
});