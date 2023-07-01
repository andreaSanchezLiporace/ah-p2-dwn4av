/**
 * Middleware para la autenticación del token.
 * Importa los módulos:
 * @module jwt de 'jsonwebtoken' para la generación y verificación de tokens.
 * @module MongoClient para conectar con la base 
 * @module ObjectId para trabajar con el id del cliente que es un object_id
*/
import jwt from 'jsonwebtoken';
import {MongoClient, ObjectId} from 'mongodb'

const client = new MongoClient('mongodb://127.0.0.1:27017')
const db = client.db('esparta')
/** Colección en la base de datos que almacena los tokens - @constant {string} */
const collection = db.collection('tokens')

async function generateToken(account){
    const token = jwt.sign(account, "secretKey");
    await client.connect()
    await collection.insertOne({token, account_id: new ObjectId(account._id)});
    return token
}

async function verifyToken(token){
    try {
        const payload = jwt.verify(token, "secretKey");

        await client.connect()

        const isSessionActive = await collection.findOne({ token, account_id: new ObjectId(payload._id)});

        if(!isSessionActive){
            console.log('La sesión no está activa');
            return null
        }
        return payload
    } catch (error){
        console.error('Error al acceder a la base de datos:', error);
        return null; // Error al acceder a la base de datos
    }
}

async function deleteToken(token) {
    await client.connect()
    await collection.deleteOne({ token })
}

export {
    generateToken, 
    verifyToken,
    deleteToken
}