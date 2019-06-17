import * as actionTypes from './actions';
import NOTES from '../notes';
import {combineReducers} from 'redux';

const sequence = [
    0,
    1
]

const pattern0 = {
    id: 0,
    rows: [
        [{note: NOTES.C5,    instrument: null},{note: NOTES.F5, instrument: null}],
        [{note: NOTES.C5,    instrument: null},{note: null, instrument: null}],
        [{note: null,        instrument: null},{note: null, instrument: null}],
        [{note: NOTES.C5,    instrument: null},{note: null, instrument: null}]
    ]
};

const pattern1 = {
    id: 1,
    rows: [
        [{note: NOTES.E5,    instrument: null},{note: null, instrument: null}],
        [{note: NOTES.D5,    instrument: null},{note: null, instrument: null}],
        [{note: null,        instrument: null},{note: null, instrument: null}],
        [{note: null,        instrument: null},{note: null, instrument: null}]
    ]
};

const patterns = [
    pattern0,
    pattern1
];

const sequenceReducer = (state = sequence, action) => {
    return sequence;
}

const patternsReducer = (patternsState = patterns, action) =>
    patternsState.map((pattern) =>
        patternReducer(pattern, action)
    )

const patternReducer = (patternState = [], action) => {
    switch(action.type) {
        case 'ADD_ROW':
            return (patternState.id === action.payload.patternId) ? {
                ...patternState,
                rows: patternState.rows.concat({
                    note: null,
                    instrument: null
                })
            } : patternState;

        case 'RECORD_NOTE':
            return (patternState.id === action.payload.patternId) ? {
                ...patternState,
                rows: patternState.rows.map((row, i) =>
                    (i === action.payload.pos) ? 
                        row.map((track, j) =>
                            (j === action.payload.trackNum) ? {
                                note: action.payload.note,
                                instrument: null
                            } : track
                        ) : row
                )
            } : patternState;

        default:
            return patternState;
    }
}

const curPosReducer = (curPosState = 0, action) => {
    switch(action.type) {
        case 'CUR_POS_NEXT':
            return (curPosState + 1 % 8);
        case 'CUR_POS_PREV':
            return (curPosState - 1 < 0) ? 0 : (curPosState - 1);
        default:
            return curPosState;
    }
}

const isRecordingReducer = (isRecordingState = false, action) =>
    (action.type === actionTypes.TOGGLE_IS_RECORDING) ? !isRecordingState : isRecordingState;

const appReducer = combineReducers({
    curPos: curPosReducer,
    isRecording: isRecordingReducer,
    patterns: patternsReducer,
    sequence: sequenceReducer,
    numTracks: () => 2
});

export default appReducer;
