import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "@firebase/firestore";
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
        dispatch( addNewNote( doc.id, newNote ) );
    }
}

export const startLoadingNotes = ( uid ) => {

    return async ( dispatch ) => {

        // función para obtener registros de la DB de Firestore.
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

export const startUploadingImage = ( file ) => {

    return async( dispatch, getState ) => {
        
        const { active: activeNote } = getState().notes; // getState nos regresa información del store

        // Alerta de 'Cargando...'
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });


        const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dshn8thfr/upload'
        const formData = new FormData();
        formData.append('upload_preset', 'react-journal');
        formData.append('file', file);

        try {
            //petición post a nuestro cloudinary
            const response = await fetch( cloudinaryUrl, {
                method: 'POST',
                body: formData // file(img) & upload_preset
            });

            if ( response.ok ) { // si la petición es correcta
                const cloudResponse = await response.json();
                activeNote.url = cloudResponse.secure_url;
                dispatch( startSaveNote( activeNote ) );

            } else { 
                throw await response.json();
            }

        } catch (error) {
            throw error;
        }


        Swal.close(); // Cierra la alerta 'Cargando...'
    }
}

export const startDeleteNote = ( id ) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const noteRef = doc( db, `${uid}/journal/notes/${id}` )
        await deleteDoc( noteRef );
 
        dispatch( deleteNote( id ));

        Swal.fire('Note deleted!', 'The note has been deleted.', 'success' );
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

export const addNewNote = ( id, note ) => {

    return {
        type: types.notesAddNew,

        payload: {
            id,
            ...note
        }
    }
}

export const deleteNote = ( id ) => {

    return {
        type: types.notesDelete,

        payload: id
    }
}

export const notesLogout = () => {

    return {
        type: types.notesLogoutCleaning,
    }
}