import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; 



import { connect } from 'react-redux';

class YourRating extends Component {
    state = {
        text: '',
        isReviewed: null
    }

    componentDidMount() {
        if (this.state.isReviewed == null && this.props.song.song._id) {
            const song = this.props.song.song._id;
            axios
                .get(`api/reviews/is_reviewed/${song}`, this.getToken())
                .then((res) => this.setState({isReviewed: res.data}));
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.song.song._id !== this.props.song.song._id) {
            if (this.props.song.song._id) {
                const song = this.props.song.song._id;
                axios
                    .get(`api/reviews/is_reviewed/${song}`, this.getToken())
                    .then((res) => this.setState({isReviewed: res.data}));
            }
        }
    }

    componentWillUnmount() {
        console.log('bye')
    }

    onTextAreaChange = (e) => {
        this.setState({text: e.target.value})
    }

    onLike = () => {
        const user = this.props.auth.user._id;
        const song = this.props.song.song._id;
        const text = this.state.text; 
        const rating = true;

        if (!user || !song ) {
            return
        }

        const body = JSON.stringify({ user, song, text, rating });

        axios
            .post(`/api/reviews`, body, this.getToken())
            .then(res =>
                this.setState({isReviewed: true}));
    }

    onDislike = () => {
        const user = this.props.auth.user._id;
        const song = this.props.song.song._id;
        const text = this.state.text; 
        const rating = false;

        if (!user || !song ) {
            return
        }

        const body = JSON.stringify({ user, song, text, rating });

        axios
            .post(`/api/reviews`, body, this.getToken())
            .then(res =>
                this.setState({isReviewed: true}));
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

    unreviewedPage = () => {
        return (
            <div className="text-white your-rating">
                <p className="your-rating-h">Your Review: </p>
                <textarea className="text-area" onChange={this.onTextAreaChange} placeholder="What do you think about the song? (optional)"></textarea>
                    <div className="review-buttons mt-3">
                        <button className="rate-button" onClick={this.onLike}><FontAwesomeIcon icon={['fas', 'thumbs-up']} className="mr-1 mr-3" size="lg" /></button>
                        <button className="rate-button" onClick={this.onDislike}><FontAwesomeIcon icon={['fas', 'thumbs-down']} className="mr-1" size="lg" /></button>
                    </div>
            </div>
        )
    }

    reviewedPage = () => {
        return (
            <h3 className="text-white p-5">Your review has been submitted!</h3>
        )
    }

    loadingPage = () => {
        return (
            <h3 className="text-white p-5">Loading...</h3>
        )
    }

    getPage = () => {
        switch(this.state.isReviewed) {
            case false:
                return this.unreviewedPage();
            case true:
                return this.reviewedPage();
            default:
                return this.loadingPage();
        }
    }

    render() {
        const page = this.getPage();
        return(
            <div>
                { page }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    song: state.song
});


export default connect(mapStateToProps, null)(YourRating);