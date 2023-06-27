/**
 * Gestión de servicios, conexión con la base de datos.
 * @module database 'database.js' -> conexion BBDD
 * @module ObjectId de 'MongoDb' 
 * @module services de 'services.js'
 */
import { database, ObjectId } from './database.js'

/** Colección en la base de datos que almacena los servicios que brinda el taller - @constant {string} */
const COLLECTION_NAME = 'servicios'

/**
 * Busca y devuelve todos los registros de servicios.
 * @returns {Promise<Array>} Un arreglo de objetos que representa los servicios encontrados.
*/
const findAll = async () => 
    database(async db => {
        try {
            return await db.collection(COLLECTION_NAME).find().toArray()
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    })

/**
 * Busca y devuelve un servicio específico por su ID.
 * @param {string} id - El ID del servicio a buscar.
 * @returns {Promise<Object>} Un objeto que representa el servicio encontrado. Si no se encuentra, devuelve null.
*/
const findOne = async (id) =>
    database(async db => {
        try {
            const service = await db.collection(COLLECTION_NAME).findOne({_id: ObjectId(id)})
            return service
        } catch (error) {
            console.log(`Error: ${error}`)
        }
})

/**
 * Crea un nuevo servicio en la base de datos.
 * @param {Object} service - El objeto que representa el nuevo servicio a crear.
 * @returns {Promise<Object>} El objeto que representa el servicio creado.
*/
const newService = async (service) =>
    database(async db => {
        try {
            await db.collection(COLLECTION_NAME).insertOne(service)
            return service
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    })

/**
 * Edita un servicio existente en la base de datos.
 * @param {Object} service - El objeto que contiene los nuevos datos del servicio a editar.
 * @param {string} id - El ID del servicio a editar.
 * @returns {Promise<Object>} Un objeto que representa el servicio modificado.
*/
const edit = async (service, id) =>
    database(async db => {
        try {
            const modifiedService = await db.collection(COLLECTION_NAME).updateOne({_id: ObjectId(id)},{$set: {
                date: service.date,
                km: service.km,
                spareParts: service.spareParts,
                detail: service.detail,
                total: service.total
            }})
            return modifiedService
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    })

/**
 * Obtiene el número total de servicios almacenados en la base de datos.
 * @returns {Promise<number>} El número total de servicios.
*/
const numberOfServices = async () =>
    database(async db => {
        try {
            return await db.collection(COLLECTION_NAME).count()
        } catch (error) {
            console.log('catch')
            console.log(`Error: ${error}`)
        }
    })

export {
    findAll,
    findOne,
    newService,
    edit,
    numberOfServices
}