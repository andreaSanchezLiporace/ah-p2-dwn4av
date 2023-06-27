/**
 * Controlador para la autenticación de usuarios.
 * Importo los módulos:
 * @module jwt de 'jsonwebtoken' para la generación y verificación de tokens.
 * @service 'auth.services' que contiene los servicios relacionados con la autenticación.
 */
import jwt from 'jsonwebtoken'
import * as services from './../services/auth.services.js'

/**
 * Crea un nuevo usuario en la base de datos y genera un token de autenticación.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
*/
async function createAccount(req, res) {
    const user = req.body
    return services.createAccount(user)
        .then(user => {
            res.status(201).json({user, token})
        })
        .catch((error) => res.status(500).json({message: error.message}))
}

/**
 * Realiza el inicio de sesión del usuario y genera un token de autenticación.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.

const login = (req, res) => {
    const user = req.body
    services.login(user)
        .then(user => {
            const token = jwt.sign({ id: user._id, usuario: user.usuario }, 'CLAVE_SECRETA')
            // res.header('auth-token', token).status(200).json(user)
            res.status(200).json({user, token})
        })
        .catch((error) => res.status(500).json({message: error.message}))
}
 */
export {
    createAccount
}