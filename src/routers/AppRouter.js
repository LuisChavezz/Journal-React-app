import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { useDispatch } from 'react-redux';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';


export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true); // estado que indica si está autenticado o no
    const [isLoggedIn, setIsLoggedIn] = useState(false); // estado para verificar si está autenticado y proteger las rutas

    //Iniciar sesión sí ya esta loggeado
    useEffect( () => {
        const auth = getAuth();

        onAuthStateChanged( auth, ( user ) => { // "observable" que se dispara cada que el usuario se loggea

            // Sí está loggeado
            if ( user?.uid ) { // sí 'user' existe y conntiene un 'uid'
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
            
            } else {
                setIsLoggedIn( false );
            }

            // Después de la verificación
            setChecking( false );

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ] );
    

    if ( checking ) {
        return (
            <h4>Wait a moment please...</h4>
        )
    }

    return (
        <Router>
            <Switch>
                {
                    isLoggedIn ?
                    (
                        <>
                            <Route exact path="/" component={ JournalScreen } />
                            <Redirect to="/" />
                        </>
                    ) :

                    (
                        <>
                            <Route path="/auth" component={ AuthRouter } />
                            <Redirect to="/auth/login" />
                        </>
                    )
                }

                {/* <Route path="/auth" component={ AuthRouter } />

                <Route exact path="/" component={ JournalScreen } />

                <Redirect to="/auth/login" /> */}
            </Switch>
        </Router>
    )
}
