import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'

import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";

// (Para usar Redux DevTools y además el middleware para acciones asíncronas)
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// reducers a utilizar en la aplicación
const reducers = combineReducers({
    auth: authReducer,
    ui:   uiReducer,
});

// Crear el 'Store'
export const store = createStore( 
    reducers, 
    composeEnhancers( // configuración para accciones (actions) asíncronas
        applyMiddleware( thunk ) // middleware para accciones (actions) asíncronas
    )
);