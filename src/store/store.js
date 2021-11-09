import { createStore, combineReducers } from "redux";
import { authReducer } from "../reducers/authReducer";

// reducer a utilizar en la aplicación
const reducers = combineReducers({
    auth: authReducer,
});

// Crear el 'Store'
export const store = createStore( 
    reducers, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //Redux DevTools
);