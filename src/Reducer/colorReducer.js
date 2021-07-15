export const ColorReducer = (state, action)=> {
    console.log(state);
    switch(action.type) {
        case 'ADD_COLOR':
            return {
                ...state,
                colorCodes: [action.payload, ...state.colorCodes]
            };
        default: 
            return state
    }
}