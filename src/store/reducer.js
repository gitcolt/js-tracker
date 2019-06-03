import * as actionTypes from './actions';

const initialState = {
    curPos: 0,
    isRecording: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CUR_POS_NEXT:
            return {
                ...state,
                curPos: (state.curPos + 1) % 8
            };
        case actionTypes.CUR_POS_PREV:
            return {
                ...state,
                curPos: (state.curPos - 1 < 0) ? 0 : state.curPos - 1
            };
        case actionTypes.TOGGLE_IS_RECORDING:
            return {
                ...state,
                isRecording: !state.isRecording
            }
        default:
            return state;
    }
};

export default reducer;
