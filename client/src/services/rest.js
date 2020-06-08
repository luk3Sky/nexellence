let pendingRequests = 0;

function toQueryString(obj) {
    const parts = [];
    let i;
    for (i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i) && obj[i]) {
            parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
        }
    }
    return parts.join('&');
}

function request(obj) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        if (obj.queryParams) {
            // eslint-disable-next-line no-param-reassign
            obj.url += `?${toQueryString(obj.queryParams)}`;
        }

        xhr.onreadystatechange = function onStateChange() {
            if (xhr.readyState === 4) {
                pendingRequests-=1;
                if (pendingRequests === 0) {
                    document.dispatchEvent(new Event('stopWaiting'));
                }
                if (xhr.status > 199 && xhr.status < 300) {
                    resolve(
                        xhr.responseText ? JSON.parse(xhr.responseText) : undefined
                    );
                } else {
                    reject(xhr.responseText);
                }
            }
        };

        xhr.open(obj.method, obj.url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        if (obj.contentType) {
            xhr.setRequestHeader('Content-Type', obj.contentType);
        }
        xhr.send(obj.data ? JSON.stringify(obj.data) : undefined);
        pendingRequests+=1;
        if (pendingRequests === 1) {
            document.dispatchEvent(new Event('startWaiting'));
        }
    });
}

export const get = (url, queryParams) =>
    request({ method: 'GET', url, queryParams });

export const post = (url, data) =>
    request({ method: 'POST', contentType: 'application/json', url, data });

export const put = (url, data) =>
    request({ method: 'PUT', contentType: 'application/json', url, data });

export const del = (url) => request({ method: 'DELETE', url });
