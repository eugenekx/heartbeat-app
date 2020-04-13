import React, { Component } from 'react'
import { Spinner, Alert, Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import path from 'path';
import axios from 'axios';

import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

export class YourMusic extends Component {
    state = {
        modal: false,
        selectedAudioFile: null,
        selectedArtworkFile: null,
        songsList: [],
        genresList: [],
        uploadedAudio: null,
        uploadedArtwork: null,
        artistName: null,
        name: null,
        genre: null,
        isSubmitting: true,
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
        axios.post('/upload/artwork', artworkData, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            this.setState({uploadedArtwork: res.data});
        })
    }

    onChangeAudio = (e) => {
        this.setState({
            selectedAudioFile: e.target.files[0],
            loadedAudio: 0,
        })

        const audioData = new FormData();
        audioData.append('audio', e.target.files[0]);
        axios.post('/upload/audio', audioData, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            this.setState({
                uploadedAudio: res.data,
                waveform: path.basename(res.data, '.mp3')+'.json'    
            });
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
                    artistName: null,
                    trackName: null,
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
        return (
            <Container className="review-container">
                <h1 className="text-white "><strong>Your Music</strong></h1>
                <button className="btn btn-dark mt-3" onClick={this.toggle}> Upload </button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}> 
                        <ModalHeader>
                            Add Track
                        </ModalHeader>  

                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="artistName">
                                        Artist Name
                                    </Label>
                                    <Input id="artistName" name="artistName" onChange={this.onChange} type="text" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="trackName">
                                        Track Name
                                    </Label>
                                    <Input id="trackName" name="name" onChange={this.onChange} type="text" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="genre">
                                        Genre
                                    </Label>
                                    <select className="form-control" id="genre" onChange={this.onChangeGenre}>
                                        <option value={null}></option>
                                        { this.state.genresList.map((item) => 
                                            <option value={item._id} key={item._id}>{ item.text }</option>
                                        )}
                                    </select>
                                </FormGroup>

                                
                                
                                { this.state.uploadedArtwork ?
                                    <Alert color="success">Artwork: {this.state.uploadedArtwork}</Alert> : 
                                    <FormGroup>
                                        <Label for="artwork">
                                            Upload Artwork
                                        </Label>
                                        <Input id="artwork" type="file" name="artwork" onChange={this.onChangeArtwork} />
                                    </FormGroup>
                                }
                                { this.state.uploadedAudio ? 
                                    <Alert color="success">Audio: {this.state.uploadedAudio}</Alert> : 
                                    <FormGroup>
                                        <Label for="audio">
                                            Upload Audio
                                        </Label>
                                        <Input id="audio" type="file" name="audio" onChange={this.onChangeAudio} />
                                    </FormGroup>
                                }
                                { this.state.waveform ? 
                                    <Alert color="success">Waveform: {this.state.waveform}</Alert> :
                                    null
                                }
                            </Form>     
                        </ModalBody>  
                        
                        <ModalFooter>
                        { this.state.isSubmitting ? <Spinner size="sm" color="primary" /> : null }
                        <button className="btn btn-primary" onClick={this.onSubmitTrack}>
                            Submit
                        </button>       
                        <button className="btn btn-secondary" onClick={this.toggle}>Close</button>
                        </ModalFooter>      
                    </Modal>

                    <Table className="text-white mt-5">
                        <tbody>
                            { this.state.songsList.map((item) =>
                                <tr key={item._id}>
                                
                                    <td><Link to={`your_music/song?id=${item._id}`} className="sidebarItem">{item.name}</Link></td>
                                    
                                    <td>{item.artistName}</td>
                                    <td>{item.genre ? item.genre.text : 'undefined genre' }</td>
                                    <td>{item ? item.reviewPoints : '-'}</td>
                                </tr>
                                
                            )}
                        </tbody>
                    </Table>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(YourMusic);
