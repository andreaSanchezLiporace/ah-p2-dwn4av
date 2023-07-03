export async function call ({uri, method = 'GET', body = undefined}) {
    return fetch( `{http://localhost:1905/api/auth/'${uri}{}`, {
        headers: {
            'auth-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        method,
        body: JSON.stringify(body)
    })
        .then(async response => {
            if(!response.ok) {
                if(response.status === 401) {
                    localStorage.removeItem('token')
                }
                throw await response.json()
            }
            return response.json()
        })
}

export default {
    call
}