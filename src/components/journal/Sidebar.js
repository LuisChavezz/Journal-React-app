import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries'


export const Sidebar = () => {

    // hook de react-redux que hace los dispatch de las acciones (actions)
    const dispatch = useDispatch();

    
    const { displayName } = useSelector( state => state.auth ); // Tiene acceso a la información del estado de la Store

    const handleLogout = () => {
        dispatch( startLogout() );
    }


    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar mt-1">
                <h3>
                    <i className="far fa-moon"></i>
                    <span> { displayName }</span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>
            </div>

            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">New entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
