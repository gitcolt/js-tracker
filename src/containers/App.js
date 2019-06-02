import React from 'react';
import './App.css';
import * as actionTypes from '../store/actions';
import {connect} from 'react-redux';

import NoteRow from '../components/NoteRow';

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
        gainNode.gain.value = 0.2;
        gainNode.connect(this.audioContext.destination);
        this.masterGainNode = gainNode;
    }

    state = {
        notes: [{freq: 261.6},
                {freq: 293.7},
                {freq: 329.6},
                {freq: 349.2},
                {freq: 392.0},
                {freq: 440.0},
                {freq: 493.9},
                {freq: 523.3}],
        bpm: 125,
        volume: 0.1,
    };

    scheduleNote = (notePos, time) => {
        this.notesInQueue.push({pos: notePos, time: time});

        let frequency = this.state.notes[notePos].freq;
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
        setTimeout(this.scheduler, this.lookAheadSeconds);
    }

    updatePos = _ =>  {
        let currentTime = this.audioContext.currentTime;
        while (this.notesInQueue.length && this.notesInQueue[0].time < currentTime) {
            if (this.lastPosDrawn !== this.notesInQueue[0].pos) {
                this.props.onAdvance();
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

    render() {
        return (
            <div className="App" >
            <button onClick={() => {this.nextNoteTime = this.audioContext.currentTime; this.scheduler(); this.updatePos()}}>play</button>
            <input onChange={(e) => {this.onVolumeChange(e.target.value)}} type='range' min='0' max='1' defaultValue={this.state.volume} step='0.1'/>
                {this.state.notes.map((el, i) =>
                    <NoteRow key={i} pos={i} ></NoteRow>
                )}
            </div>
        )
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onAdvance: () => dispatch({type: actionTypes.ADVANCE})
    };
}

const mapStateToProps = state => {
    return {
        curPos: state.curPos
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
