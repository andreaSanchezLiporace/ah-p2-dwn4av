/**
 * Middleware para la autenticación del token.
 * Importo el módulo:
 * @module jwt de 'jsonwebtoken' para la generación y verificación de tokens.
 */
/**
 * Middleware para la autenticación del token.
 * Importa el módulo:
 * @module authToken de '../services/auth.token.service.js' para que se pueda validar el token generado por el servicio.
 */
import * as authToken from '../services/auth.token.service.js'

/**
 * Middleware que verifica el token de autenticación en el encabezado de la solicitud.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.
 * @throws {Error} Si el token no es válido o no se proporciona.
 */
async function validateToken(req, res, next){
    const token = req.headers['auth-token']
    if (!token) {
        return res.status(401).json({error: {message: 'No se proporcionó un token'} })
    }
    const account = await authToken.verifyToken(token)
    if (!account) {
        return res.status(401).json({error:{ message: 'El token ingresado es incorrecto'} })
    }
    req.account = account
    next()
}

export {
    validateToken
}
