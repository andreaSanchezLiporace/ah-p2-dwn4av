import API from './api.service'

export async function findAll() {
    return API.call({uri: 'services', method: 'GET'})
}

export async function findOne(id) {
    return API.call({uri: `services/findOne/${id}`, method: 'GET'})
}

export async function newService(service) {
    return fetch(`http://localhost:1905/api/services`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(service)
    })
    .then(response => (response.status === 201) ? response.json() : null)
    .then(response => response ? window.location.href = '/services' : alert('Hubo un problema'))
    .catch(err => console.error('[services/newService]: ' + err))
}

export async function editService(service, id){
    return fetch(`http://localhost:1905/api/services/${id}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify(service)
    })
    .then(response => (response.status === 201) ? response.json() : null)
    .then(response => response ? window.location.href = `/services` : alert('Hubo un problema'))
}


export async function numberOfServices() {
    return API.call({uri: `services/numberOfServices`, method: 'GET'})
}

/* Revisar:
async function nuevoServicio(servicio){
    await fetch(`http://localhost:1905/api/servicios`, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(servicio)
    })
    .then(response => response.json())
    window.location.href = `/vehiculos/${servicio.patente}`
}
async function findOneService(patente, id){
    return fetch(`http://localhost:1905/api/servicios/${patente}/${id}`, {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(response => response.json())
        .catch(error => console.log(`Error: ${error}`))
}
async function deleteOneService(patente){
    await fetch(`http://localhost:1905/api/servicios/${patente}`,{
        method:'DELETE',
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
    window.location.href = `/vehiculos/${patente}`
}
async function patchOneServicio(servicio){
    await fetch(`http://localhost:1905/api/servicios/editService/${servicio.id}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(servicio)
    })
    .then(response => response.json())
    window.location.href = `/vehiculos/${servicio.patente}`
}
async function patchEndService({id}) {
    return fetch(`http://localhost:1905/api/servicios/endService`, {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({id})
    })
    .then(response => response.json())
    .catch(err => console.error('[vehiculos.services.js-121]Error: ' + err))
}
*/

export default {
    findAll,
    newService,
    findOne,
    editService,
    numberOfServices
    // REVISAR
    //nuevoServicio,
    //findOneService,
    //deleteOneService,
    //patchOneServicio,
    //patchEndService
}