import { useState, useCallback, createRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../Services/auth.services';
import './../css/LoginPage.css';

function Login () {
    const navigate = useNavigate()

    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const spanRequiredName = createRef()
    const spanRequiredPassword = createRef()
    const divAlert = createRef()

    const inputChange = (e) => {
        switch (e.target.name) {
            case 'userName':
                setuserName(e.target.value)
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

    const OnSubmit = useCallback((e) => {
        e.preventDefault()

        authService.login({userName, password})
        .then(({account, token}) => {
            console.log("Sesión iniciada", {account, token})
            setError('')
            localStorage.setItem('token', token)
            navigate('/profile', {replace: true})
        })
        .catch(err => {
            setError(err.error.message)
        })
    }, [userName, password, navigate, setError])

    const closeBtnAlert = () => {
        setError('')
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
                    <form className="login-form" onSubmit={OnSubmit}>
                        <div>
                            <label htmlFor="userName">
                                <input 
                                    name='userName' 
                                    id='userName' 
                                    type='text' 
                                    autoComplete='off'
                                    placeholder='Nombre de usuario' 
                                    aria-label='Nombre de usuario'
                                    required
                                    onFocus={(e) => {if (e.target.value === '') spanRequiredName.current.className = 'span-info'}}
                                    onChange={inputChange}
                                    value={userName}
                                />            
                                <span className='d-none' ref={spanRequiredName}>Campo requerido </span>
                            </label>
                        </div>
                        <div>
                            <label htmlFor="pass">
                                <input 
                                    name="password" 
                                    id="password" 
                                    type="password" 
                                    placeholder="Contraseña" 
                                    aria-label='Contraseña'
                                    autoComplete=''
                                    required
                                    onFocus={(e) => {if (e.target.value === '') spanRequiredPassword.current.className = 'span-info'}}
                                    onChange={inputChange}
                                    value={password}
                                />
                                <span className='d-none' ref={spanRequiredPassword}> Campo requerido </span>
                            </label>
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

export default Login;