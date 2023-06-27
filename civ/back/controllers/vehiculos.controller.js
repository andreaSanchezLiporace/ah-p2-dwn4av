/**
 * Controlador para lso vehículos
 * Importo el módulo:
 * @service 'vehicules.services' que contiene los servicios relacionados a los vehículos.
*/
import * as service from '../services/vehicles.service.js'

/**
 * Obtiene todos los vehículos.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
*/
const findAll = (req, res) => {
  service.findAll()
      .then(vehiculos => res.status(200).json(vehiculos))
      .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Obtiene un vehículo según el dominio especificado.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
const findOne = (req, res) => {
  const { domain } = req.params
  service.findOne(domain)
    .then(vehicle => vehicle ? res.status(200).json(vehicle) : res.status(204).json())
    .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Crea un nuevo vehículo.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 */
const createOne = (req, res) => {
  const vehicle = req.body
  service.createOne(vehicle)
    .then(vehicle => vehicle ? res.status(201).json(vehicle) : res.status(204).json())
    .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Edita un vehículo existente según el dominio especificado.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
*/
const editOne = (req, res) => {
  const { domain } = req.params
  const vehicle = req.body
  service.editOne(domain, vehicle)
    .then(modifiedVehicle => {
      if (modifiedVehicle && (modifiedVehicle.matchedCount || modifiedVehicle.modifiedCount)) {
        res.status(201).json(vehicle)
      } else {
        res.status(404).json()
      }
    })
    .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

/**
 * Elimina un vehículo según el dominio especificado.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
*/
const deleteOne = (req, res) => {
  const { domain } = req.params
  service.deleteOne(domain)
    .then(vehicle => vehicle.deletedCount !== 0 ? res.status(200).json(domain) : res.status(204).json())
    .catch(error => res.status(404).json({ message: `Error: ${error}` }))
}

export{
  findAll,
  findOne,
  createOne,
  editOne,
  deleteOne
}