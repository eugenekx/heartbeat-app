import React, { Component } from 'react';
import queryString from 'query-string';

import GenresList from './GenresList';
import SongPlayer from './SongPlayer';
import ArtistInfo from './ArtistInfo';
import YourRating from './YourRating';

import { Row, Col, Container } from 'reactstrap';

import { connect } from 'react-redux';
import { getReviewSong } from '../actions/songActions';

export class Review extends Component {
    state = {
        selectedGenre: null
    }

    componentDidUpdate() {
        const currentGenre = queryString.parse(this.props.location.search).genre;
        if (this.state.selectedGenre !== currentGenre) {
            this.setState({selectedGenre: currentGenre});
        }

    }

    render() {
        const { selectedGenre } = this.state;
        return (
            <Container className="review-container">
                <Row>
                        {selectedGenre ? <Col>{this.ReviewPage()}</Col> : null }
                    
                    
                    <Col xs='auto'>
                        <div className={`d-none d-lg-inline ${selectedGenre ? "ml-auto": null }`}>
                            {selectedGenre ? null : <h1 className="text-white font-display animate-fadein mb-5"><strong>Review</strong></h1>}
                            {selectedGenre ? <GenresList selectedGenre={selectedGenre} /> : <GenresList index /> }
                        </div>
                    </Col>
                    
                </Row>
            </Container>
        )
    }

    ReviewPage = () => {
        return (
            <div className="review-page">
                            <SongPlayer genre={this.state.selectedGenre} />
                            {this.props.song.song.msg ? null : 
                                !this.props.song.song._id ? null :
                                    <Row>
                                        <ArtistInfo />
                                        <Col className="px-0 mx-0">
                                            <YourRating />
                                        </Col>        
                                    </Row>
                            }
            </div>
        )
    }
}




const mapStateToProps = (state) => ({
    song: state.song,
});


export default connect(
    mapStateToProps, 
    { getReviewSong }
    )(Review)
