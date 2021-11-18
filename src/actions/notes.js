import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";


// actions

export const startNewNote = () => {
    
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth; // getState nos regresa el estado completo del store

        // insertar registro en la DB de firestone
            // 'uid' será el nombre de la collection y "journal/notes" la rutas a guardar
        const doc = await addDoc( collection( db, `${ uid }`, "journal/notes" ), {
            title: '',
            body: '',
            date: new Date().getTime()
        });

        console.log( "Document written with ID: ", doc );

    }
}