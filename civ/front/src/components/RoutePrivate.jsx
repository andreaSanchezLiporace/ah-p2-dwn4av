import { Navigate } from "react-router-dom"

function RoutePrivate({children}){
    // Si no esta logueado redirecciona al usuario al Login para que ingrese al sitio
    if(!localStorage.getItem('token')){
        return <Navigate to="/login" />
    }
    // Si está  logueado carga los hijos de '/'
    return children
}

export default RoutePrivate