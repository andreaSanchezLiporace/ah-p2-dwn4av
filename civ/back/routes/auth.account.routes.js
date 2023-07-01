/**
 * Rutas relacionadas con la autenticación de usuarios.
 * Importo los módulos:
 * @module express de 'express' 
 * @controller 'auth.controller' para el manejo de las solicitudes relacionadas a la autenticación.
*/
import express from 'express'
import * as controller from '../controllers/auth.account.controller.js'
import { accountValidate, profileValidate } from '../middlewares/auth.account.middlewares.js'
import { validateToken } from '../middlewares/token.middlewares.js'

/** Router de autenticación.*/
const router = express.Router()

/**
 * Ruta para la creación de una cuenta - @route POST /account
 * -----
 * Ruta para la creación de un perfil - @route POST /profile
 * Ruta para la obtención un perfil - @route GET /profile
 * -----
 * Ruta para la creación de una sesión - @route POST /session
 * Ruta para la eliminación de una sesión - @route DELETE /session
 */
// CUENTA
router.post('/account', [accountValidate], controller.createAccount)

// PROFILE
router.post('/profile', [validateToken, profileValidate], controller.createProfile)
router.get('/profile', [validateToken], controller.getProfile)

// SESSION
router.post('/session', [accountValidate], controller.login)
router.delete('/session', [validateToken], controller.logout)

export default router