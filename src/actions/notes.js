import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase/firebase-config"

import { types } from "../types/types";


export const startNewNote = () => {
    
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth; // getState nos regresa el estado completo del store

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        // insertar registro en la DB de firestone
            // 'uid' será el nombre de la collection (la collection de primer nivel) y "journal/notes" la rutas a guardar
        const doc = await addDoc( collection( db, `${ uid }`, "journal/notes" ), newNote);

        dispatch( activeNote( doc.id, newNote ) );

        console.log( "Document written with ID: ", doc );

    }
}

// actions
export const activeNote = ( id, note ) =>{

    return {
        type: types.notesActive,

        payload: {
            id,
            ...note
        }
    }
}

export const setNotes = ( notes ) => {

    return {
        type: types.notesLoad,

        payload: notes,
    }

}