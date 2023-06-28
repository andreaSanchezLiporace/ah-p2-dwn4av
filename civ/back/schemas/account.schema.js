import yup from 'yup'

// usar expresiones regulares para la validacion de cada dato con .match() y rol: yup.string().required(),
const account = yup.object({
    userName: yup.string().trim().required().min(6),
    password: yup.string().required().min(3),
})

export {
    account
}