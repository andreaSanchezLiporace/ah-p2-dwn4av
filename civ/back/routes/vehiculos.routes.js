/**
 * Rutas relacionadas con los vehículos.
 * Importo los módulos:
 * @module express de 'express' 
 * @middleware 'Auth.middlewares'
 * @controller 'vehiculos.controller' para el manejo de las solicitudes relacionadas a los vehículos.
*/
import express from 'express'
import * as controller from '../controllers/vehiculos.controller.js'
import { validateToken } from '../middlewares/token.middlewares.js'
import { accountValidate } from '../middlewares/auth.account.middlewares.js'

/** Router de vehículos */
const router = express.Router();


/**
 * Ruta para obtener todos los vehiculos - @route GET '/'
 * Ruta para obtener un vehiculo por ID - @route GET '/:domain'
 * Ruta para crear un vehiculo en el sistema - @route POST '/'
 * Ruta para editar un vehiculo - @route PATCH '/:domain'
 * Ruta para eliminar un vehiculo - @route DELETE '/:domain'
*/
router.get('/', controller.findAll) // Cambiar nombre del método.
router.get('/:domain', controller.findOne)
router.post('/', controller.createOne)
router.patch('/:domain', controller.editOne)
router.delete('/:domain', controller.deleteOne)

export default router