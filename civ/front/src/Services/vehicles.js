/**
 * Returns an object with the data of all the vehicles.
 * @returns {Promise<any>}
 */
async function findAll(){
    return fetch(`http://localhost:1905/api/vehicles`, {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(response => response.json())
}

/**
 * Returns an object with the vehicle's data. Receives as parameter the vehicle domain.
 * @param {string} domain 
 * @returns {Promise<any>} 
 */
async function findOne(domain){
    return fetch(`http://localhost:1905/api/vehicles/${domain}`, {
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
        .then(response => response.json())
}

/**
 * Receives a vehicle and creates it in the database
 * @param {{domain: string, make: string, model: string|null, type: string|null, color: string|null, year: number|null, chassis: string|null, insurance: string|null}} vehicle 
 * @returns {Promise<any>} 
 */
async function newVehicle(vehicle){
    return fetch(`http://localhost:1905/api/vehicles`, {
        method:'post',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(vehicle)
    })
        .then(response => (response.status === 201) ? response.json() : null)
        .then(response => response ? window.location.href = '/vehicles' : alert('Ya existe un vehículo cargado con esa patente.'))
}

/**
 * Receives a vehicle and edit it in the database
 * @param {string} domain 
 * @param {{domain: string, make: string, model: string|null, type: string|null, color: string|null, year: number|null, chassis: string|null, insurance: string|null}} vehicle
 * @returns {Promise<any>} 
 */
async function editVehicle(domain, vehicle){
    return fetch(`http://localhost:1905/api/vehicles/${domain}`,{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(vehicle)
    })
    .then(response => (response.status === 201) ? response.json() : null)
    .then(response => response ? window.location.href = `/vehicles` : alert('Ya existe un vehículo cargado con esa patente.'))
}

/**
 * Eliminates a vehicle
 * @param {string} domain 
 * @returns {Promise<any>} 
 */
async function deleteOne(domain){
    await fetch(`http://localhost:1905/api/vehicles/${domain}`,{
        method:'DELETE',
        headers: {
            'auth-token': localStorage.getItem('auth-token')
        }
    })
    window.location.href = `/vehicles`;
}

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

export {
    findAll,
    findOne,
    newVehicle,
    nuevoServicio,
    findOneService,
    deleteOne,
    deleteOneService,
    editVehicle,
    patchOneServicio,
    patchEndService
}