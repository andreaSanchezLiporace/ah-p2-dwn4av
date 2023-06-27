import { useState, useEffect, createRef } from "react";
import { useNavigate } from 'react-router-dom';
import * as AuthService from '../Services/auth.services.js';
import './../css/LoginPage.css';
import PropTypes from "prop-types";

function Login ({ onLogin }) {
    const spanRequiredName = createRef()
    const spanRequiredPassword = createRef()
    const divAlert = createRef()

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    let navigate = useNavigate()

    useEffect(() => {
        const AUTH_TOKEN = localStorage.getItem('auth-token')
        if(AUTH_TOKEN) {
            navigate('/', {replace: true})
        }
    }, [navigate])

    const inputChange = e => {
        switch (e.target.name) {
            case 'user':
                setUser(e.target.value)
                e.target.value !== '' ? spanRequiredName.current.className = 'd-none' : spanRequiredName.current.className = 'span-info'
                break;
            case 'password':
                setPassword(e.target.value)
                e.target.value !== '' ? spanRequiredPassword.current.className = 'd-none' : spanRequiredPassword.current.className = 'span-info'
                break;
            default:
                break;
        }
    }

    const closeBtnAlert = () => {
        setError('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(user !== '' && password !== '') {
            AuthService.login(user, password)
                .then(response => onLogin(response.user.user, response.token))
                .catch(error => setError(error.message))
        } else {
            setError('Debés completar todos los campos requeridos. Volvé a intentarlo')
            return
        }
    }

    return(
        <div className="login">
            <div className="header">
                <p>Ingresando tu usuario y contraseña podrás acceder a tu perfil de usuario.</p>
            </div>
            {
                error && 
                <div 
                    className="alert alert-danger d-flex align-items-center justify-content-around" 
                    role="alert"
                    ref={divAlert}
                >
                    <div className='w-75'>
                        {error}
                    </div>
                    <button 
                        type="button" 
                        className="btn-close" 
                        aria-label="Close"
                        onClick={closeBtnAlert}
                    ></button>
                </div>
            }
            <div className="contain">
                <div className="contain-form-login">
                    <div className='title'>
                        <h2 className='font-family-alata'>Iniciar sesión</h2>
                    </div>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div>
                            <label 
                                htmlFor="user" 
                                className='visually-hidden'
                            >
                                Nombre de usuario</label>
                            <input 
                                name='user' 
                                id='user' 
                                type='text' 
                                autoComplete='off'
                                placeholder='Nombre de usuario' 
                                aria-label='Nombre de usuario'
                                required
                                onFocus={(e) => {if (e.target.value === '') spanRequiredName.current.className = 'span-info'}}
                                onChange={(e) => inputChange(e)}
                                value={user}/>
                            <span 
                                className='d-none'
                                ref={spanRequiredName}>Campo requerido</span>
                        </div>
                        <div>
                            <input 
                                name="password" 
                                id="password" 
                                type="password" 
                                placeholder="Contraseña" 
                                aria-label='Contraseña'
                                autoComplete=''
                                required
                                onFocus={(e) => {if (e.target.value === '') spanRequiredPassword.current.className = 'span-info'}}
                                onChange={(e) => inputChange(e)}
                                value={password}/>
                            <span 
                                className='d-none'
                                ref={spanRequiredPassword}>Campo requerido</span>
                        </div>
                        <div className='buttons'>
                            <button type='submit' className='btn__home__create_account font-family-alata'>Iniciar sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;