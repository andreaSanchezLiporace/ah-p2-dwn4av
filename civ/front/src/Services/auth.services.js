import API from './api.service'

export async function login({user, password}) {
    return API.call({uri: 'session', method: 'POST', body: {user, password}})
}

export async function logout() {
    return API.call({uri: 'session', method: 'DELETE'})
}

export async function register({userName, password}) {
    return API.call({uri: 'account', method: 'POST', body: {userName, password}})
}

export default{
    login,
    logout,
    register
}