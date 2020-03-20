import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';
import { getReviewSong } from '../actions/songActions';
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
        play: false,
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
        if (this.state.play) {
            newCount = newCount - 1;
        }
        if (newCount >= 0) {
            this.setState({ secondsLeft: newCount });
        } else {
            this.stopTimer();
        }
    }

    componentDidMount() {
        this.props.getReviewSong("5e677d5010cde82f103af417");

        console.log(this.props.song.song);

        this.audio.addEventListener("timeupdate", e => {
            var v = Math.floor(e.target.currentTime / e.target.duration * 1000)
            this.setState({
              sliderValue: v
            });
            document.getElementById('songRange').style.background = `linear-gradient(90deg, #E61B4C ${v/10}%, #5D5D5D ${v/10}%)`;
        });

        this.startTimer();
      }
    
      componentWillUnmount() {
        this.audio.removeEventListener("timeupdate", () => {});
      }

    handleSliderChange = (e) => {
        console.log(this.props.song.song.artwork);
        var v = e.target.value;
        this.setState({
            sliderValue: v
        });
        this.audio.currentTime = this.audio.duration * v / 1000; 
        //var color = 'linear-gradient(90deg, #E61B4C' + e.target.value + '%, #5D5D5D ' + e.target.value + '%)';
        e.target.style.background = `linear-gradient(90deg, #E61B4C ${v}%, #5D5D5D ${v}%)`;
    }

        
    handleVolumeSliderChange = (e) => {
        var v = e.target.value;
        this.setState({
            volumeValue: v
        });
        this.audio.volume = v / 100;
        //var color = 'linear-gradient(90deg, #E61B4C' + e.target.value + '%, #5D5D5D ' + e.target.value + '%)';
        e.target.style.background = `linear-gradient(90deg, #E61B4C ${v}%, #5D5D5D ${v}%)`;
    }

    togglePlay = (e) => {
        if (!this.state.play && this.audio.src === '') {
            this.audio.src = this.props.song.song.filename;
        }

        this.state.play ? this.audio.pause() : this.audio.play();
        this.setState({ play: !this.state.play });
        
    }

    
    render() {
        const { song } = this.props.song;
        return(
            <footer className="footerPlayer text-white">
                <img src={song.artwork} alt="avatar" className="artwork-footer" />
                <div className="footer-artist-name">{song.artistName}
                                <div className="footer-track-name">{song.name}</div>
                </div>

                <div className="footer-controls ml-5">
                <FontAwesomeIcon icon="backward" size="lg" className=""/>
                <button className="footer-player-button" onClick={this.togglePlay}>
                
                {this.state.play ? <FontAwesomeIcon icon="pause" size="lg" className="ml-4"/> : <FontAwesomeIcon icon="play" size="lg" className="ml-4"/>}
                </button>
                
                <FontAwesomeIcon icon="forward" size="lg" className="ml-4"/>
                <div className="footer-player-time ml-4">
                    {getTime(this.audio.currentTime)}
                </div>

                <div className="slide-container">
                    <input type="range" min="1" max="1000" value={this.state.sliderValue} id="songRange" class="slider" onChange={this.handleSliderChange}/>
                </div>

                <div className="footer-player-time ml-4">
                    {getTime(this.audio.duration)}
                </div>
                </div>

                <div className="footer-controls ml-auto mr-5">
                <FontAwesomeIcon icon={['fas', 'thumbs-up']} className="mr-4 inactive" id="tu" size="lg" />
                        <FontAwesomeIcon icon={['fas', 'thumbs-down']} className="mr-5 inactive" id="td" size="lg" />

                <FontAwesomeIcon icon="volume-up" size="lg" className="mr-3"/>
                <input type="range" min="1" max="100" value={this.state.volumeValue} id="volumeRange" class="volumeSlider" onChange={this.handleVolumeSliderChange}/>
                </div>

                


            </footer>
        );
    }
}

FooterPlayer.propTypes = {
    getReviewSong: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    song: state.song
});

export default connect(
    mapStateToProps, 
    { getReviewSong }
    )(FooterPlayer);