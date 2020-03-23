import React, { Component, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'; 
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class YourRating extends Component {
    state = {
        modal: false,
        selectedAudioFile: null,
        selectedArtworkFile: null,
    }

    toggle = () => { this.setState({ modal: !this.state.modal }); }

    onChangeArtwork = (e) => {
        console.log(e.target.files[0]);

        this.setState({
            selectedArtworkFile: e.target.files[0],
            loadedArtwork: 0,
        })
    }

    onChangeAudio = (e) => {
        console.log(e.target.files[0]);

        this.setState({
            selectedAudioFile: e.target.files[0],
            loadedAudio: 0,
        })
    }

    onSubmitTrack = (e) => {
        e.preventDefault();
 
        const data = new FormData();
        data.append('audio', this.state.selectedAudioFile);
        axios.post('/upload/audio', data, { 
            // receive two    parameter endpoint url ,form data
        })
        .then(res => { // then print response status
            console.log(res.data);
         })

         this.toggle();
    }

    render() {
        return(
            <div className="text-white your-rating">
                <p className="your-rating-h">Your Review: </p>
                <textarea className="text-area" placeholder="What do you think about the song? (optional)"></textarea>
                    <div className="review-buttons mt-3">
                        <FontAwesomeIcon icon={['fas', 'thumbs-up']} className="mr-1 mr-3 inactive" size="lg" />
                        <FontAwesomeIcon icon={['fas', 'thumbs-down']} className="mr-1 inactive" size="lg" />
                            
                    </div>
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
                                    <Input id="artistName" type="text" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="trackName">
                                        Track Name
                                    </Label>
                                    <Input id="trackName" type="text" />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="artwork">
                                        Upload Artwork
                                    </Label>
                                    <Input id="artwork" type="file" name="artwork" onChange={this.onChangeArtwork} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="audio">
                                        Upload Audio
                                    </Label>
                                    <Input id="audio" type="file" name="audio" onChange={this.onChangeAudio} />
                                </FormGroup>
                            </Form>     
                        </ModalBody>  

                        <ModalFooter>
                        <button className="btn btn-primary" onClick={this.onSubmitTrack}>Submit</button>       
                        <button className="btn btn-secondary" onClick={this.toggle}>Close</button>
                        </ModalFooter>      
                    </Modal>
            </div>
            
        );
    }
}

export default YourRating;