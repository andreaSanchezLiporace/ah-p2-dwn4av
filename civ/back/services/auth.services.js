/**
 * Gestión autenticación de usuarios, connexión con la base de datos.
 * @module database 'database.js' -> conexion BBDD
 * @module bcrypt de 'bcrypt' -> para manejar la encriptación de contraseñas en el archivo. 
 */
import { database } from "./database.js"
import bcrypt from 'bcrypt'

/** Colección en la base de datos que almacena los usuarios - @constant {string} */
const COLLECTION_NAME = 'accounts'

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Object} userData - Los datos del usuario a crear.
 * @param {string} userData.user - El nombre de usuario.
 * @param {string} userData.password - La contraseña de la cuenta
 * @returns {Promise<Object>} Una promesa que se resuelve con el objeto de la cuenta creada.
 * @throws {Error} Si ya existe un usuario con el mismo nombre.
*/
async function createAccount({account}) {
    return database(async db => {
        const existAccount = await db.collection(COLLECTION_NAME).findOne({userName: account.userName})        
        if (!existAccount) {
            const newAccount = {...account}
            const salt = await bcrypt.genSalt(10)
            newAccount.passwordHash = await bcrypt.hash(account.password, salt)
            await db.collection(COLLECTION_NAME).insertOne(newAccount)
            return newAccount
        } else {
            throw new Error('Ya existe una cuenta para el usuario que ingresó')
        }
    })
}

/**
const create = async ({user, password}) => {
    return database(async db => {
        const userOld = await db.collection(COLLECTION_NAME).findOne({user})        
        if (!userOld) {
            const salt = await bcrypt.genSalt(10)
            const passwordHash = await bcrypt.hash(password, salt)
            const userToCreate = { user, password: passwordHash }
            await db.collection(COLLECTION_NAME).insertOne(userToCreate)
            return userToCreate
        } else {
            throw new Error('User already exists.')
        }
    })
}
*/

/**
 * Realiza el inicio de sesión de un usuario en la base de datos.
 * @param {Object} loginData - Los datos de inicio de sesión del usuario.
 * @param {string} loginData.user - El nombre de usuario.
 * @param {string} loginData.password - La contraseña del usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos del usuario si el inicio de sesión es exitoso.

const login = async ({user, password}) => {
    return database(async db => {
        const userOld = await db.collection(COLLECTION_NAME).findOne({user})
        if (userOld) {
            const isPasswordValid = await bcrypt.compare(password, userOld.password)
            if(isPasswordValid) {
                return {user, password: undefined}
            }
        }
    })
}
*/
export{
    createAccount
}