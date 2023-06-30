/**
 * Gestión autenticación de usuarios, connexión con la base de datos.
 * @module database 'database.js' -> conexion BBDD
 * @module bcrypt de 'bcrypt' -> para manejar la encriptación de contraseñas en el archivo. 
 */
import { database } from "./database.js"
import bcrypt from 'bcrypt'

/** Colección en la base de datos que almacena las cuentas - @constant {string} */
const COLLECTION_NAME = 'accounts'

/**
 * Crea una cuenta en la base de datos.
 * @param {object} account - Objeto que contiene los datos de la cuenta a crear.
 * @returns {Promise<object>} - Promesa que se resuelve con el objeto de la cuenta creada.
 * @throws {Error} - Error que se lanza si ya existe una cuenta para el usuario proporcionado.
 */
async function createAccount(account) {
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
 * Realiza el proceso de inicio de sesión para autenticar a un usuario utilizando los datos de la cuenta proporcionados.
 * @param {object} account - Objeto que contiene los datos de la cuenta para realizar el inicio de sesión.
 * @returns {Promise<object>} - Promesa que se resuelve con el usuario autenticado si el inicio de sesión es exitoso.
 * @throws {Error} - Error que se lanza si ocurre algún problema durante el inicio de sesión.
*/
async function login(account) {
    try {
        return database(async (db) => {
            const userOld = await db.collection(COLLECTION_NAME).findOne({ userName: account.userName });
            if (userOld) {
                const isPasswordValid = await bcrypt.compare(account.password, userOld.password);
                console.log(isPasswordValid)
                if (!isPasswordValid) {
                    return { ...userOld, password: undefined };
                } else {
                    throw new Error('La contraseña que ingresó es incorrecta');
                }
            } else {
                throw new Error('No existe una cuenta para el usuario que ingresó');
            }
        });
    } catch (error) {
      // Manejar el error aquí o lanzar un nuevo error
        throw new Error('Error al iniciar sesión');
    }
}

export{
    createAccount,
    login
}