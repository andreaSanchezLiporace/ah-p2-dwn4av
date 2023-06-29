/**
 * Rutas relacionadas con la autenticación de usuarios.
 * Importo los módulos:
 * @module express de 'express' 
 * @controller 'auth.controller' para el manejo de las solicitudes relacionadas a la autenticación.
*/
import express from 'express'
import * as controller from '../controllers/auth.controller.js'
import { accountValidate } from '../middlewares/Auth.middlewares.js'

/** Router de autenticación.*/
const router = express.Router()

/**
 * Ruta para la creación de un usuario - @route POST /account
 * 
 */
router.post('/account', [accountValidate], controller.createAccount)

// PERFIL -> cuidado con esta ruta, preguntar al profesor si no habra conflicto con las futuras rutas para la vista del perfil del cliente
//router.post('/profile', controller.createProfile)
//router.get('/profile', controller.getProfile)

// SESSION -> cambiar nombre a login en todo el programa, puede ser session (ambas rutas serían iguales)
//router.post('/login', controller.login)
//router.delete('/logout', controller.logout)

export default router