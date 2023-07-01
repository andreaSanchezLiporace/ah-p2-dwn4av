/**
 * Middleware para la validación de la cuenta 
 */
import * as accountSchema from '../schemas/account.schema.js'

async function accountValidate(req, res, next){
    return accountSchema.account.validate(req.body, {abortEarly:false, stripUnknown:true})
    .then((account)=>{
        res.body = account
        next()
    })
    .catch((error) => {
        res.status(400).json({ error })
    })
}

async function profileValidate(req, res, next){
    return accountSchema.profile.validate(req.body, {abortEarly:false, stripUnknown:true})
    .then((profile)=>{
        res.body = profile
        next()
    })
    .catch((error) => {
        res.status(400).json({ error })
    })
}

export {
    accountValidate,
    profileValidate
}