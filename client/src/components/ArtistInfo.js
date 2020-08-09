import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

class ArtistInfo extends Component {
    
    render() {
        const { song } = this.props.song;
        return(
            <div className="text-white artist-info">
                <img src={ song ? `${song.user.avatar}` : "userpic.png"} alt="avatar" className="artist-avatar" />
                <div className="mt-3 artist-name mb-1">{ song ? song.user.name : '-' }</div>
                { song ? 
                                <div className="links-wrap">
                                    { song.user.bandcampLink ? 
                                        <div>
                                            <a href={song.user.bandcampLink + '.bandcamp.com'} className="artist-links">
                                                <FontAwesomeIcon icon={['fab', 'bandcamp']} className="mr-1" />
                                                Bandcamp
                                            </a>
                                        </div> 
                                        : 
                                        null
                                    }

                                    { song.user.spotifyLink ? 
                                        <div>
                                            <a href="spotify.com" className="artist-links">
                                                <FontAwesomeIcon icon={['fab', 'spotify']} className="mr-1" />
                                                Spotify
                                            </a>
                                        </div> 
                                        : 
                                        null
                                    }

                                    { song.user.facebookLink ? 
                                        <div>
                                            <a href="facebook.com" className="artist-links">
                                                <FontAwesomeIcon icon={['fab', 'facebook']} className="mr-1" />
                                                Facebook
                                            </a>
                                        </div> 
                                        : 
                                        null
                                    }

                                    { song.user.twitterLink ? 
                                        <div>
                                            <a href="twitter.com" className="artist-links">
                                                <FontAwesomeIcon icon={['fab', 'twitter']} className="mr-1" />
                                                Twitter
                                            </a>
                                        </div> 
                                        : 
                                        null
                                    }
                                </div>  
                                :
                                null
                            }      
                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    song: state.song
});

export default connect(mapStateToProps, null)(ArtistInfo);