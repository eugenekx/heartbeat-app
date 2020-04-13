import React, { Component } from 'react'

import queryString from 'query-string';
import axios from 'axios';

import { connect } from 'react-redux';

import { Container } from 'reactstrap';

export class SongInfo extends Component {
    state = {
        song: null,
        reviews: []
    }

    componentDidMount() {
        const songId = queryString.parse(this.props.location.search).id;
        
        axios
            .get(`/api/songs/id/${songId}`, this.getToken())
            .then(res =>
                this.setState({song: res.data}));
        
        axios
            .get(`/api/reviews/song/${songId}`, this.getToken())
            .then(res =>
                this.setState({reviews: res.data}));
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
        const { song } = this.state;
        console.log(song);
        return (
            <Container className="review-container">
                <img src={song ? `/songdata/${song.artwork}` : "userpic.png"} className="artwork"/>
                <h1 className="text-white"> Name: { song ? song.name : null } </h1>
                <h3 className="text-white"> Artist: { song ? song.artistName : null } </h3>
                <h3 className="text-white"> Genre: { song ? song.genre.text : null } </h3>
                <h3 className="text-white"> Review Points: { song ? song.reviewPoints : null } </h3>
                <br />
                <h1 className="text-white">Reviews</h1>
                { this.state.reviews.map((item) =>
                    <div>
                        <h3 className="text-white">Name: { item.user.name }</h3>
                        <h3 className="text-white">Text: { item.text }</h3>
                        <h3 className="text-white">Date: { item.date }</h3>
                        <p className="text-white">{item.rating ? "like" : "dislike"}</p>
                    </div>
                )}
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, null)(SongInfo);
