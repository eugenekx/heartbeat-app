import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';
import { getReviewSong, changeDuration, changeCurrentTime, playerTogglePlay, playerToggleSeek } from '../actions/songActions';
import PropTypes from 'prop-types';

function getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  }

class FooterPlayer extends Component {
    state = {
        sliderValue: 1,
        volumeValue: 100,
        secondsLeft: 5,
        enableRating: false,
    }
    
    audio = new Audio();

    startTimer = () => {
        var timerId = setInterval(this.timer, 1000);
        this.setState({timerId: timerId});
      }

    stopTimer = () => {
        clearInterval(this.state.timerId);
        this.setState({enableRating: true});
        document.getElementById('tu').classList.remove('inactive');
        document.getElementById('td').classList.remove('inactive');
    }

    timer = () => {
        var newCount = this.state.secondsLeft;
        if (this.props.song.isPlaying) {
            newCount = newCount - 1;
        }
        if (newCount >= 0) {
            this.setState({ secondsLeft: newCount });
        } else {
            this.stopTimer();
        }
    }
    componentDidUpdate(prevProps) {
        
        if (this.props.song.currentTime != prevProps.song.currentTime && this.props.song.duration) {
            var v = Math.floor(this.props.song.currentTime / this.props.song.duration * 1000)
            //console.log('v:' + v);
            if (v != this.state.sliderValue) {
                this.setState({
                    sliderValue: v
                });
            }
        }
        
        
        var c = document.getElementById('songRange')
            if (c)
                c.style.background = `linear-gradient(90deg, #E61B4C ${v/10}%, #5D5D5D ${v/10}%)`;
    }

    componentDidMount() {
        this.startTimer();
      }

    handleSliderChange = (e) => {
        var v = e.target.value;
        if (this.props.song.currentTime) {
            this.props.changeCurrentTime(this.props.song.duration / 1000 * v);
            this.props.playerToggleSeek();
        }
            
        //var color = 'linear-gradient(90deg, #E61B4C' + e.target.value + '%, #5D5D5D ' + e.target.value + '%)';
        e.target.style.background = `linear-gradient(90deg, #E61B4C ${v}%, #5D5D5D ${v}%)`;
    }

    handleSliderInput = (e) => {
        var v = e.target.value;
        e.target.style.background = `linear-gradient(90deg, #E61B4C ${v}%, #5D5D5D ${v}%)`;
    }

    handleVolumeSliderChange = (e) => {
        var v = e.target.value;
        this.setState({
            volumeValue: v
        });
        //this.audio.volume = v / 100;
        //var color = 'linear-gradient(90deg, #E61B4C' + e.target.value + '%, #5D5D5D ' + e.target.value + '%)';
        e.target.style.background = `linear-gradient(90deg, #E61B4C ${v}%, #5D5D5D ${v}%)`;
    }

    togglePlay = (e) => {
        this.props.playerTogglePlay();
    }

    render() {
        const { song } = this.props.song;
        const { isPlaying } = this.props.song;

        const duration = getTime(this.props.song.duration);
        const currentTime = getTime(this.props.song.currentTime);
        
        return(
            <footer className="footerPlayer text-white">
                { }
                <img src={song.artwork ? song.artwork : "userpic.png"} alt="avatar" className="artwork-footer" />
                <div className="footer-artist-name">{song.artistName ? song.artistName : '-'}
                                <div className="footer-track-name">{song.name ? song.name : '-' }</div>
                </div>

                <div className="footer-controls ml-5">
                <FontAwesomeIcon icon="backward" size="lg" className=""/>
                <button className="footer-player-button" onClick={this.togglePlay}>
                
                {isPlaying ? <FontAwesomeIcon icon="pause" size="lg" className="ml-4"/> : <FontAwesomeIcon icon="play" size="lg" className="ml-4"/>}
                </button>
                
                <FontAwesomeIcon icon="forward" size="lg" className="ml-4"/>
                <div className="footer-player-time ml-4">
                    {currentTime ? currentTime : '0:00'}
                </div>

                <div className="slide-container">
                    <input type="range" min="1" max="1000" value={this.state.sliderValue} id="songRange" className="slider" onChange={this.handleSliderChange} onInput={this.handleSliderInput}/>
                </div>

                <div className="footer-player-time ml-4">
                    {duration ? duration : '0:00'}
                </div>
                </div>

                <div className="footer-controls mr-5 ml-auto">
                <FontAwesomeIcon icon={['fas', 'thumbs-up']} className="mr-4 inactive d-none" id="tu" size="lg" />
                        <FontAwesomeIcon icon={['fas', 'thumbs-down']} className="mr-5 inactive d-none" id="td" size="lg" />

                <FontAwesomeIcon icon="volume-up" size="lg" className="mr-3"/>
                <input type="range" min="1" max="100" value={this.state.volumeValue} id="volumeRange" className="volumeSlider" onChange={this.handleVolumeSliderChange}/>
                </div>

                


            </footer>
        );
    }
}

FooterPlayer.propTypes = {
    getReviewSong: PropTypes.func.isRequired,
    changeDuration: PropTypes.func.isRequired,
    changeCurrentTime: PropTypes.func.isRequired,
    playerTogglePlay: PropTypes.func.isRequired,
    playerToggleSeek: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    msg: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    song: state.song,

});

export default connect(
    mapStateToProps, 
    { getReviewSong, changeCurrentTime, changeDuration, playerTogglePlay, playerToggleSeek }
    )(FooterPlayer);