import yup from 'yup'

//Por el momento solo creamos cuentas administradoras (owner) con datos minimos requeridos
const account = yup.object({
    // REQUERIDOS:
    userName: yup.string().trim().required().min(6),
    password: yup.string().required().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), //Testing193!
    //role:  yup.string().required(), owner / humanResources / mechanic / customer,
})

export {
    account
}

    /** NO REQUERIDOS PARA CREAR LA CUENTA -> son datos para tener en la entidad de usuarios*/
    //nombre: ,
    //apellido: ,
    //dni: ,
    //subscriptionPlan: free || basic || premium,
    //subscriptionDate: día creación cuenta,
    //subscriptionRenewalDate: 1mes para plan free || 1 año para plan basic y premium
    //cCnumber: numero tarjeta de credito,
    //expirationCcDate: fecha de vencimiento tc,
    //securityCcCode: codigo de seguridad tc,
    //email: yup.string().matches(/^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$s/),
    //phone: yup.string().matches(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/),
    //avatar: ,