import React, { Component } from 'react';

import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';

class SongPlayer extends Component {
    render() {
        return(
            <div className="container-fluid text-white">
                <Row>
                    <Col className="col-auto">
                        <img src="artwork.jpeg" className="artwork"/>
                    </Col>
                    <Col>
                        <div className="player-row pl-2"><FontAwesomeIcon icon="play" size="lg" className="playButton mr-3"/>
                            <div className="player-artist-name ml-1">Tame Impala 
                                <div className="d-block player-track-name">Mind Mischief</div>
                            </div>
                        <div className="ml-auto next-song-label">NEXT SONG  <FontAwesomeIcon icon="forward" fixedWidth className="forwardButton"/> </div>
                        </div>
                        <div className="player-row waveform"></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SongPlayer;