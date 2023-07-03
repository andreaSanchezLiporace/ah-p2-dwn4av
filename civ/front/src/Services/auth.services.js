import API from './api.service'

export async function login({userName, password}) {
    return API.call({uri: 'session', method: 'POST', body: {userName, password}})
}

export async function logout() {
    return API.call({uri: 'session', method: 'DELETE'})
}

export async function register({userNameName, password}) {
    return API.call({uri: 'account', method: 'POST', body: {userNameName, password}})
}

export default{
    login,
    logout,
    register
}