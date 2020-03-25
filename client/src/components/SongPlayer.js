import React, { Component } from 'react';

import { Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux';
import { getReviewSong, changeDuration, changeCurrentTime, playerTogglePlay, playerToggleSeek } from '../actions/songActions';
import PropTypes from 'prop-types';

import Progressor from '../lib/Progressor';

class SongPlayer extends Component {
    audio = new Audio();
    progressor = null;


    get_png() {
        var json = '[50,42,38,33,32,28,14,18,15,38,39,30,40,41,35,35,40,38,30,42,36,37,33,28,30,32,35,33,43,36,36,39,36,29,43,32,39,25,22,21,23,24,19,17,22,21,20,17,29,24,23,30,41,32,33,35,38,39,28,35,37,37,40,36,37,33,33,32,32,30,33,30,37,37,33,35,38,35,35,31,35,35,29,26,31,30,27,30,28,30,30,27,27,37,43,35,39,36,40,35,38,41,45,37,40,34,42,39,41,39,30,37,43,35,39,47,32,33,37,34,36,36,41,40,38,38,34,34,32,35,39,40,36,38,35,37,38,32,33,32,27,30,26,32,34,29,40,36,30,38,32,38,40,34,35,37,32,36,50,39,29,34,35,38,35,40,43,38,35,41,37,36,36,35,31,30,34,23,21,34,32,26,31,35,31,25,27,34,28,32,29,29,30,28,42,36,36,31,35,38,31,31,36,34,29,32,37,28,32,29,28,29,29,31,36,29,28,34,34,29,49,29,38,25,29,26,29,36,41,40,33,38,48,50,29,27,37,38,35,45,27,32,45,31,28,41,39,39,32,36,41,42,32,32,33,37,36,48,28,40,38,27,33,37,38,32,31,35,26,29,35,34,25,32,17,18,29,16,22,14,19,18,15,13,18,59]';
        json = JSON.parse(json);
        var height = 90;
        var width = 455;
        var h2;
        
        var c    = document.createElement("canvas");
        c.width  = width;
        c.height = height;
        var ctx  = c.getContext("2d");
        console.log(c);
        function getGraph(fillStyle1,fillStyle2,fillStyle3) {
                
            if (fillStyle3) {
                var grd = ctx.createLinearGradient(0,60,0,0);
                grd.addColorStop(0.5,fillStyle1);
                grd.addColorStop(1,fillStyle2);
                fillStyle1 = grd;
                fillStyle2 = fillStyle3;
            }
            
            json.forEach(function(item, i, arr) {
                  ctx.fillStyle = fillStyle1;
                  ctx.fillRect(i * 6, height-30, 4, (item - height +20)*0.6);
                  
                  ctx.fillRect(i * 6, height-25, 4, (height - item)*0.1);
                  ctx.fillStyle = fillStyle2;
    
                    var next = json[i + 1];
    
                    if( item <= next ) {
                        h2 = next;
                    } else {
                        h2 = item;
                    }		
             
                  ctx.fillRect(i * 6 + 4, height-30, 2, (h2 - height)*0.7);
    
            });
            console.log(c);
            return c.toDataURL();
        }

        this.waveform.style.width  = width  +'px';
        this.waveform.style.height = height +'px';
        this.waveform.style.backgroundImage = 'url(' + getGraph("#FFFFFF","#201F26") +')';
            

        this.waveformHover.style.height = height +'px';
        this.waveformHover.style.backgroundImage = 'url(' + getGraph("#E61B4C","#E61B4C","#201F26") +')';

    }

    componentDidMount() {
        this.progressor = new Progressor({
            media : this.audio,
            bar   : this.waveform,
            time  : this.time,
          });



          

        
        this.props.getReviewSong("5e677d5010cde82f103af417");

        this.audio.addEventListener('timeupdate', (event) => {
            if (!this.props.seek)
                this.props.changeCurrentTime(this.audio.currentTime);
        })

        
    }

    componentDidUpdate() {
        this.get_png();


        if (this.audio.duration && !this.props.song.duration) {
            this.props.changeDuration(this.audio.duration);
        }
        console.log(this.props.song.seek);
        if (this.props.song.seek) {
            console.log('hi');
            this.audio.currentTime = this.props.song.currentTime;
            this.props.playerToggleSeek();
        }

        if (this.audio.paused && this.props.song.isPlaying) {
            this.audio.play();
        }
        if (!this.audio.paused && !this.props.song.isPlaying) {
            this.audio.pause();
        }
    }

    componentWillUnmount() {
        this.audio.removeEventListener('timeupdate');
    }

    togglePlay = (e) => {
        if (this.audio.src == '' && this.props.song.song.filename) {
            this.audio.src = this.props.song.song.filename;
        }

        this.props.playerTogglePlay();

    }

    render() {
        console.log(this.waveform);
        const { song } = this.props.song;
        return(
            <div className="container-fluid text-white">
                <Row>
                    <Col className="col-auto">
                        <img src={song.artwork ? song.artwork : "userpic.png"} className="artwork"/>
                    </Col>
                    <Col>
                        <div className="player-row pl-2">
                            
                            <button className="footer-player-button" onClick={this.togglePlay}>
                                {this.props.song.isPlaying ? <FontAwesomeIcon icon="pause" size="lg" className="playButton mr-3"/> : <FontAwesomeIcon icon="play" size="lg" className="playButton mr-3"/>}
                            </button>

                            <div className="player-artist-name ml-1">{song.artistName ? song.artistName : '-'} 
                                <div className="d-block player-track-name">{song.name ? song.name : '-' }</div>
                            </div>
                        <div className="ml-auto next-song-label">NEXT SONG  <FontAwesomeIcon icon="forward" fixedWidth className="forwardButton"/> </div>
                        </div>
                        <div id="wave_wrap">
                            <div className="player-row waveform" id="waveform" ref={(a) => { this.waveform = a; }}><div id="waveform_hover"  ref={(a) => { this.waveformHover = a; }}></div></div>
                        </div>
                        <p className="d-none" ref={(a) => { this.time = a; }}></p>
                    </Col>
                </Row>
            </div>
        );
    }
}

SongPlayer.propTypes = {
    getReviewSong: PropTypes.func.isRequired,
    changeDuration: PropTypes.func.isRequired,
    changeCurrentTime: PropTypes.func.isRequired,
    playerTogglePlay: PropTypes.func.isRequired,
    playerToggleSeek: PropTypes.func.isRequired,
    song: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    seek: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
    song: state.song
});

export default connect(
    mapStateToProps, 
    { getReviewSong, changeCurrentTime, changeDuration, playerTogglePlay, playerToggleSeek }
    )(SongPlayer);