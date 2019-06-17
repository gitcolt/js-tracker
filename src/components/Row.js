import React from 'react';

//import styles from './Row.module.css';



const row = props =>
    <div style={{display: 'flex', whiteSpace: 'nowrap', background: 'lightgray', padding: '5px'}}>
        {props.index.toString(16).padStart(2, '0')}&nbsp; 
        {props.row.map((track, i) =>
            <div key={i} style={{fontFamily: 'Roboto Mono', background: 'lightgreen'}}>
                <span style={{background: (props.isRowSelected && (2*i    ) === props.curColumn) ? 'pink' : '', color: 'white'}}>{track.note ? track.note.label : '...'}</span> 
                <span style={{background: (props.isRowSelected && (2*i + 1) === props.curColumn) ? 'pink' : '', color: 'blue'}}>..</span>
            </div>
        )}
    </div>

export default row;
