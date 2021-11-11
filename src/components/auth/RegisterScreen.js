import React from 'react'
import { Link } from 'react-router-dom'

import { useForm } from '../../hooks/useForm'

export const RegisterScreen = () => {
    
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

        console.log( {name, email, password, password2} );

        reset();
    }
    
    return (
        <div>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={ handleRegister }>
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
