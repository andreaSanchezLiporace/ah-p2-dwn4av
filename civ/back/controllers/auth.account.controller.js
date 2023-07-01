/**
 * Controlador para la autenticación de usuarios.
 * Importo los módulos:
 * @service 'auth.account.service' que contiene los servicios relacionados con la autenticación.
 * @service 'auth.token.service' que contiene los servicios relacionados con el token de la cuenta.
*/
import * as services from '../services/auth.account.service.js'
import * as profileServices from '../services/auth.profile.service.js'
import * as tokenService from '../services/auth.token.service.js'

/**
 * Crea una cuenta utilizando los datos proporcionados en el cuerpo de la solicitud.
 * @param {object} req - Objeto de solicitud que contiene los datos de la cuenta a crear en la propiedad 'body'.
 * @param {object} res - Objeto de respuesta utilizado para enviar la respuesta al cliente.
 * @returns {Promise<void>} - Promesa que se resuelve una vez que se ha creado la cuenta y se ha enviado la respuesta al cliente.
 */
async function createAccount(req, res) {
    return services.createAccount(req.body)
        .then(() => {
            res.status(201).json({message: "Cuenta creada correctamente."})
        })
        .catch((error) => {
            res.status(500).json({error: {message: error.message}})
        })
}

/**
 * Crea un perfil para una cuenta específica.
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos de la cuenta y el cuerpo de la solicitud.
 * @param {Object} res - Objeto de respuesta HTTP utilizado para enviar la respuesta al cliente.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se ha creado el perfil.
*/
async function createProfile(req, res) {
    return profileServices.createProfile(req.account, req.body)
        .then(() => {
            res.status(201).json({message: "El perfil se creó con éxito."})
        })
        .catch((error) => {
            res.status(500).json({error: {message: error.message}})
        })
}

async function getProfile(req, res) {
    return profileServices.getProfile(req.account._id)
        .then((profile) => {
            res.status(201).json(profile)
        })
        .catch((error) => {
            res.status(500).json({error: {message: error.message}})
        })
}

/**
 * Inicia sesión de un usuario.
 * @param {Object} req - Objeto de solicitud HTTP que contiene los datos de la solicitud.
 * @param {Object} res - Objeto de respuesta HTTP utilizado para enviar la respuesta.
 * @returns {Promise} - Promesa que se resuelve con los datos de autenticación y la cuenta del usuario, o se rechaza con un error.
 */
async function login(req, res) {
    return services.login(req.body)
        // Función flecha para crear una funcion asyncronica, ya que preciso esperar el resultado del servicio que genera el token
        .then(async (account) => {
            // Genera y retorna un token de autenticación para la cuenta y la cuenta
            return {token: await tokenService.generateToken(account), account};
        })
        .then((authData) => {
            res.status(201).json(authData);
        })
        .catch((error) => {
            res.status(500).json({error: {message: error.message}})
        })
}

async function logout (req, res) {
    const token = req.headers['auth-token']

    return tokenService.deleteToken(token)
        .then(() => {
            res.status(200).json({message: 'La sesión se cerró correctamente'})
        })
        .catch((error) => {
            res.status(400).json({error: {message: error.message}})
        })
}

export {
    createAccount,
    createProfile,
    getProfile,
    login,
    logout
}