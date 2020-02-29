import React, { Component } from 'react';



class GenresList extends Component {
    render() {
        return(
            <div className="genresList">
                <p><a href="#" className="genresLink">AMBIENT / NEW AGE</a></p>
                <p><a href="#" className="genresLink">ALTERNATIVE ROCK / PUNK</a></p>
                <p><a href="#" className="genresLink">HIP-HOP / R'N'B</a></p>
                <p><a href="#" className="genresLink sidebarActive">ELECTRONICA / DOWNTEMPO</a></p>
                <p><a href="#" className="genresLink">NEW CLUB</a></p>
                <p><a href="#" className="genresLink">UK DANCE / GRIME</a></p>
                <p><a href="#" className="genresLink">POST PUNK / NEW WAVE</a></p>
                <p><a href="#" className="genresLink">POP</a></p>
                <p><a href="#" className="genresLink">ROCK</a></p>
                <p><a href="#" className="genresLink">METAL</a></p>
                <p><a href="#" className="genresLink">JAZZ</a></p>
                <p><a href="#" className="genresLink">CLASSICAL / OPERA</a></p>
                <p><a href="#" className="genresLink">OTHER</a></p>
            </div>
        );
    }
}

export default GenresList;