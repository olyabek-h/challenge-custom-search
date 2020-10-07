import QUERY_PARAMETERS from './static-parameters.json';

function createBaseUrlQuery() {
    return `${QUERY_PARAMETERS.baseUrl}key=${QUERY_PARAMETERS.key}&cx=${QUERY_PARAMETERS.cx}`
}

export function search(expression: string) {
    return fetch(`${createBaseUrlQuery()}&q=${expression}`)
        .then(x => x.json())
        .catch(x => {
            console.log(`fetch error, ${x}`);
        })
}

export function searchByPage(expression: string, startIndex: number) {
    return fetch(`${createBaseUrlQuery()}&q=${expression}&start=${startIndex}`)
        .then(x => x.json())
        .catch(x => {
            console.log(`fetch error, ${x}`);
        })
}