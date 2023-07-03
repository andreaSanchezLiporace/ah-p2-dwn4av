import API from './api.service'

export async function login({userName, password}) {
    return API.call({uri: 'session', method: 'POST', body: {userName, password}})
}

export async function logout() {
    return API.call({uri: 'session', method: 'DELETE'})
}

export async function register({userName, password}) {
    console.log(userName, password)
    return API.call({uri: 'account', method: 'POST', body: {userName, password}})
}

export default{
    login,
    logout,
    register
}