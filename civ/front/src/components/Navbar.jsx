import { useState, createRef, useEffect } from 'react';
import { Link } from "react-router-dom"
import { useSession } from "../contexts/session.context"

function Navbar(){
    const {profile, logout} = useSession()

    const navbarSupportedContent = createRef()
    const [flagButton, setFlagButton] = useState(false)
    const [logged, setLogged] = useState(false)
    
    const handleNavbarCollapse = () => {
        if(!flagButton) {
            navbarSupportedContent.current.style.display = 'block'
            setFlagButton(true)
        } else {
            navbarSupportedContent.current.style.display = 'none'
            setFlagButton(false)
        }
    }

    useEffect(() => {
        const userName = localStorage.getItem('userName')
        if (userName) {
            setLogged(true)
        }
    }, [])

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/* Btn menú hamburguesa */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavbarCollapse}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent" ref={navbarSupportedContent}>
                <ul className="navbar-nav mr-auto">
                    {!logged ?
                        <>
                            <li className="nav-item"><Link className="nav-link font-family-alata" to={'/profile'} onClick={() => handleNavbarCollapse()}> MI PERFIL </Link></li>
                            <li className="nav-item"><Link className="nav-link font-family-alata" to={'/vehicles'} onClick={() => handleNavbarCollapse()}> VEHÍCULOS </Link></li>
                            <li className="nav-item"><Link className="nav-link font-family-alata" to={'/services'} onClick={() => handleNavbarCollapse()}> SERVICIOS </Link></li>
                            <li className="nav-item"> <Link className="nav-link font-family-alata" to={'#'} onClick={logout}> CERRAR SESIÓN ({profile.userName})</Link></li>
                        </> :
                        <>
                            <li className="nav-item"><Link className="nav-link font-family-alata" to={'/'} onClick={() => handleNavbarCollapse()}> HOME </Link></li>
                            <li className="nav-item"><Link className="nav-link font-family-alata" to={'/blog'} onClick={() => handleNavbarCollapse()}> BLOG </Link></li>
                            <li className="nav-item"> <Link className="nav-link font-family-alata" to={'/login'} onClick={() => handleNavbarCollapse()}> INGRESAR </Link> <span>|</span> <Link className="nav-link" to={'/register'} onClick={() => handleNavbarCollapse()}> CREAR CUENTA </Link></li>
                        </>
                    }
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar