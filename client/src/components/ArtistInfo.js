import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

class ArtistInfo extends Component {
    
    render() {
        const { song } = this.props.song;
        return(
            <div className="text-white artist-info">
                <img src={ song ? `/songdata/${song.user.avatar}` : "userpic.png"} alt="avatar" className="artist-avatar" />
                <div className="mt-3 artist-name mb-1">{ song ? song.user.name : '-' }</div>
                <div className="links-wrap">
                    <a href="#" className="artist-links">
                        <FontAwesomeIcon icon={['fab', 'bandcamp']} className="mr-1" />
                        Bandcamp
                    </a><br />
                    <a href="#" className="artist-links">
                        <FontAwesomeIcon icon={['fab', 'spotify']} className="mr-1" />
                        Spotify
                    </a><br />
                    <a href="#" className="artist-links">
                        <FontAwesomeIcon icon={['fab', 'facebook']} className="mr-1" />
                        Facebook
                    </a><br />
                    <a href="#" className="artist-links">
                        <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-1" />
                        Twitter
                    </a><br />
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    song: state.song
});

export default connect(mapStateToProps, null)(ArtistInfo);