import React from 'react';
import {connect} from 'react-redux';

import styles from './NoteRow.module.css';

class NoteRow extends React.Component {

    render() {
        return (
            <div className={`${styles.noteRow} ${this.props.pos === this.props.curPos ? styles.current : ''}`}>{this.props.pos}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        curPos: state.curPos
    };
}


export default connect(mapStateToProps)(NoteRow);
