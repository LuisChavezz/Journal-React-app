import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks/useForm'
import { /*login,*/ startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

export const LoginScreen = () => {

    // hook de react-redux que hace los dispatch de las acciones (actions)
    const dispatch = useDispatch();

    // useForm (custom hook)
    const [ formValues, handleInputChange, reset ] = useForm({
        email: '',
        password: '',
    });

    const { email, password } = formValues;


    // Inicio de sesión con correo y contraseña
    const handleLogin = (e) => { // onSubmit event
        e.preventDefault();

        dispatch( startLoginEmailPassword( email, password) );

        reset();
    }

    // Inicio de sesión con Gooogle
    const handleGoogleLogin = () => { //onClick event
        dispatch( startGoogleLogin() );
    }
    
    return (
        <div>
            <h3 className="auth__title">Login</h3>


            <form onSubmit={ handleLogin }>
                <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    required
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    required
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    // disabled={true}
                >
                    Login
                </button>

                <div className="auth_social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn" 
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link" >
                    Creater new account
                </Link>
            </form>
        </div>
    )
}
