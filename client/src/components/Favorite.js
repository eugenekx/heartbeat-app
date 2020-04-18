import React, { Component } from 'react'
import axios from 'axios';
import { Table, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function trimText(text) {
    if (text.length > 17) {
        return text.substring(0, 17) + "...";
    } else {
        return text;
    }
}

export class Favorite extends Component {
    state = {
        reviews: []
    }

    componentDidMount() {
        axios
            .get(`/api/reviews/favorite`, this.getToken())
            .then(res =>
                this.setState( { reviews: res.data } ))   
    }

    getToken = () => {
        // Get token from local storage
        const token = this.props.auth.token;

        // Headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        // If token, add to headers
        if(token) {
            config.headers['x-auth-token'] = token;
        }

        return config;
    }

    render() {
        return (
            <Container className="review-container">
                <h1 className="text-white font-display animate-fadein"><strong>Favorite</strong></h1>
                    <div className="mt-5">
                        { this.state.reviews.map((item) =>
                            <div className="yourMusicEntry ">
                                <Link to={`history/review?id=${item._id}`}>
                                <Row>
                                <img src={item.song.artwork ? `/songdata/${item.song.artwork}` : "userpic.png"} alt="avatar" className="artwork-yourMusic" />
                                    
                                        <Col className="yourMusicEntryCol ml-4 text-white" xs="4">
                                            {item.song.name}
                                        </Col>

                                        <Col className="yourMusicEntryCol text-gray" xs="3">
                                            {item.song.artistName}
                                        </Col>

                                        <Col className="yourMusicEntryCol text-white" xs="2">
                                        {item.text ? trimText(item.text) : <div className="text-gray"><i>(without text)</i></div>}
                                        </Col>

                                        <div className="yourMusicEntryCol ml-auto mr-5 text-red">
                                            {item.rating ? <FontAwesomeIcon icon="thumbs-up" className="your-rating-h" /> : <FontAwesomeIcon icon="thumbs-down" className="your-rating-h" />}
                                        </div>
                                </Row>
                                </Link>
                            </div>
                        )}
                    </div>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(Favorite);
