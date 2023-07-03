import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import {useNavigate} from 'react-router-dom'

import profileService from '../Services/profile.service'
import authService from '../Services/auth.services'

const SessionContext = createContext()

function useSession(){
    return useContext(SessionContext)
}

function useProfile(){
    const {profile} = useSession()
    return profile
}

function SessionProvider({children}){
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    const logout = useCallback(() => {
        authService.logout()
        localStorage.removeItem('token')
        navigate('/login', {replace: true})
    }, [navigate])


    useEffect(() => {
        profileService.getCurrent()
        .then((profile) => {
            setProfile(profile)
        })
    }, [])

    const value = useMemo(()=>{
        return {
            profile,
            logout
        }
    }, [profile, logout])
    
// Funciones version anterior



// Funciones version anterior

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
            )
}


export {
    useSession,
    useProfile,
    SessionProvider,
    handleNavbarCollapse
}