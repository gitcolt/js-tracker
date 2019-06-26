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
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.F5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: NOTES.G5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.C5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.A5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: NOTES.As5,   instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.A5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.F5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.A5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D6,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: NOTES.C5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.C5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: NOTES.A4,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.E5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
    ]
};

const pattern1 = {
    id: 1,
    rows: [
        [{note: NOTES.E5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: NOTES.D5,    instrumentIdx: 0},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}],
        [{note: null,        instrumentIdx: null},{note: null, instrumentIdx: null}]
    ]
};

const patterns = [
    pattern0,
    pattern1
];

const sequenceReducer = (sequenceState = sequence, action) => {
    switch(action.type) {
        case 'ADD_PATTERN_TO_SEQUENCE':
            return sequenceState.concat(action.payload.patternId);
        case 'REMOVE_PATTERN_FROM_SEQUENCE':
            return sequenceState.filter((patternId, i) =>
                i !== sequenceState.length - 1
            )
        default:
            return sequenceState;
    }
}

const patternsReducer = (patternsState = patterns, action) =>
    patternsState.map((pattern) =>
        patternReducer(pattern, action)
    )

const patternReducer = (patternState = [], action) => {
    switch(action.type) {
        case 'ADD_TRACK':
            return {
                ...patternState,
                rows: patternState.rows.map((row) => 
                    row.concat({note: null, instrumentIdx: null})
                )
            }
        case 'SUBTRACT_TRACK':
            return {
                ...patternState,
                rows: patternState.rows.map((row) =>
                    row.filter((track, i) =>
                        (i !== row.length - 1)
                    )
                )
            }
        case 'ADD_ROW':
            if (patternState.id === action.payload.patternId) {
                let newRow = [];
                for (let i = 0; i < action.payload.numTracks; i++) {
                    newRow.push({note: null, instrumentIdx: null});
                }
                return {
                    ...patternState,
                    rows: patternState.rows.concat([newRow])
                }
            } else {
                return patternState;
            }

        case 'SUBTRACT_ROW':
            if (patternState.id === action.payload.patternId) {
                return {
                    ...patternState,
                    rows: patternState.rows.filter((row, i) =>
                        (i !== patternState.rows.length - 1)
                    )
                }
            } else {
                return patternState;
            }

        case 'RECORD_NOTE':
            return (patternState.id === action.payload.patternId) ? {
                ...patternState,
                rows: patternState.rows.map((row, i) =>
                    (i === action.payload.pos) ? 
                        row.map((track, j) =>
                            (j === action.payload.trackNum) ? {
                                note: action.payload.note,
                                instrumentIdx: action.payload.instrumentIdx
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

const instruments = [
    {label: 'sawtooth'},
    {label: 'triangle'},
    {label: 'sine'},
    {label: 'square'},
];

const instrumentsReducer = (instrumentsState = instruments, action) =>
    instrumentsState

const appReducer = combineReducers({
    curPos: curPosReducer,
    isRecording: isRecordingReducer,
    patterns: patternsReducer,
    sequence: sequenceReducer,
    instruments: instrumentsReducer
});

export default appReducer;
