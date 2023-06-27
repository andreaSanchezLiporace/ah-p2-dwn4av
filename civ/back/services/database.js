/**
 * Conexión con la BBDD
 * Importo los módulos necesarios para que el programa trabaje con la base:
 * @module mongodb -> para trabajar con la base de datos MongoDB.
 * @module ObjectId -> para trabajar con el dato_id de la colección de las colecciones
 */
import { ObjectId, MongoClient } from 'mongodb'

/** @type {Db} -> Base de datos a la cual preciso conectar*/
const client = new MongoClient('mongodb://127.0.0.1:27017')

/**
 * Función para realizar operaciones en la base de datos.
 * @param {Function} callback - Realiza las operaciones en la base de datos.
 * @returns {Promise} Una promesa que se resuelve con el resultado de la operación en la base de datos.
*/
async function database (callback) {
    await client.connect()
    const db = client.db('esparta')
    const result = await callback(db)
    return result
}

export {
    database,
    ObjectId
}