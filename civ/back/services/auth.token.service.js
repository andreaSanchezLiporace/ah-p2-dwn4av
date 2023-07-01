/**
 * Middleware para la autenticación del token.
 * Importa los módulos:
 * @module jwt de 'jsonwebtoken' para la generación y verificación de tokens.
 * @module dbConnection de './database.js' para conectar con la base y poder trabajar con el id del cliente que es un object_id
 */
import jwt from 'jsonwebtoken';
import * as dbConnection from "./database.js";

/** Colección en la base de datos que almacena los tokens - @constant {string} */
const COLLECTION_NAME = 'tokens'

/**
 * Genera un token JWT para una cuenta específica y lo guarda en la base de datos, en la coleccion 'tokens'
 * @param {Object} account - La cuenta para la cual se generará el token.
 * @returns {Promise<string>} Una promesa que se resuelve con el token generado.
 * @throws {Error} Si ocurre algún error durante la generación del token o la inserción en la base de datos.
 */
async function generateToken(account){
    try {
        const secretKey = account._id.toString();
        const token = jwt.sign(account, secretKey);
        await dbConnection.database(async db => {
            await db.collection(COLLECTION_NAME).insertOne({token, account_id: new dbConnection.ObjectId(account._id)});
        });
        return {token, secretKey};
    } catch (error){throw new Error('Se produjo un error al intentar generar el token.')
    }
}

/**
 * Verifica la validez de un token JWT y devuelve los datos del payload si el token es válido.
 * @param {string} token - El token JWT a verificar.
 * @returns {Promise<Object|null>} Una promesa que se resuelve con el payload del token si es válido, o null si no es válido.
*/
async function verifyToken(token){
    console.log(token)
    const tokenData = await dbConnection.database(async (db) => {
        return await db.collection(COLLECTION_NAME).findOne({ token });
    });
    console.log(tokenData)

    if (tokenData){
        try {
            const secretKey = tokenData.token.toString();
            console.info(secretKey) 

            const isSessionActive = await dbConnection.database(async (db) => {
                return await db.collection(COLLECTION_NAME).findOne({ token, account_id: new dbConnection.ObjectId(tokenData._id)});
            });
            console.log(isSessionActive)

            if(isSessionActive){
                const payload = jwt.verify(token, secretKey);
                console.log(payload)
            } else {
                console.log('La sesión no está activa');
                return null
            }

            
        } catch (error){
            console.error('Error al acceder a la base de datos:', error);
            return null; // Error al acceder a la base de datos
        }
    } else {
        console.log('La sesión no está activa');
        return null
    }
}

export {
    generateToken, 
    verifyToken
}