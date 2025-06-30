/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let url = options.url;
    let data = options.data;
    let method = options.method;
    let formData = null;

    if (method === 'GET' && data) {
        url += '?';
        Object.entries(data).forEach(([key, value]) => url += `${key}=${value}&`);
        url = url.slice(0, -1);
    } else {
        if (data) {
            formData = new FormData();
            Object.entries(data).forEach(([key, value]) => formData.append(key, value));
        }
    }

    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
            options.callback(null, xhr.response);
        }
    }

    try {
        xhr.open(method, url);
        xhr.send(formData);
    } catch (err) {
        options.callback(err);
    }
}