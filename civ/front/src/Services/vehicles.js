import API from './api.service'

export async function findAll() {
    return API.call({uri: 'vehicles', method: 'GET'})
}

export async function findOne(domain) {
    return API.call({uri: `vehicles/${domain}`, method: 'GET'})
}

async function newVehicle(vehicle) {
    try {
        const response = await API.call({uri: 'vehicles/', method: 'POST', body: vehicle});
    
        if (response) {
            window.location.href = '/vehicles';
        } else {
            alert('Ya existe un vehículo cargado con esa patente.');
        }

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function editVehicle(domain, vehicle) {
    try {
        const response = await API.call({ uri: `vehicles/${domain}`, method: 'PATCH', body: vehicle });
    
        if (response) {
            window.location.href = '/vehicles';
        } else {
            alert('Ya existe un vehículo cargado con esa patente.');
        }
    
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function deleteOne(domain) {
    try {
        const response = await API.call({ uri: `vehicles/${domain}`, method: 'DELETE' });
        window.location.href = '/vehicles';
        return response;
    } catch (error) {
        // Manejar el error
        console.error(error);
        return null;
    }
}

export default {
    findAll,
    findOne,
    newVehicle,
    editVehicle,
    deleteOne
}