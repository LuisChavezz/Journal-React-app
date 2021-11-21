import { addDoc, collection, doc, getDocs, query, updateDoc } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

import { types } from "../types/types";

//starts
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

        console.log( "Document written with ID: ", doc.id );

    }
}

export const startLoadingNotes = ( uid ) => {

    return async ( dispatch ) => {

        // función para obtener registros de la DB de Firestone.
        const notesSnap = await getDocs( query( collection(db, `${ uid }/journal/notes` ) ) );
        const notes = [];
    
        notesSnap.forEach( snapHijo => {
            notes.push( {
                id: snapHijo.id,
                ...snapHijo.data()
            });
        });

        dispatch( setNotes( notes ));
    }
}

export const startSaveNote = ( note ) => {

    return async ( dispatch, getState ) => {
        
        const { uid } = getState().auth; // getState nos regresa el estado completo del store

        if ( !note.url ) { // elimina el url del objeto, si este no existe
            delete note.url;
        }

        const noteToFirestore = {...note};
        delete noteToFirestore.id; // elimina el id de el objeto 'note'

        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`);
        await updateDoc( noteRef, noteToFirestore );

        dispatch( refreshNote( note.id, noteToFirestore ) );

        Swal.fire('Note saved!', note.title, 'success' );
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

export const refreshNote = ( id, note ) => {

    return {
        type: types.notesUpdated,

        payload: {
            id,
            note: {
                id,
                ...note
            }
        }
    }

}