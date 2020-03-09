import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class FooterPlayer extends Component {
    state = {
        sliderValue: 1,
        volumeValue: 100
    }
    
    
    handleSliderChange = (e) => {
        var v = e.target.value;
        this.setState({
            sliderValue: v
        });
        //var color = 'linear-gradient(90deg, #E61B4C' + e.target.value + '%, #5D5D5D ' + e.target.value + '%)';
        e.target.style.background = `linear-gradient(90deg, #E61B4C ${v}%, #5D5D5D ${v}%)`;
    }

        
    handleVolumeSliderChange = (e) => {
        var v = e.target.value;
        this.setState({
            volumeValue: v
        });
        //var color = 'linear-gradient(90deg, #E61B4C' + e.target.value + '%, #5D5D5D ' + e.target.value + '%)';
        e.target.style.background = `linear-gradient(90deg, #E61B4C ${v}%, #5D5D5D ${v}%)`;
    }

    
    render() {
        return(
            <footer className="footerPlayer text-white">
                <img src="artwork.jpeg" alt="avatar" className="artwork-footer" />
                <div className="footer-artist-name">Tame Impala 
                                <div className="footer-track-name">Mind Mischief</div>
                </div>

                <div className="footer-controls ml-5">
                <FontAwesomeIcon icon="backward" size="lg" className=""/>
                <FontAwesomeIcon icon="play" size="lg" className="ml-4"/>
                <FontAwesomeIcon icon="forward" size="lg" className="ml-4"/>
                <div className="footer-player-time ml-4">
                    0:00
                </div>

                <div className="slide-container">
                    <input type="range" min="1" max="100" value={this.state.sliderValue} id="songRange" class="slider" onChange={this.handleSliderChange}/>
                </div>

                <div className="footer-player-time ml-4">
                    0:00
                </div>
                </div>

                <div className="footer-controls ml-auto mr-5">
                <FontAwesomeIcon icon={['fas', 'thumbs-up']} className="mr-4" size="lg" />
                        <FontAwesomeIcon icon={['fas', 'thumbs-down']} className="mr-5 inactive" size="lg" />

                <FontAwesomeIcon icon="volume-up" size="lg" className="mr-3"/>
                <input type="range" min="1" max="100" value={this.state.volumeValue} id="volumeRange" class="volumeSlider" onChange={this.handleVolumeSliderChange}/>
                </div>

                


            </footer>
        );
    }
}

export default FooterPlayer;