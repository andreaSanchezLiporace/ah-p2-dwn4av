/**
 * Controlador para los servicios que ofrece el taller mecánico.
 * Importo el módulo:
 * @service 'servicios.service.js' que contiene los servicios relacionados con los servicios que ofrece el taller mecánico.
 */
import * as service from './../services/servicios.service.js'

/**
 * Obtiene todos los servicios.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const findAll = (req, res) => {
    service.findAll()
        .then(services => res.status(200).json(services))
        .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Obtiene un servicio específico por su ID.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const findOne = (req, res) => {
    const { id } = req.params
    service.findOne(id)
        .then(service => res.status(200).json(service))
        .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Crea un nuevo servicio.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const newService = (req, res) => {
    const newService = req.body
    service.newService(newService)
        .then(service => res.status(201).json(service))
        .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Obtiene el número de servicios.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const numberOfServices = (req, res) => {
    service.numberOfServices()
        // .then(response => res.status(200).json(response))
        .then(response => {
            if(response !== 0) {
                res.status(200).json(response)
            } else {
                res.status(200).json('0')
            }
        })
        .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Edita un servicio existente.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 */
const edit = (req, res) => {
    const serviceReq = req.body
    const id = req.params
    service.edit(serviceReq, id)
        .then(modifiedService => {
            if(modifiedService && (modifiedService.matchedCount || modifiedService.modifiedCount)) {
                res.status(201).json(serviceReq)
            } else {
                res.status(404).json()
            }
        })
}

export {
    findAll,
    findOne,
    newService,
    edit,
    numberOfServices
}