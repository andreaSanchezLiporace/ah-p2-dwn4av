import { useState, useEffect, createRef } from "react";
import * as AuthService from '../Services/auth.services.js'
import { useNavigate } from 'react-router-dom'
import './../css/LoginPage.css'
import './../css/Buttons.css'
import PropTypes from "prop-types";

//function Register({ onLogin }){
function Register(){
    const spanRequiredName = createRef()
    const spanRequiredPassword = createRef()
    const spanRequiredPasswordConfirmed = createRef()
    const divAlert = createRef()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmed, setPasswordConfirmed] = useState('')
    const [error, setError] = useState('')

    let navigate = useNavigate()

    useEffect(() => {
        const user = localStorage.getItem('user')
        if(user) {
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
            case 'password-confirmed':
                setPasswordConfirmed(e.target.value)
                e.target.value !== '' ? spanRequiredPasswordConfirmed.current.className = 'd-none' : spanRequiredPasswordConfirmed.current.className = 'span-info'
                break;
            default:
                break;
        }
    }

    const closeBtnAlert = () => {
        setError('')
    }

    const handleRegister = (e) => {
        e.preventDefault()
        if (user === '' || password === '' || passwordConfirmed === '') {
            setError('Debés completar todos los campos requeridos. Volvé a intentarlo')
            return
        }
        if (password !== passwordConfirmed) {
            setError('Debés completar correctamente todos los campos requeridos. Volvé a intentarlo')
            return
        }
        AuthService.register(user, password)
            .then(response => onLogin(response.user.user, response.token))
            .catch(error => setError(error.message))
    }
    
    return(
        <div className="login">
            <div className="header">
                <p>
                    Si todavía no tenés una cuenta para tu taller, registrate gratis y disfrutá de nuestro servicio.
                </p>
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
                        <h2 className='font-family-alata'>Crear cuenta</h2>
                    </div>
                    <form className="login-form" onSubmit={handleRegister}>
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
                                required
                                autoComplete=''
                                onFocus={(e) => {if (e.target.value === '') spanRequiredPassword.current.className = 'span-info'}}
                                onChange={(e) => inputChange(e)}
                                value={password}/>
                            <span 
                                className='d-none'
                                ref={spanRequiredPassword}>Campo requerido</span>
                        </div>
                        <div>
                            <input 
                                name="password-confirmed" 
                                id="password-confirmed" 
                                type="password" 
                                placeholder="Confirmá la contraseña" 
                                aria-label='Confirmá la contraseña'
                                required
                                autoComplete=''
                                onFocus={(e) => {if (e.target.value === '') spanRequiredPasswordConfirmed.current.className = 'span-info'}}
                                onChange={(e) => inputChange(e)} 
                                value={passwordConfirmed}/>
                            <span 
                                className='d-none'
                                ref={spanRequiredPasswordConfirmed}>Campo requerido</span>
                        </div>
                        <div className='buttons'>
                            <button type='submit' className='btn__home__create_account font-family-alata'>Crear cuenta</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Register.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Register