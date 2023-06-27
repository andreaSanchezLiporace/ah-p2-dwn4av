const login = async (user, password) => {
    return fetch('http://localhost:1905/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, password})
    })
        .then(async response => {
            if(response.status === 200) {
                return response.json()
            }
            throw new Error('El usuario y/o password ingresados no coinciden con nuestros registros. Volvé a intentarlo.')
        })
}

const register = async (user, password) => {
    return fetch('http://localhost:1905/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, password})
    })
        .then(async response => {
            console.log(response.message)
            if(response.status === 201) {
                return response.json()
            }
            throw new Error('El usuario ingresado ya existe. Por favor, elegí otro y volvé a intentarlo.')
        })
}

export {
    login,
    register
}