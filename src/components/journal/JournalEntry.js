import React from 'react'


export const JournalEntry = () => {
    
    
    
    return (
        <div className="journal__entry">
            <div 
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://cdn4.josefacchin.com/wp-content/uploads/2020/02/como-quitar-el-fondo-de-una-imagen.png)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo día                    
                </p>
                <p className="journal_entry-content">
                    Lorem Ipsum wdbibvuivbdvba
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
