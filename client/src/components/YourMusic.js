import React, { Component } from 'react'
import { Row, Col, Spinner, Alert, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import path from 'path';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import EditableLabel from '../lib/EditableLabel';
import Progressor from '../lib/Progressor';
import PulseLoader from 'react-spinners/PulseLoader';

function getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  }

export class YourMusic extends Component {
    state = {
        modal: false,
        selectedAudioFile: null,
        selectedArtworkFile: null,
        songsList: [],
        genresList: [],
        uploadedAudio: null,
        uploadedArtwork: null,
        artistName: '',
        name: '',
        genre: null,
        isSubmitting: true,
        song: null,
        gotpng: false,
        artworkLoading: false,
        audioLoading: false,
        currentTime: 0,
        duration: 0
    }

    audio = new Audio();
    progressor = null;

    get_png() {

        var json = '[50,42,38,33,32,28,14,18,15,38,39,30,40,41,35,35,40,38,30,42,36,37,33,28,30,32,35,33,43,36,36,39,36,29,43,32,39,25,22,21,23,24,19,17,22,21,20,17,29,24,23,30,41,32,33,35,38,39,28,35,37,37,40,36,37,33,33,32,32,30,33,30,37,37,33,35,38,35,35,31,35,35,29,26,31,30,27,30,28,30,30,27,27,37,43,35,39,36,40,35,38,41,45,37,40,34,42,39,41,39,30,37,43,35,39,47,32,33,37,34,36,36,41,40,38,38,34,34,32,35,39,40,36,38,35,37,38,32,33,32,27,30,26,32,34,29,40,36,30,38,32,38,40,34,35,37,32,36,50,39,29,34,35,38,35,40,43,38,35,41,37,36,36,35,31,30,34,23,21,34,32,26,31,35,31,25,27,34,28,32,29,29,30,28,42,36,36,31,35,38,31,31,36,34,29,32,37,28,32,29,28,29,29,31,36,29,28,34,34,29,49,29,38,25,29,26,29,36,41,40,33,38,48,50,29,27,37,38,35,45,27,32,45,31,28,41,39,39,32,36,41,42,32,32,33,37,36,48,28,40,38,27,33,37,38,32,31,35,26,29,35,34,25,32,17,18,29,16,22,14,19,18,15,13,18,59]';
                //json = JSON.parse(data);
                json= JSON.parse(json);
                console.log(json);
                var height = 90;
                var width = 730;
                var h2;
                
                var c    = document.createElement("canvas");
                c.width  = width;
                c.height = height;
                var ctx  = c.getContext("2d");

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

                    return c.toDataURL();
                }

                this.waveform.style.width  = width  +'px';
                this.waveform.style.height = height +'px';
                this.waveform.style.backgroundImage = 'url(' + getGraph("#FFFFFF","#2D2B36") +')';
                    

