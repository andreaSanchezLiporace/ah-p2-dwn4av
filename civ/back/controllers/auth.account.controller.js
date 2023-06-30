/**
 * Controlador para la autenticación de usuarios.
 * Importo los módulos:
 * @service 'auth.account.service' que contiene los servicios relacionados con la autenticación.
 * @service 'auth.token.service' que contiene los servicios relacionados con el token de la cuenta.
*/
import * as services from '../services/auth.account.service.js'
import * as tokenService from '../services/auth.token.service.js'

/**
 * Crea una cuenta utilizando los datos proporcionados en el cuerpo de la solicitud.
 * @param {object} req - Objeto de solicitud que contiene los datos de la cuenta a crear en la propiedad 'body'.
 * @param {object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 * @returns {Promise<void>} - Promesa que se resuelve una vez que se ha creado la cuenta y se ha enviado la respuesta al cliente.
 */
async function createAccount(req, res) {
    const account = req.body
    return services.createAccount(account)
        .then(account => {
            res.status(201).json({account, token, message: "Cuenta creada correctamente."})
        })
        .catch((error) => res.status(500).json({message: error.message}))
}

/**
 * Inicia sesión de un usuario.
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos de la solicitud.
 * @param {Object} res - Objeto de respuesta HTTP utilizado para enviar la respuesta.
 * @returns {Promise} - Promesa que se resuelve con los datos de autenticación y la cuenta del usuario, o se rechaza con un error.
 */
async function login(req, res) {
    const account = req.body
    return services.login(account)
        // Función flecha para crear una funcion asyncronica, ya que preciso esperar el resultado del servicio que genera el token
        .then(async (account) => {
            // Genera y retorna un token de autenticación para la cuenta y la cuenta
            return {token: await tokenService.generateToken(account), account};
        })
        .then((authData) => {
            res.status(201).json(authData);
        })
        .catch((error) => res.status(500).json({message: error.message}))
}

export {
    createAccount,
    login
}