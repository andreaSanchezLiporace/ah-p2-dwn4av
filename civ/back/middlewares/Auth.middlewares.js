/**
 * Middleware para la autenticación del token.
 * Importo el módulo:
 * @module jwt de 'jsonwebtoken' para la generación y verificación de tokens.
 */
import jwt from 'jsonwebtoken'
import * as accountSchema from '../schemas/account.schema.js'

async function accountValidate(req, res, next){
    accountSchema.account.validate(req.body, {abortEarly:false, stripUnknown:true})
    .then((account)=>{
        res.body = account
        next()
    })
    .catch(function(error){
        res.status(400).json({ error })
    })
}

/**
 * Middleware de autorización que verifica el token de autenticación en el encabezado de la solicitud.
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función de siguiente middleware.

const authorization = (req, res, next) => {
    try {
        const token = req.headers['auth-token'] || ''
        const user = jwt.verify(token, 'CLAVE_SECRETA')
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}
*/
export {
    accountValidate,
}