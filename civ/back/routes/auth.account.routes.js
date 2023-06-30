/**
 * Rutas relacionadas con la autenticación de usuarios.
 * Importo los módulos:
 * @module express de 'express' 
 * @controller 'auth.controller' para el manejo de las solicitudes relacionadas a la autenticación.
*/
import express from 'express'
import * as controller from '../controllers/auth.account.controller.js'
import { accountValidate } from '../middlewares/auth.account.middlewares.js'

/** Router de autenticación.*/
const router = express.Router()

/**
 * Ruta para la creación de un usuario - @route POST /account
 * 
 */
router.post('/account', [accountValidate], controller.createAccount)

// PERFIL
//router.post('/profile', controller.createProfile)
//router.get('/profile', controller.getProfile)

// SESSION
router.post('/session', [accountValidate], controller.login)
//router.delete('/logout', controller.logout)

export default router