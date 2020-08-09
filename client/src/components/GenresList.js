import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getReviewSong } from '../actions/songActions';

class GenresList extends Component {
    state = {
        genresList: [],
    }

    componentDidMount() {

        // get genres list
        axios
        .get(`/api/genres`, this.getToken())
        .then(res =>
            this.setState( { genresList: res.data } ))
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedGenre !== prevProps.selectedGenre) {
            if (prevProps.selectedGenre) {
                document.getElementById(prevProps.selectedGenre).setAttribute("class", "genresLink");
            }
            if (this.props.selectedGenre) {
                document.getElementById(this.props.selectedGenre).setAttribute("class", "genresLink sidebarActive");
            }

            if (!this.props.selectedGenre && prevProps.selectedGenre) {
                document.getElementById(prevProps.selectedGenre).setAttribute("class", "indexGenresLink");
            }
        }
        
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

    onClick = (e) => {
        if (e.target.id !== this.props.selectedGenre) {
            this.props.getReviewSong(e.target.id);
        }
    }

    render() {
        return(
            <div className="genresList">
                { this.state.genresList.map((item) => 
                    <p key={item._id}><Link to={`/review?genre=${item._id}`} id={item._id} onClick={this.onClick} className={ this.props.index ? "indexGenresLink" : "genresLink"}>{item.text.toUpperCase()}</Link></p>
                )}
            </div>
        );
    }
}


const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getReviewSong })(GenresList);