import React, { Component } from 'react';

import { Col, Row } from 'reactstrap';

class SongPlayer extends Component {
    render() {
        return(
            <div className="container-fluid text-white">
                <Row>
                    <Col className="col-auto">
                        <img src="artwork.jpeg" className="artwork"/>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                Row1
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                Row2
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SongPlayer;