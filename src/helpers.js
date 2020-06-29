export function serialize(query) {
    let queryString = "";
    for (let key in query) {
        queryString += `&${key}=${query[key]}`;
    }
    return queryString;
}