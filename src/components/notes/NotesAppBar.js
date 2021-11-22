import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import moment from 'moment';

import { startSaveNote, startUploadingImage } from '../../actions/notes';

export const NotesAppBar = () => {
    
    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);
    const noteDate = moment( active.date ); // guarda la fecha de la nota

    // Guardar la nota
    const handleSave = () => {
        dispatch( startSaveNote( active ) );
    }

    // Evento del botón 'picture'
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click(); // simula que se hizo 'click' en el input 'File'
    }

    // Evento: cuando se active el input 'file'
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploadingImage( file ));
        }
    }
    
    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('LL') }</span>

            <input 
                id="fileSelector"
                type="file" 
                name="file"
                style={{display: 'none'}}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }    
                >
                    Save
                </button>
            </div>
        </div>
    )
}
