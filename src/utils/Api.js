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
    uploadFileUrl(url) {
        const formData = new FormData();
        formData.append('file_url', url);
        return fetch(this._baseUrl + 'upload', {
            method: 'POST',
            body: formData
        }).then(this._checkResponse).catch((err)=>{console.log('error', err)});
    }
    searchSomething(query, setRes) {
        console.log('query:', query)
        console.log('query:', typeof (query))
        return fetch(this._baseUrl + 'search', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({ "query": query })
        }).then(this._checkResponse).then((res)=>{setRes(res); console.log(res)}).catch((err)=>{console.log('error', err)});
    }
    getFile(filename) {
        return fetch('https://cdi.althgamer.ru/' + 'pdfs/' + filename, {
            method: 'GET',
        }).then(this._checkResponse).then((res)=>{console.log('trying to get a file///',res)}).catch((err)=>{console.log('error', err)});
    }
}

export const baseApi = new Api({
    baseUrl: 'https://cdi.althgamer.ru/api/',
    headers: {"Content-Type":'application/json'},
});