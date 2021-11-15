import React, { useEffect } from 'react'
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

    //Iniciar sesión sí ya esta loggeado
    useEffect( () => {
        const auth = getAuth();

        onAuthStateChanged( auth, ( user ) => { // "observable" que se dispara cada que el usuario se loggea

            if ( user?.uid ) { // sí 'user' existe y conntiene un 'uid'
                dispatch( login( user.uid, user.displayName ) );
            }

        });
        
    }, [ dispatch ] );
    
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={ AuthRouter } />

                <Route exact path="/" component={ JournalScreen } />

                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}
