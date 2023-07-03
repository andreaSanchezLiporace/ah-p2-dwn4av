import API from './api.service'

export async function currentProfile() {
    return API.call({uri: 'auth/profile'})
}

export default{
    currentProfile
}