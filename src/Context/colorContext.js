import {ColorReducer} from '../Reducer/colorReducer';
import { createContext, useReducer } from 'react';
import AddColor from '../components/addColor';

const initialColor = {
    colorCodes: []
}

export const GlobalContext = createContext(initialColor);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ColorReducer, initialColor);
    const colorInput = (color)=> {
        dispatch({
            type: "ADD_COLOR",
            payload: color      
        })
    }
    return (
        <GlobalContext.Provider value={{ 
            colors: state.colorCodes,
            colorInput
             }}>
            {children}
        </GlobalContext.Provider>
    );
}