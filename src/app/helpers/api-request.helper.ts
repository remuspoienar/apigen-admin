export function formatBody(body: Object) {
    for (let key in body) {
        let value = body[key];
        if (!(value instanceof Array)) continue;
        let newKey = formatKey(key);
        delete body[key];
        body[newKey] = value.map(obj => formatBody(obj));
    }
}

function formatKey(key: string) {
    let upperLetter = regex.exec(key)[0];
    let keyName = key.split(regex).join(`_${upperLetter.toLowerCase()}`).concat('_attributes');
    return keyName;
}


let regex = new RegExp(/[A-Z]/);