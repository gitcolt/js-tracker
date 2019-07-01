import React from 'react';
import * as colors from '../colors';

//import styles from './Row.module.css';

const row = props =>
    <div style={{height: props.height + 'px', boxSizing: 'border-box', display: 'flex', whiteSpace: 'nowrap', background: colors.patternBackground, padding: '5px', fontFamily: 'Roboto Mono'}}>
        {props.index.toString(16).padStart(2, '0')}&nbsp; 
        {props.row.map((track, i) =>
            <div key={i} style={{fontFamily: 'Roboto Mono', background: 'lightgreen'}}>
                <span style={{background: (props.isRowSelected && (2*i    ) === props.curColumn) ? 'pink' : '', color: 'white'}}>
                    {track.note ? track.note.label : '...'}</span> 
                <span style={{background: (props.isRowSelected && (2*i + 1) === props.curColumn) ? 'pink' : '', color: colors.instrumentMotif}}>
                    {track.instrumentIdx !== null ? track.instrumentIdx.toString(16).padStart(2, '0') : '..'}</span>
                <span>|</span>
            </div>
        )}
    </div>

export default row;
