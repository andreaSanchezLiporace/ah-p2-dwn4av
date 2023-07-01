/**
 * Rutas relacionadas con los servicios que ofrece el taller mecánico.
 * Importo los módulos:
 * @module express de 'express' 
 * @middleware 'Auth.middlewares'
 * @controller 'servicios.controller' para el manejo de las solicitudes relacionadas a los servicios que ofrece el taller.
*/
import express from 'express'
import * as controller from '../controllers/servicios.controller.js'
import { validateToken } from '../middlewares/token.middlewares.js'
import { accountValidate } from '../middlewares/auth.account.middlewares.js'

/** Router de servicios */
const router = express.Router();

/**
 * Middleware de autorización que se ejecuta en todas las rutas definidas en este enrutador.
 * Verifica si el usuario está autorizado antes de procesar la solicitud.

router.all('*', accountValidate)
*/

/**
 * Ruta para obtener todos los servicios - @route GET '/'
 * Ruta para obtener un un servicio por ID - @route GET '/findOne/:id'
 * Ruta para obtener el número de servicio - @route GET '/numberOfServices'
 * Ruta para crear un nuevo servicio - @route POST ''
 * Ruta para editar un servicio - @route POST '/:id'
*/
router.get('/', [validateToken], controller.findAll)
router.get('/findOne/:id', controller.findOne)
router.get('/numberOfServices', controller.numberOfServices)
router.post('', controller.newService)
router.patch('/:id', controller.edit)

/**
 * Ruta para obtener servicios por patente - @route GET '/:patente'
 * Ruta para obtener un servicio por patente y ID - @route GET '/:patente/:id'
 * Ruta para crear un nuevo servicio - @route POST ''
 * Ruta para editar un servicio - @route PATCH '/editService/:id'
 * Ruta para finalizar un servicio - @route PATCH '/endService'
 * Ruta para eliminar un servicio - @route PATCH '/:patente'

router.get('/:patente', controller.verServiciosPorPatente)
router.get('/:patente/:id', controller.verServicioPorId)
router.post('', controller.nuevoServicio)
router.patch('/editService/:id' , controller.editarServicio)
router.patch('/endService', controller.endService)
router.delete('/:patente', controller.eliminarServicio)
*/

export default router