                this.waveformHover.style.height = height +'px';
                this.waveformHover.style.backgroundImage = 'url(' + getGraph("#E61B4C","#E61B4C","#2D2B36") +')';
        
        
    }
    

    componentDidMount() {
        axios
            .get(`/api/songs/user`, this.getToken())
            .then(res =>
                this.setState( { songsList: res.data } ))
        
        axios
            .get(`/api/genres`, this.getToken())
            .then(res =>
                this.setState( { genresList: res.data } ))
    }

    toggle = () => { this.setState({ modal: !this.state.modal }); }

    onChangeArtwork = (e) => {
        const artworkData = new FormData();
        artworkData.append('artwork', e.target.files[0]);
        this.setState({artworkLoading: true});
        axios.post('/api/upload/artwork', artworkData, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            this.setState({
                uploadedArtwork: res.data,
                artworkLoading: false
            });
        })
    }

    onChangeAudio = (e) => {
        this.setState({
            selectedAudioFile: e.target.files[0],
            loadedAudio: 0,
        })

        const audioData = new FormData();
        audioData.append('audio', e.target.files[0]);
        this.setState({audioLoading: true});
        axios.post('/api/upload/audio', audioData, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            this.setState({
                uploadedAudio: res.data,
                audioLoading: false,
                waveform: path.basename(res.data, '.mp3')+'.json',
                song: {}    
            });

            if (!this.progressor && this.waveform) {
                this.progressor = new Progressor({
                    media : this.audio,
                    bar   : this.waveform,
                    time  : this.time,
                  });
            } 
            this.setState({
                gotpng: false
            })
            if (this.progressor) {
                this.get_png();
            }
            this.setState({
                gotpng: true
            })

            this.audio.src = this.state.uploadedAudio;
            
            this.audio.addEventListener('loadedmetadata',() => {
                this.setState({
                    currentTime: this.audio.currentTime,
                    duration: this.audio.duration
                });
            },false);
            this.audio.addEventListener('timeupdate', () => {
                this.setState({
                    currentTime: this.audio.currentTime
                })
            }, false);

        })
    }

    onChangeGenre = (e) => {
        this.setState({genre: e.target.value});
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitTrack = (e) => {
        e.preventDefault();
        
        this.setState({isSubmitting: true});

        const newSong = {
            name: this.state.name,
            genre: this.state.genre,
            artistName: this.state.artistName,
            filename: this.state.uploadedAudio,
            artwork: this.state.uploadedArtwork,
            waveform: this.state.waveform
        }
        
        if (!newSong.name || !newSong.genre || 
            !newSong.artistName || !newSong.filename || 
            !newSong.artwork || !newSong.waveform) {
                this.setState({isSubmitting: false});
                return
            }

        const body = JSON.stringify(newSong);

        console.log(newSong);

        axios
            .post('/api/songs/', body, this.getToken())
            .then((res) => {
                this.setState({
                    selectedAudioFile: null,
                    selectedArtworkFile: null,
                    uploadedAudio: null,
                    uploadedArtwork: null,
                    artistName: '',
                    trackName: '',
                    genre: null,
                    isSubmitting: null
                });
                
                axios
                    .get(`/api/songs/user`, this.getToken())
                    .then(res =>
                        this.setState( { songsList: res.data } ))

                this.toggle();
            })

        
    }

    onChangeArtistName= (e) => {
        this.setState({
            artistName: e.target.value
        });
    }

    onChangeName= (e) => {
        this.setState({
            name: e.target.value
        });
    }

    onClose = (e) => {
        this.setState({
            selectedAudioFile: null,
            selectedArtworkFile: null,
            uploadedAudio: null,
            uploadedArtwork: null,
            artistName: '',
            trackName: '',
            genre: null,
            isSubmitting: null
        });
        this.toggle();
    }

    togglePlay = () => {
        if (this.audio.paused)
            this.audio.play();
        else
            this.audio.pause();
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
        const duration = getTime(this.state.duration);
        const currentTime = getTime(this.state.currentTime);
        return (
            <Container className="review-container">
                <h1 className="text-white font-display animate-fadein"><strong>Your Music</strong></h1>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} size="xl"> 
                        <ModalHeader>
                            Add Song
                        </ModalHeader>  
                        
                        <ModalBody>
                            
                            { this.state.uploadedArtwork ?
                            <img src={this.state.uploadedArtwork ? `${this.state.uploadedArtwork}` : "userpic.png"} className="artwork-uploaded animate-fadein"/>
                            :
                                <label for="artwork" className="add-artwork-placeholder  d-inline-block">
                                    {!this.state.artworkLoading ? 
                                    <div className="add-artwork-icon">
                                        <FontAwesomeIcon icon="file-image" className="" size="3x"/>
                                        <div className="add-artwork-text">Upload Artwork...</div>
                                    </div>
                                    :
                                    <div className="add-artwork-icon text-white">
                                        <FontAwesomeIcon icon="file-image" className="" size="3x"/>
                                        <div className="add-artwork-text">Loading...</div>
                                    </div>
                                    }
                                </label>
                            }
                            <Input id="artwork" type="file" accept="image/*" name="artwork" onChange={this.onChangeArtwork} className="d-none" />
                            
                            { this.state.uploadedAudio ?
                                <div className="song-uploaded d-inline-block ml-3">

                                        <div className="player-row ml-3">
                                            <button className="footer-player-button" onClick={this.togglePlay}>
                                            {!this.audio.paused ? <FontAwesomeIcon icon="pause" size="lg" className="playButton mr-3"/> : <FontAwesomeIcon icon="play" size="lg" className="playButton mr-3"/>}
                                            </button>

                                            <div>
                                                    <EditableLabel 
                                                        labelClassName="player-artist-name cursor-text"
                                                        inputClassName="artist-name-input"
                                                        inputMaxLength="50"
                                                        inputWidth="200px"
                                                        inputHeight="25px"
                                                        labelPlaceHolder="Click here to enter artist name"
                                                        value={this.state.artistName}
                                                        onChange={this.onChangeArtistName}
                                                    />
                                                    <EditableLabel 
                                                        labelClassName="player-track-name cursor-text"
                                                        inputClassName="track-name-input"
                                                        labelPlaceHolder="Click here to enter track name"
                                                        inputMaxLength="50"
                                                        inputWidth="200px"
                                                        inputHeight="25px"
                                                        value={this.state.name}
                                                        onChange={this.onChangeName}
                                                    />

                                            </div>
                                        </div>
                                        
                                        <div className="player-row">
                                            <div className="mt-4 review-player-time-left">{ currentTime }</div>
                                            <div id="wave_wrap">
                                                <div className="player-row waveform" id="waveform" ref={(a) => { this.waveform = a; }}>{ this.state.gotpng ? null : 'LOADING'}<div id="waveform_hover"  ref={(a) => { this.waveformHover = a; }}></div></div>
                                            </div>
                                            <div className="mt-4 review-player-time-right">{ duration }</div>
                                        </div>
                                </div>
                            :
                            <label for="audio" className="add-song-placeholder d-inline-block ml-3">
                                {!this.state.audioLoading ?
                                    <div className="add-artwork-icon">
                                        <FontAwesomeIcon icon="file-audio" className="" size="3x"/>
                                        <div className="add-artwork-text">Upload Audio...</div>
                                    </div>
                                :
                                    <div className="add-artwork-icon text-white">
                                        <FontAwesomeIcon icon="file-audio" className="" size="3x"/>
                                        <div className="add-artwork-text">Loading...</div>
                                    </div>
                                }
                            </label>
                            }
                            <Input id="audio" type="file" accept="audio/mp3" name="audio" onChange={this.onChangeAudio} className="d-none" />

                            <select className="custom-control mt-5 custom-select" data-style="btn-primary" id="genre" onChange={this.onChangeGenre}>
                                        <option value="" selected disabled>Select genre</option>
                                        { this.state.genresList.map((item) => 
                                            <option value={item._id} key={item._id}>{ item.text }</option>
                                        )}
                            </select>
                            
                            
                        </ModalBody>

                        <ModalFooter>
                        <button className="btn btn-danger" onClick={this.onSubmitTrack}>
                            SUBMIT
                        </button>       
                        <button className="btn btn-secondary" onClick={this.onClose}>
                            CLOSE
                        </button>
                        </ModalFooter> 
                    </Modal>

                    <div className="mt-5">
                        <div className="yourMusicEntry yourMusicEntryCol pl-2 text-red"  onClick={this.toggle}>
                            <FontAwesomeIcon icon="plus" className="mr-2" />
                            Add Song...
                        </div>
                        
                        { this.state.songsList.map((item) =>
                            <div className="yourMusicEntry">
                                <Link to={`your_music/song?id=${item._id}`}>
                                    <Row>
                                    <img src={item.artwork ? `${item.artwork}` : "userpic.png"} alt="avatar" className="artwork-yourMusic" />
                                        
                                            <Col className="yourMusicEntryCol ml-4 text-white" xs="4">
                                                {item.name}
                                            </Col>

                                            <Col className="yourMusicEntryCol text-gray" xs="3">
                                                {item.artistName}
                                            </Col>

                                            <Col className="yourMusicEntryCol text-gray" xs="2">
                                                {item.genre ? item.genre.text : 'undefined genre' }
                                            </Col>

                                            <div className="yourMusicEntryCol ml-auto mr-5 text-red">
                                                {item ? item.reviewPoints : '-'}
                                                <FontAwesomeIcon icon="headphones" className="ml-2"/>
                                            </div>
                                    </Row>
                                </Link>
                            </div>
                        )}
                    </div>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(YourMusic);
