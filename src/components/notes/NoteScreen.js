import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'


export const NoteScreen = () => {
    
    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.notes);
    
    // use form
    const [ formValues, handleInputChange, reset2 ] = useForm( note );
    const { title, body } = formValues;

    const activeId = useRef( note.id );

    useEffect((  ) => {
        
        if ( note.id !== activeId.current ) {
            reset2( note );
            activeId.current = note.id;
        }

    }, [note, reset2]);

    useEffect(() => {
        
        dispatch( activeNote( formValues.id, { ...formValues } ));

    }, [formValues, dispatch]);
    
    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input 
                    type="text" 
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    name="body"
                    placeholder="What happened today?"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                ></textarea>

                {
                    ( note.url )
                        && ( 
                            <div className="notes__image">
                                <img 
                                    src={ note.url }
                                    alt="random_image"
                                />
                            </div> 
                        )
                    
                }
            </div>
        </div>
    )
}
