/*
    Hook encargado de guardar en un objeto, el valor seteado en cada
    input del formulario cada vez que haya un cambio en dicho input.
    Ejemplo:
    {
        name_del_input: valor_del_input,
        name_del_input: valor_del_input,
        name_del_input: valor_del_input,
        ...
    }
    va agregando siempre un atributo con el 'name' del input y le asigna
    el valor que tenga el mismo input.
*/

import { useState } from "react"



export const useForm = ( initialState = {} ) => {

    const [ values, setValues ] = useState( initialState );

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = (e) => { 

        setValues( {
            ...values,
            [ e.target.name ]: e.target.value
        } );
    }

    return [ values, handleInputChange, reset ];
}