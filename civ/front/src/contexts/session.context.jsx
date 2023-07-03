/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import {useNavigate} from 'react-router-dom'
import profileService from '../Services/profile.service'
import authService from '../Services/auth.services'

const SessionContext = createContext()

// Hook para obtener los datos de la sesion
function useSession(){
    return useContext(SessionContext)
}

// Hook para obtener los datos del perfil
// para imprimir por defecto el nombre del mecanico logueado en el form de crear y editar servicio
function useProfile(){
    const {profile} = useSession()
    return profile
}

// Contexto para los hijos
function SessionProvider({children}){
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()
    
    const logout = useCallback(() => {
        authService.logout()
        localStorage.removeItem('token')
        navigate('/login', {replace: true})
    }, [navigate])

    useEffect(() => {
        profileService.currentProfile()
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

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    )
}

export {
    useSession,
    useProfile,
    SessionProvider
}