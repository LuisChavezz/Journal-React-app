import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import Swal from 'sweetalert2'

import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";


export const startLoginEmailPassword = ( email, password ) => {
    
    return ( dispatch ) => {
        dispatch( startLoading() ); // bloquea el botón
        const auth = getAuth();

        signInWithEmailAndPassword( auth, email, password )
            .then( ( {user} ) => {

                dispatch( login( user.uid, user.displayName ) );
                
            })
            .catch( e => {
                Swal.fire('Error', 'Usuario y/o contraseña son incorrectos' ,'error');
                console.log(e) //imprime el error recibido en la promesa
            })
            .finally( () => { //cuando se termina la promesa
                dispatch( finishLoading() ); // desbloquea el botón
            })
        
        // setTimeout(() => {
        //     dispatch( finishLoading() );
        // }, 1500);
    }
}

export const startRegisterWithNameEmailPassword = ( name, email, password ) => {

    return ( dispatch ) => {
        const auth = getAuth();

        createUserWithEmailAndPassword( auth, email, password )
            .then( async( {user} ) => {

                await updateProfile( user, { displayName: name } );

                // console.log(user);

                dispatch( login( user.uid, user.displayName ) );

            })
            .catch( e => {
                Swal.fire('Error', 'Firebase: Error! Read the console for more details.' ,'error');
                console.log(e) //imprime el error recibido en la promesa
            })
    }

}

export const startGoogleLogin = () => {

    return ( dispatch ) => {
        const auth = getAuth();

        signInWithPopup( auth, googleAuthProvider)
            .then( ( {user} ) => {
                dispatch( login( user.uid, user.displayName ) );
            })
            .catch( e => {
                // Swal.fire('Error', 'Usuario y/o contraseña son incorrectos' ,'error');
                console.log(e) //imprime el error recibido en la promesa
            })
    }
}

export const startLogout = () => {

    return async( dispatch ) => {
        const auth = getAuth();

        await signOut( auth );

        dispatch( logout() );
    }
}


// actions
export const login = ( uid, displayName ) => {
    
    return {
        type: types.login,
        
        payload: {
            uid,
            displayName
        }
    }
}

export const logout = () => {
    
    return {
        type: types.logout,
    }
}