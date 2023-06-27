/**
 * Rutas relacionadas con la autenticación de usuarios.
 * Importo los módulos:
 * @module express de 'express' 
 * @controller 'auth.controller' para el manejo de las solicitudes relacionadas a la autenticación.
*/
import express from 'express'
import * as controller from '../controllers/auth.controller.js'

/** Router de autenticación.*/
const router = express.Router()

/**
 * Ruta para la creación de un usuario - @route POST /auth/ - @group Autenticación
 * Ruta para el inicio de sesión - @route POST /auth/login - @group Autenticación
 */
router.post('/', controller.create)
router.post('/login', controller.login)

export default router