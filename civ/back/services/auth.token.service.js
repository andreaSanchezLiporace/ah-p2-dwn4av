import jwt from 'jsonwebtoken';
import { database } from "./database.js"

/** Colección en la base de datos que almacena los tokens - @constant {string} */
const COLLECTION_NAME = 'tokens'

async function generateToken(account){
    return database(async db => {
        const secretKey = account._id.toString();
        const token = jwt.sign(account, secretKey)
        await db.collection(COLLECTION_NAME).insertOne({token, account_id: new ObjectId(account._id)})
        return token
    })
}

export {
    generateToken
}