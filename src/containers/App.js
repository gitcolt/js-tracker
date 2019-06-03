import React from 'react';
import styles from './App.module.css';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';

import NoteRow from '../components/NoteRow';

import NOTES from '../notes';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.lookAheadSeconds = 0.1;
        this.nextNoteTime = 0.0;
        this.nextPos = 0;
        this.notesInQueue = [];
        this.lastPosDrawn = 0;
        this.noteLength = 0.3;
        let gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.state.volume;
        gainNode.connect(this.audioContext.destination);
        this.masterGainNode = gainNode;

        this.appRef = React.createRef();
    }

    state = {
        isPlaying: false,
        notes: [NOTES.C5,
                NOTES.D5,
                NOTES.E5,
                NOTES.F5,
                NOTES.G5,
                NOTES.A5,
                NOTES.B5,
                NOTES.C6],
        bpm: 125,
        volume: 0.1,
    };

    componentDidMount = () => {
        this.appRef.current.focus();
    }

    onKeyDown = (e) => {
        switch(e.key) {
            case 'ArrowUp':
                this.props.curPosPrev();
                break;
            case 'ArrowDown':
                this.props.curPosNext();
                break;
            case ' ':
                this.props.toggleIsRecording();
                break;
            case 'Enter':
                this.togglePlay();
                break;
            case 'q':
                if (this.props.isRecording) {
                    this.setState(state => ({
                            notes: state.notes.map((note, i) => {
                                if (i === this.props.curPos) {
                                    return NOTES.C5;
                                } else {
                                    return note;
                                }
                            })
                        })
                    );
                }
                break;
            default:
        }
    }

    scheduleNote = (notePos, time) => {
        this.notesInQueue.push({pos: notePos, time: time});

        let frequency = this.state.notes[notePos].frequency;
        if (frequency === null) return;

        let osc = this.audioContext.createOscillator();
        osc.type = 'square';
        osc.connect(this.masterGainNode);
        osc.frequency.value = frequency;
        osc.start(time);
        osc.stop(time + this.noteLength);
    }

    scheduler = _ => {
        while (this.nextNoteTime < this.audioContext.currentTime + this.lookAheadSeconds) {
            this.scheduleNote(this.nextPos, this.nextNoteTime);
            this.nextNoteTime += this.noteLength;
            this.nextPos = (this.nextPos + 1) % this.state.notes.length;
        }
        this.timer = setTimeout(this.scheduler, this.lookAheadSeconds);
    }

    updatePos = _ =>  {
        let currentTime = this.audioContext.currentTime;
        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            if (this.lastPosDrawn !== this.notesInQueue[0].pos) {
                this.props.curPosNext();
                this.lastPosDrawn = this.notesInQueue[0].pos;
            }
            this.notesInQueue.splice(0, 1);
        }

        requestAnimationFrame(this.updatePos);
    }

    onVolumeChange = (val) => {
        this.setState({volume: val});
        this.masterGainNode.gain.value = val;
    }

    play = () => {
        this.setState({isPlaying: true});
        this.nextNoteTime = this.audioContext.currentTime;
        this.nextPos = this.props.curPos;
        this.lastPosDrawn = this.props.curPos;
        this.scheduler();
        this.updatePos();
    }

    stop = () => {
        clearTimeout(this.timer);
        this.setState({isPlaying: false});
    }

    togglePlay = () => {
        if (!this.state.isPlaying) {
            this.play();
        } else {
            this.stop();
        }
    }

    render() {
        return (
            <div ref={this.appRef} tabIndex='0' className="App" onKeyDown={(e) => {this.onKeyDown(e)}}>
                <button onClick={(e) => {this.props.toggleIsRecording(); e.target.blur()}} className={this.props.isRecording ? styles.recording : ''}>isRecording</button>
                <button onClick={this.togglePlay}>{!this.state.isPlaying ? 'play' : 'pause'}</button>
                <input onChange={(e) => {this.onVolumeChange(e.target.value)}} type='range' min='0' max='1' defaultValue={this.state.volume} step='0.1'/>
                    {this.state.notes.map((note, i) =>
                        <NoteRow key={i} pos={i} label={note.label}></NoteRow>
                    )}
            </div>
        )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        curPosNext: () => dispatch({type: actionTypes.CUR_POS_NEXT}),
        curPosPrev: () => dispatch({type: actionTypes.CUR_POS_PREV}),
        toggleIsRecording: () => dispatch({type: actionTypes.TOGGLE_IS_RECORDING})
    };
}

const mapStateToProps = state => {
    return {
        curPos: state.curPos,
        isRecording: state.isRecording
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);