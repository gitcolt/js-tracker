import React from 'react';
//import styles from './App.module.css';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';

import Row from '../components/Row';

import NOTES from '../notes';
import KEYMAP from '../keymap';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.appRef = React.createRef();
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.nextPos = 0;
        this.nextNoteTime = 0.0;
        this.lookAheadSeconds = 0.1;
        this.notesInQueue = [];
        this.lastPosDrawn = 0;
        this.noteLength = 0.5;
        let gainNode = this.audioContext.createGain();
        //gainNode.gain.value = this.state.volume
        gainNode.connect(this.audioContext.destination);
        this.masterGainNode = gainNode;
    }

    state = {
        curPos: 0, // change to curRow
        curColumn: 0,
        curSequenceIdx: 0,
        curPlayingSequenceIdx: 0
    }

    componentDidMount = _ => {
        this.appRef.current.focus();
    }

    toggleIsRecording = _ => {
        this.props.toggleIsRecording();
    }

    curColumnRight = _ => {
        let col = (this.state.curColumn + 1 > 3) ? 3 : this.state.curColumn + 1;
        this.setState({
            curColumn: col
        });
    }

    curColumnLeft = _ => {
        this.setState({
            curColumn: (this.state.curColumn - 1 < 0) ? 0 : this.state.curColumn - 1
        });
    }

    curPosNext = _ => {
        const nextPos = ( (this.state.curPos + 1) % this.props.patterns[this.props.sequence[this.state.curSequenceIdx]].rows.length );
        if (nextPos === 0) {
            this.setState({
                curSequenceIdx: (this.state.curSequenceIdx + 1) % this.props.sequence.length,
                curPos: nextPos
            });
        } else {
            this.setState({
                curPos: nextPos
            });
        }
    }

    curPosPrev = _ => {
        const prevPos = this.state.curPos - 1;
        if (prevPos < 0) {
            if ( this.state.curSequenceIdx === 0 ) {
                return;
            }
            this.setState({
                curSequenceIdx: this.state.curSequenceIdx - 1,
                curPos: this.props.patterns[this.props.sequence[this.state.curSequenceIdx - 1]].rows.length - 1
            });
        } else {
            this.setState({
                curPos: prevPos
            });
        }
    }

    onKeyDown = (pressedKey) => {
        switch(pressedKey) {
            case 'ArrowDown':
                this.curPosNext();
                break;
            case 'ArrowUp':
                this.curPosPrev();
                break;
            case 'ArrowLeft':
                this.curColumnLeft();
                break;
            case 'ArrowRight':
                this.curColumnRight();
                break;
            case ' ':
                this.props.toggleIsRecording();
                break;
            case 'q':
            case 'w':
            case 'e':
            case 'r':
            case 't':
            case 'y':
            case 'u':
            case 'i':
            case 'o':
            case 'p':
            case 'Backspace': 
                if (this.props.isRecording) {
                    const note = NOTES[KEYMAP[pressedKey]];
                    let trackNum = Math.floor(this.state.curColumn / 2);
                    this.props.recordNote(note, this.state.curPos, trackNum, this.props.patterns[this.props.sequence[this.state.curSequenceIdx]].id);
                }
                break;
            default:
        }
    }

    scheduleNote = (notePos, time) => {
        this.notesInQueue.push({pos: notePos, time: time});
        
        for (let i = 0; i < this.props.numTracks; i++) {
            let note = this.props.patterns[this.props.sequence[this.state.curPlayingSequenceIdx]].rows[notePos][i].note;
            if (note === null) continue;
            let frequency = note.frequency;

            let osc = this.audioContext.createOscillator();
            osc.type = 'square';
            osc.connect(this.masterGainNode);
            osc.frequency.value = frequency;
            osc.start(time);
            osc.stop(time + this.noteLength);
        }
    }

    scheduler = _ => {
        while (this.nextNoteTime < this.audioContext.currentTime + this.lookAheadSeconds) {
            this.scheduleNote(this.nextPos, this.nextNoteTime);
            this.nextNoteTime += this.noteLength;
            this.nextPos = (this.nextPos + 1) % this.props.patterns[this.props.sequence[this.state.curPlayingSequenceIdx]].rows.length;

            if (this.nextPos === 0) 
                this.setState({
                    curPlayingSequenceIdx: (this.state.curPlayingSequenceIdx + 1) % this.props.sequence.length
                });
        }
        this.timer = setTimeout(this.scheduler, this.lookAheadSeconds);
    }

    updatePos = _ => {
        let currentTime = this.audioContext.currentTime
        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            if (this.lastPosDrawn !== this.notesInQueue[0].pos) {
                this.curPosNext();
                this.lastPosDrawn = this.notesInQueue[0].pos;
            }
            this.notesInQueue.splice(0, 1);
        }
        requestAnimationFrame(this.updatePos);
    }

    play = _ => {
        this.nextNoteTime = this.audioContext.currentTime;
        this.nextPos = this.state.curPos;
        this.lastPosDrawn = this.state.curPos;
        this.setState({
            curPlayingSequenceIdx: this.state.curSequenceIdx
        });
        this.scheduler();
        this.updatePos();
    }

    stop = _ => {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <div ref={this.appRef} tabIndex='0' onKeyDown={(e) => {this.onKeyDown(e.key)}}>
                <div>
                    pattern: {this.props.sequence[this.state.curSequenceIdx]}
                </div>
            {/*
                <select onChange={(e) => this.props.setCurPatternIdx(e.target.value)} >
                    {this.props.patterns.map((pattern, i) =>
                        <option key={i} value={i}>{i}</option>
                    )}
                </select>
                    */}
                <select>
                    {this.props.patterns.map((pattern, i) =>
                        <option key={i} value={i}>{i}</option>
                    )}
                </select>
                <button style={{display: 'block'}} onClick={this.toggleIsRecording}>
                    {this.props.isRecording ? 'is recording' : 'is not recording'}
                </button>
                <button style={{display: 'block'}} onClick={() => this.props.addRow(this.props.patterns[this.state.curSequenceIdx].id)}>Add row</button>
                <button onClick={this.play} >Play</button>
                <button onClick={this.stop} >Stop</button>
                <div style={{background: 'red', padding: '5px'}}>
                {this.props.patterns[this.props.sequence[this.state.curSequenceIdx]].rows.map((row, i) =>
                    <Row key={i} index={i} row={row} isRowSelected={i === this.state.curPos} curColumn={this.state.curColumn}>
                    </Row>
                    /*
                    <div style={{background: 'lightgreen', margin: '5px 0'}}>
                        {row.map((track, j) =>
                            <div style={{background: 'lightblue', margin: '5px', display: 'inline-block'}} key={j} pos={i}>{track.note ? track.note.label : '...'}</div>
                        )}
                    </div>
                    */
                    /*<div style={{background: 'blue', margin: '5px'}} key={i} pos={i}>{row.note ? row.note.label : '...'}{i === this.state.curPos ? '<' : ''}</div>*/
                )}
                </div>
            </div>
        )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleIsRecording: () => dispatch({type: actionTypes.TOGGLE_IS_RECORDING}),
        addRow: (patternId) => dispatch({type: 'ADD_ROW', payload: {patternId}}),
        recordNote: (note, pos, trackNum, patternId) => dispatch({type: 'RECORD_NOTE', payload: {note, pos, trackNum, patternId}}),
        play: () => dispatch({type: 'PLAY'})
    };
}

const mapStateToProps = state => {
    return {
        isRecording: state.isRecording,
        patterns: state.patterns,
        sequence: state.sequence,
        numTracks: state.numTracks
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
