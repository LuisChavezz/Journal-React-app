import React from 'react'
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar'


export const NoteScreen = () => {
    
    const { active: note } = useSelector(state => state.notes);
    console.log(note);
    // use form
    const [ formValues, handleInputChange ] = useForm( note );
    const { title, body } = formValues;

    // console.log(formValues);
    
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
                                    src="https://pbs.twimg.com/media/Exq5isDW8AIHqzd?format=jpg&name=large"
                                    alt="random_image"
                                />
                            </div> 
                        )
                    
                }
            </div>
        </div>
    )
}
