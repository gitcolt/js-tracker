import React from 'react';

import Row from './Row';

import styles from './Track.module.css';

class Track extends React.Component {

    render() {
        return (
            <div className={styles.track}>
            { [{label: 'row 1'}, {label: 'row 2'}, {label: 'row 3'}].map((row) =>
                <Row noteLabel='C-5'></Row>
            )}
            </div>
        );
    }
}



export default Track;
