import { useState, useCallback, createRef } from 'react';
import { useNavigate } from 'react-router-dom'
import * as authService from '../Services/auth.services';
import './../css/LoginPage.css'
import './../css/Buttons.css'

function Register(){
    let navigate = useNavigate() 

    const [userName, setuserName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmed, setPasswordConfirmed] = useState('')
    const [error, setError] = useState('')

    const spanRequiredName = createRef()
    const spanRequiredPassword = createRef()
    const spanRequiredPasswordConfirmed = createRef()
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
            case 'password-confirmed':
                setPasswordConfirmed(e.target.value)
                e.target.value !== '' ? spanRequiredPasswordConfirmed.current.className = 'd-none' : spanRequiredPasswordConfirmed.current.className = 'span-info'
                break;
            default:
                break;
        }
    }

    const handleRegister = useCallback((e) => {
        e.preventDefault();

        if (userName === '' || password === '' || passwordConfirmed === '') {
            setError('Debés completar todos los campos requeridos. Volvé a intentarlo');
            return;
        }
        if (password !== passwordConfirmed) {
            setError('Debés completar correctamente todos los campos requeridos. Volvé a intentarlo');
            return;
        }
        authService.register({userName, password})
            .then(response => {
                localStorage.setItem('token', response.token);
                navigate('/profile', { replace: true });
            })
            .catch(error => setError(error.message));
    }, [userName, password, passwordConfirmed, navigate, setError]);

    /*
    const handleRegister = (e) => {
        e.preventDefault()

        if (userName === '' || password === '' || passwordConfirmed === '') {
            setError('Debés completar todos los campos requeridos. Volvé a intentarlo')
            return
        }
        if (password !== passwordConfirmed) {
            setError('Debés completar correctamente todos los campos requeridos. Volvé a intentarlo')
            return
        }
        authService.register(userName, password)
            .then(response => login(response.userName.userName, response.token))
            .catch(error => setError(error.message))
            
    }, [userName, password, navigate, setError])
    */

    const closeBtnAlert = () => {
        setError('')
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
                                htmlFor="userName" 
                                className='visually-hidden'
                            >
                                Nombre de usuario</label>
                            <input 
                                name='userName' 
                                id='userName' 
                                type='text' 
                                autoComplete='off'
                                placeholder='Nombre de usuario' 
                                aria-label='Nombre de usuario'
                                required
                                onFocus={(e) => {if (e.target.value === '') spanRequiredName.current.className = 'span-info'}}
                                onChange={(e) => inputChange(e)}
                                value={userName}/>
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

export default Register