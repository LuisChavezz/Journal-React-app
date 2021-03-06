import React from 'react'
import { Provider } from 'react-redux' // Funciona como el 'useContext' pasando el 'Store'.
import { store } from './store/store'
import { AppRouter } from './routers/AppRouter'



export const JournalApp = () => {
    
    
    return (
        <Provider store={ store } > 
            <AppRouter />
        </Provider>
    )
}
