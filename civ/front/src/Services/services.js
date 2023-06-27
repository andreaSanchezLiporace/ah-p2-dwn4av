async function findAll() {
    return fetch(`http://localhost:1905/api/services`, {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(response => response.json())
        .catch(err => console.error('[services/findAll]: ' + err))
}

async function newService(service) {
    return fetch(`http://localhost:1905/api/services`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(service)
    })
    .then(response => (response.status === 201) ? response.json() : null)
    .then(response => response ? window.location.href = '/services' : alert('Hubo un problema'))
    .catch(err => console.error('[services/newService]: ' + err))
}

/**
 * Returns an object with the service's data. Receives as parameter the service's id.
 * @param {string} id 
 * @returns {Promise<any>} 
 */
async function findOne(id){
    return fetch(`http://localhost:1905/api/services/findOne/${id}`, {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(response => response.json())
}

async function editService(service, id){
    return fetch(`http://localhost:1905/api/services/${id}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(service)
    })
    .then(response => (response.status === 201) ? response.json() : null)
    .then(response => response ? window.location.href = `/services` : alert('Hubo un problema'))
}

async function numberOfServices() {
    return fetch(`http://localhost:1905/api/services/numberOfServices`, {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(response => response.json())
        .catch(err => console.error('[services/numberOfServices]: ' + err))
}

export {
    findAll,
    newService,
    findOne,
    editService,
    numberOfServices
}