import React from 'react';
import styles from './App.module.css';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';

import Row from '../components/Row';

import NOTES from '../notes';
import KEYMAP from '../keymap';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.appRef = React.createRef();
        this.patternRef = React.createRef();

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.nextPos = 0;
        this.nextNoteTime = 0.0;
        this.lookAheadSeconds = 0.1;
        this.notesInQueue = [];
        this.lastPosDrawn = 0;
        this.noteLength = 0.5;
        let gainNode = this.audioContext.createGain();
        //gainNode.gain.value = this.state.volume
        gainNode.gain.value = 0.5
        gainNode.connect(this.audioContext.destination);
        this.masterGainNode = gainNode;

        this.rowHeight = 31;
    }

    state = {
        curPos: 0,
        curColumn: 0,
        curSequenceIdx: 0,
        curPlayingSequenceIdx: 0,
        isPlaying: false,
        selectedInstrumentIdx: 0
    }

    componentDidMount = _ => {
        this.appRef.current.focus();
    }

    toggleIsRecording = _ => {
        this.props.toggleIsRecording();
    }

    getNumTracks = _ => {
        return this.props.patterns[0].rows[0].length;
    }

    curColumnRight = _ => {
        let numColsPerRow = this.getNumTracks() * 2;
        let col = (this.state.curColumn + 1 > numColsPerRow - 1) ? numColsPerRow - 1 : this.state.curColumn + 1;
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
        const scrollAmt = this.rowHeight*nextPos;
        this.patternRef.current.scrollTop = scrollAmt;
}

    curPosPrev = _ => {
        let prevPos = this.state.curPos - 1;
        
        if (prevPos < 0) {
            const lastSequenceIdx = (this.state.curSequenceIdx - 1 < 0) ? (this.props.sequence.length - 1) : (this.state.curSequenceIdx - 1);
            prevPos = this.props.patterns[this.props.sequence[lastSequenceIdx]].rows.length - 1;
            this.setState({
                curSequenceIdx: lastSequenceIdx,
                curPos: prevPos
            });
        } else {
            this.setState({
                curPos: prevPos
            });
        }
        const scrollAmt = this.rowHeight*prevPos;
        this.patternRef.current.scrollTop = scrollAmt;
    }

    onKeyDown = (pressedKey) => {
        switch(pressedKey) {
            case 'ArrowDown':
                if (!this.state.isPlaying)
                    this.curPosNext();
                break;
            case 'ArrowUp':
                if (!this.state.isPlaying)
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
            case 'z':
            case 'x':
            case 'c':
            case 'v':
            case 'b':
            case 'n':
            case 'm':
            case 'q':
            case '2':
            case 'w':
            case '3':
            case 'e':
            case 'r':
            case '5':
            case 't':
            case '6':
            case 'y':
            case '7':
            case 'u':
            case 'i':
            case '9':
            case 'o':
            case '0':
            case 'p':
            case 'Backspace': 
                this.playNote(NOTES[KEYMAP[pressedKey]]);
                if (this.props.isRecording) {
                    const note = NOTES[KEYMAP[pressedKey]];
                    let trackNum = Math.floor(this.state.curColumn / 2);
                    let instrumentIdx = this.state.selectedInstrumentIdx;
                    this.props.recordNote(note, instrumentIdx, this.state.curPos, trackNum, this.props.patterns[this.props.sequence[this.state.curSequenceIdx]].id);
                }
                break;
            default:
        }
    }

    playNote(note, intrument = null) {
        if (note === NOTES.none) return;
        /*
        const bufferSize = this.audioContext.sampleRate * 0.01;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        let data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        let noise = this.audioContext.createBufferSource();
        noise.buffer = buffer;

        let bandpass = this.audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 1000;

        noise.connect(bandpass).connect(this.masterGainNode);

        noise.start();
        */

        const osc = this.audioContext.createOscillator();
        const g = this.audioContext.createGain();
        osc.type = this.props.instruments[this.state.selectedInstrumentIdx].label;
        g.connect(this.masterGainNode);
        osc.connect(g);
        osc.frequency.value = note.frequency;
        let now = this.audioContext.currentTime;
        g.gain.setTargetAtTime(0, this.noteLength, 0.5);
        osc.start(now);
        osc.stop(now + this.noteLength);
    }

    scheduleNote = (notePos, time) => {
        this.notesInQueue.push({pos: notePos, time: time});
        
        for (let i = 0; i < this.getNumTracks(); i++) {
            const track = this.props.patterns[this.props.sequence[this.state.curPlayingSequenceIdx]].rows[notePos][i];
            const note = track.note;
            if (note === null) continue;
            let frequency = note.frequency;

            const osc = this.audioContext.createOscillator();
            const g = this.audioContext.createGain();
            g.connect(this.masterGainNode);
            osc.connect(g);
            const instrument = this.props.instruments[track.instrumentIdx];
            osc.type = instrument.label;
            osc.frequency.value = frequency;
            g.gain.setTargetAtTime(0, this.noteLength, 0.5);
            osc.start(time);
            osc.stop(time + this.noteLength);
        }
    }

    scheduler = _ => {
        while (this.nextNoteTime < this.audioContext.currentTime + this.lookAheadSeconds) {
            this.scheduleNote(this.nextPos, this.nextNoteTime);
            //this.nextNoteTime += this.noteLength;
            this.nextNoteTime += 0.135;
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
        this.setState({
            isPlaying: true
        });

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
        this.setState({
            isPlaying: false
        });

        clearTimeout(this.timer);
    }
    
    onSelectInstrument = (i) => {
        this.setState({
            selectedInstrumentIdx: i
        });
    }

    //TODO: insert at specific index
    extendSequence = _ => {
        const lastPatternId = 0;
        this.props.addPatternToSequence(lastPatternId); 
    }

    //TODO: delete specific index
    shortenSequence = _ => {
        this.props.removePatternFromSequence();
    }

    onSelectSequenceIdx = (i) => {
        this.setState({
            curPos: 0,
            curSequenceIdx: i
        });
    }

    render() {
        return (
            <div className={styles.App} ref={this.appRef} tabIndex='0' onKeyDown={(e) => {this.onKeyDown(e.key)}}>
                <div>
                    pattern: {this.props.sequence[this.state.curSequenceIdx]}
                </div>
                <ul style={{listStyle: 'none', background: 'lightyellow'}} >
                    {this.props.sequence.map((patternIdx, i) =>
                        <li key={i} onClick={() => this.onSelectSequenceIdx(i)} style={(i === this.state.curSequenceIdx) ? {background: 'yellow'} : {}} >{i}| {patternIdx}</li>
                    )}
                </ul>
                <button onClick={this.extendSequence}>+</button>
                <button onClick={this.shortenSequence}>-</button>

                <button style={{display: 'block'}} onClick={this.toggleIsRecording}>
                    {this.props.isRecording ? 'is recording' : 'is not recording'}
                </button>
                <button onClick={() => this.props.addRow(this.props.patterns[this.state.curSequenceIdx].id, this.getNumTracks())}>Add Row</button>
                <button onClick={() => this.props.subRow(this.props.patterns[this.state.curSequenceIdx].id)}>Sub Row</button>
                <button onClick={this.props.addTrack}>Add Track</button>
                <button onClick={this.props.subTrack}>Sub Track</button>
                <button onClick={this.play} >Play</button>
                <button onClick={this.stop} >Stop</button>

                <select style={{background: 'blue'}} onChange={(e) => {this.onSelectInstrument(e.target.value)}} value={this.state.selectedInstrumentIdx}>
                    {this.props.instruments.map((instrument, i) =>
                        <option key={i} value={i}>{instrument.label}</option>
                    )}
                </select>

                <div ref={this.patternRef} style={{boxSizing: 'border-box', background: 'lightgray', padding: '35vh 0', overflowY: 'scroll', height: '70vh', width: '99%', position: 'absolute', bottom: '0'}}>
                {this.props.patterns[this.props.sequence[this.state.curSequenceIdx]].rows.map((row, i) =>
                    <Row height={this.rowHeight} key={i} index={i} row={row} isRowSelected={i === this.state.curPos} curColumn={this.state.curColumn}>
                    </Row>
                )}
                </div>
            </div>
        )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleIsRecording: () => dispatch({type: actionTypes.TOGGLE_IS_RECORDING}),
        addRow: (patternId, numTracks) => dispatch({type: actionTypes.ADD_ROW, payload: {patternId, numTracks}}),
        subRow: (patternId) => dispatch({type: actionTypes.SUBTRACT_ROW, payload: {patternId}}),
        addTrack: () => dispatch({type: actionTypes.ADD_TRACK}),
        subTrack: () => dispatch({type: actionTypes.SUBTRACT_TRACK}),
        recordNote: (note, instrumentIdx, pos, trackNum, patternId) => dispatch({type: actionTypes.RECORD_NOTE, payload: {note, instrumentIdx, pos, trackNum, patternId}}),
        play: () => dispatch({type: actionTypes.PLAY}),
        addPatternToSequence: (patternId) => dispatch({type: actionTypes.ADD_PATTERN_TO_SEQUENCE, payload: {patternId}}),
        removePatternFromSequence: _ => dispatch({type: actionTypes.REMOVE_PATTERN_FROM_SEQUENCE})
    };
}

const mapStateToProps = state => {
    return {
        isRecording: state.isRecording,
        patterns: state.patterns,
        sequence: state.sequence,
        instruments: state.instruments
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
