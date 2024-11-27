export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    _checkResponse(res) {
        console.log(res)
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
    uploadFiles(filesArray) {
        const formData = new FormData();
        formData.append('file', filesArray[0]);
        console.log('filesArray[0] instanceof File',filesArray[0] instanceof File);
        console.log([...formData]);
        return fetch(this._baseUrl + 'upload', {
            method: 'POST',
            body: formData
        }).then(this._checkResponse).catch((err)=>{console.log('error', err)});
    }

}

export const baseApi = new Api({
    baseUrl: 'https://cdi.althgamer.ru/',
});