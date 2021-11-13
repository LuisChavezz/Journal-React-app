import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "@firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"


export const startLoginEmailPassword = ( email, password ) => {
    
    return ( dispatch ) => {
        const auth = getAuth();

        signInWithEmailAndPassword( auth, email, password )
            .then( ( {user} ) => {

                dispatch( login( user.uid, user.displayName ) );

            })
            .catch( e => {
                console.log(e) //imprime el error recibido en la promesa
            })
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
            });
    }
}

export const login = ( uid, displayName ) => {
    
    return {
        type: types.login,
        
        payload: {
            uid,
            displayName
        }
    }
}