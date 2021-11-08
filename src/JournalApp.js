import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRouter } from './routers/AppRouter'



export const JournalApp = () => {
    
    
    return (
        <Provider store={ store } > // Funciona como el 'useContext' pasando el 'Store'.
            <AppRouter />
        </Provider>
    )
}
