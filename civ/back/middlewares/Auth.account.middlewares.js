/**
 * Middleware para la validación de la cuenta 
 */
import * as accountSchema from '../schemas/account.schema.js'

async function accountValidate(req, res, next){
    accountSchema.account.validate(req.body, {abortEarly:false, stripUnknown:true})
    .then((account)=>{
        res.body = account
        next()
    })
    .catch(function(error){
        res.status(400).json({ error })
    })
}

export {
    accountValidate,
}