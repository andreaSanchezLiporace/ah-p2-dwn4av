/**
 * Gestión de vehículos, conexión con la base de datos.
 * @module database 'database.js' -> conexion BBDD
 */
import { database } from './database.js'
/** Colección en la base de datos que almacena los servicios que brinda el taller - @constant {string} */
const COLLECTION_NAME = 'vehiculos'

/**
 * Obtiene todos los vehículos de la base de datos.
 * @returns {Promise<Array>} Un array que contiene todos los vehículos.
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
 * Crea un nuevo vehículo en la base de datos.
 * @param {Object} vehicle - El objeto que representa el nuevo vehículo a crear.
 * @returns {Promise<Object|null>} Un objeto que representa el vehículo creado o null si ya existe un vehículo con el mismo dominio.
*/
const createOne = async (vehicle) =>
    database(async db => {
        try {
            const exist = await findOne(vehicle.domain)
            if(!exist) {
                await db.collection(COLLECTION_NAME).insertOne(vehicle)
                return vehicle
            } else {
                return null
            }
        } catch (error) {
            console.log(`Error: ${error}`)
        } 
    })

/**
 * Busca un vehículo en la base de datos por su dominio.
 * @param {string} domain - El dominio del vehículo a buscar.
 * @returns {Promise<Object|null>} Un objeto que representa el vehículo encontrado o null si no se encuentra.
*/
const findOne = async (domain) =>
    database(async db => {
        try {
            const vehicle = await db.collection(COLLECTION_NAME).findOne({domain})
            return vehicle
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    })

/**
 * Edita un vehículo en la base de datos por su dominio.
 * @param {string} domain - El dominio del vehículo a editar.
 * @param {Object} vehicle - El objeto que representa los nuevos datos del vehículo.
 * @returns {Promise} Una promesa que indica si la edición del vehículo se realizó correctamente.
*/
const editOne = async (domain, vehicle) =>
    database(async db => {
        try {
            // TO-DO: Agregar cuando esté la funcionalidad de Servicios
            // await db.collection('servicios').updateMany({domain}, {$set: {
            //     domain: vehicle.domain,
            // }})

            return await db.collection(COLLECTION_NAME).updateOne({domain}, {$set: {
                domain: vehicle.domain,
                make: vehicle.make,
                model: vehicle.model,
                type: vehicle.type,
                color: vehicle.color,
                year: vehicle.year,
                chassis: vehicle.chassis,
                insurance: vehicle.insurance
            }})
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    })

/**
 * Elimina un vehículo de la base de datos por su dominio.
 * @param {string} domain - El dominio del vehículo a eliminar.
 * @returns {Promise} Una promesa que indica si la eliminación del vehículo se realizó correctamente.
*/
const deleteOne = async (domain) =>
    database(async db => {
        try {
            return await db.collection(COLLECTION_NAME).deleteOne({domain})
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    })

export{
    findAll,
    createOne,
    findOne,
    editOne,
    deleteOne
}