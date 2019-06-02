import * as actionTypes from './actions';

const initialState = {
    curPos: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADVANCE:
            return {
                ...state,
                curPos: (state.curPos + 1) % 8
            };
        default:
            return state;
    }
};

export default reducer;
