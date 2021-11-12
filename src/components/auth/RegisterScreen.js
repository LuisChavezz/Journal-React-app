import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/ui'
import { startRegisterWithNameEmailPassword } from '../../actions/auth'

export const RegisterScreen = () => {
    
    // hook de react-redux que hace los dispatch de las acciones (actions)
    const dispatch = useDispatch();

    // Extrayendo 'msgError' del state del store
    const { msgError } = useSelector( state => state.ui ); // Tiene acceso a la información del estado de la Store

    // useForm (custom hook)
    const [ formValues, handleInputChange, reset ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formValues;

    // Registro con nombre, email y contraseña
    const handleRegister = (e) => { // onSubmit event
        e.preventDefault();

        if ( isFormValid() ) { // Sí el formulario es válido
            dispatch( startRegisterWithNameEmailPassword( name, email, password ));
        }

        reset();
    }

    // Validación del formulario con 'validator'
    const isFormValid = () => {
        if( validator.isEmpty( name ) ){
            dispatch( setError( 'Invalid name' ) );
            return false;

        } else if( !validator.isEmail(email) ) {
            dispatch( setError( 'Invalid email' ) );
            return false;

        } else if( ( !validator.equals( password, password2 ) ) || ( password.length < 5 )) {
            dispatch( setError( 'Invalid password' ) );
            return false;
        }
        
        dispatch( removeError() );;
        return true;
    }
    
    return (
        <div>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>

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
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    className="auth__input"
                    value={ name }
                    onChange={ handleInputChange }
                />

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

                <input 
                    type="password" 
                    placeholder="Confirm password"
                    name="password2"                    
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    // disabled={true}
                >
                    Register
                </button>
            </form>

            <Link to="/auth/login" className="link" >
                Already registered?
            </Link>
        </div>
    )
}
