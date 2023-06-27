import { createRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom"
import './../css/Header.css'

const Header = () => {
    const navbarSupportedContent = createRef()
    const [flagButton, setFlagButton] = useState(false)
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setLogged(true)
        }
    }, [])

    const handleNavbarCollapse = () => {
        if(!flagButton) {
            navbarSupportedContent.current.style.display = 'block'
            setFlagButton(true)
        } else {
            navbarSupportedContent.current.style.display = 'none'
            setFlagButton(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('user')
        window.location.href = '/'
    }

    return ( 
        <header className="header">
            <div className="visually-hidden">
                <h1>Esparta</h1>
            </div>
            <div className="header__header">
                <div className="image_logo">
                    <img src="/logoblanco.png" alt="Logotipo de Esparta" />
                </div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                        onClick={handleNavbarCollapse}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div 
                        className="collapse navbar-collapse" 
                        id="navbarSupportedContent"
                        ref={navbarSupportedContent}
                    >
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link 
                                    className="nav-link font-family-alata" 
                                    to={'/'}
                                    onClick={() => handleNavbarCollapse()}
                                >
                                    HOME
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className="nav-link font-family-alata" 
                                    to={'/blog'}
                                    onClick={() => handleNavbarCollapse()}
                                >
                                    BLOG
                                </Link>
                            </li>
                            { logged ?
                                <>
                                    <li className="nav-item">
                                        <Link 
                                            className="nav-link font-family-alata" 
                                            to={'/vehicles'}
                                            onClick={() => handleNavbarCollapse()}
                                        >
                                            VEHÍCULOS
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link 
                                            className="nav-link font-family-alata" 
                                            to={'/services'}
                                            onClick={() => handleNavbarCollapse()}
                                        >
                                            SERVICIOS
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link font-family-alata"
                                            to={'#'}
                                            onClick={() => logout()}
                                        >
                                            CERRAR SESIÓN
                                        </Link>
                                    </li>
                                </> :
                                <>
                                    <li className="nav-item">
                                        <Link 
                                            className="nav-link font-family-alata" 
                                            to={'/login'} 
                                            onClick={() => handleNavbarCollapse()}
                                        >
                                            INGRESAR
                                        </Link> 
                                        <span>|</span>
                                        <Link 
                                            className="nav-link" 
                                            to={'/register'} 
                                            onClick={() => handleNavbarCollapse()}
                                        >
                                            CREAR CUENTA
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header