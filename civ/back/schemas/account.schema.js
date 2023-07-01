import yup from 'yup'

//Por el momento solo creamos cuentas administradoras (owner) con datos minimos requeridos
const account = yup.object({
    // REQUERIDOS:
    userName: yup.string().trim().required().min(6),
    password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), //Testing193!
    //role:  yup.string().required(), owner / humanResources / mechanic / customer,
})

const profile = yup.object({
    // REQUERIDOS:
    name: yup.string().trim().required().min(6),
    email: yup.string().trim().required().email(),
    //email: yup.string().matches(/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$s/),
    avatar: yup.string().trim().required().url(),

    /** NO REQUERIDOS */
    //apellido: ,
    //dni: ,
    //subscriptionPlan: free || basic || premium,
    //subscriptionDate: día creación cuenta,
    //subscriptionRenewalDate: 1mes para plan free || 1 año para plan basic y premium
    //cCclientName: nombre como está en la tarjeta
    //cCnumber: yup.string().trim().required().min(16).max(17),
    //expirationCcDate: fecha de vencimiento tc,
    //securityCcCode:  yup.string().trim().required().min(3).max(4),
    //phone: yup.string().matches(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/),
})

export {
    account,
    profile
}