/**
 * Servicio para manejar las consultas sobre los perfiles 
 * Importa los módulos:
 * @module MongoClient para conectar con la base 
 * @module ObjectId para trabajar con el id del cliente que es un object_id
*/
import { MongoClient, ObjectId } from 'mongodb'
/** Conexión BBDD */
const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('esparta')
const collection = db.collection('profiles')

/**
 * Crea un perfil utilizando los datos de una cuenta y los datos de perfil proporcionados.
 * @param {Object} account - Objeto que representa la cuenta para la cual se creará el perfil.
 * @param {Object} profile - Objeto que contiene los datos del perfil a crear.
 * @returns {Promise<void>} Una promesa que se resuelve una vez que se ha creado el perfil.
 * @throws {Error} Si ya existe un perfil asociado a la cuenta.
 */
async function createProfile(account, profile){
    const newProfile = {
        ...profile,
        userName: account.userName,
        _id: new ObjectId(account._id),
        avatar: '/avatar-default.png'
    }
    await client.connect()

    const profileExist = await collection.findOne({_id: new ObjectId(newProfile._id)})

    if(profileExist){
        throw new Error('Ya existe un perfil para esta cuenta')
    }

    await collection.insertOne(newProfile)
}

/**
 * Obtiene un perfil utilizando su ID.
 * @param {string} idProfile - El ID del perfil a obtener.
 * @returns {Promise<Object>} Una promesa que se resuelve con el perfil encontrado.
 * @throws {Error} Si no se encuentra un perfil con el ID especificado.
*/
async function getProfile(idProfile){
    await client.connect()

    const profile = await collection.findOne({_id: new ObjectId(idProfile)})

    if(!profile){
        throw new Error('Esta cuenta no tiene creado un perfil')
    }
    return profile
}

export {
    createProfile,
    getProfile
}