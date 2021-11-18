// import { types } from "../types/types";


const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        // case types.logout:

        //     return { }

        default:
            return state;
    }

}