import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'

export const LoginScreen = () => {

    // hook de react-redux que hace los dispatch de las acciones (actions)
    const dispatch = useDispatch();

    // Extrayendo información del state del store
    const { msgError } = useSelector( state => state.ui ); // Tiene acceso a la información del estado de la Store
    const { loading } = useSelector( state => state.ui ); // Tiene acceso a la información del estado de la Store

    // useForm (custom hook)
    const [ formValues, handleInputChange, reset ] = useForm({
        email: '',
        password: '',
    });

    const { email, password } = formValues;


    // Inicio de sesión con correo y contraseña
    const handleLogin = (e) => { // onSubmit event
        e.preventDefault();

        if ( isFormValid() ) { // Sí el formulario es válido
            dispatch( startLoginEmailPassword( email, password) );

            reset();
        }
    }

    // Inicio de sesión con Gooogle
    const handleGoogleLogin = () => { //onClick event
        dispatch( startGoogleLogin() );
    }
    
    // Validación del formulario con 'validator'
    const isFormValid = () => {

        if( !validator.isEmail(email) ) {
            dispatch( setError( 'Invalid email' ) );
            return false;

        } else if( password.length < 5 ) {
            dispatch( setError( 'Invalid password' ) );
            return false;
        }
        
        dispatch( removeError() );;
        return true;
    }


    return (
        <div>
            <h3 className="auth__title">Login</h3>


            <form onSubmit={ handleLogin }>

                {
                    ( msgError ) &&
                        (
                            <div className="auth__alert-error">
                                { msgError }
                            </div>
                        )
                }

                <input 
                    type="text" 
                    placeholder="Email"
                    name="email"
                    autoComplete="off"
                    className="auth__input"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password" 
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
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
