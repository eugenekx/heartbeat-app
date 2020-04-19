import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Progressor from '../lib/Progressor';
import queryString from 'query-string';
import axios from 'axios';
import { loadUser } from '../actions/authActions';
import { Row, Col } from 'reactstrap';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function getTime(time) {
    if (!isNaN(time)) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    }
  }

function getDate(date) {
    let parsed = new Date(date);
    return parsed.toLocaleDateString("en-US"); 
}

export class ReviewedSong extends Component {
    state = {
        song: null,
        review: null,
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
                var width = 1245;
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
                this.waveform.style.backgroundImage = 'url(' + getGraph("#FFFFFF","#201F26") +')';
                    

                this.waveformHover.style.height = height +'px';
                this.waveformHover.style.backgroundImage = 'url(' + getGraph("#E61B4C","#E61B4C","#201F26") +')';
        
        
    }

    togglePlay = () => {
        if (this.audio.paused)
            this.audio.play();
        else
            this.audio.pause();
    }

    onChangeArtistName= (e) => {
        this.setState({
            artistName: e.target.value
        }, () => {
            const songId = this.state.song._id;

            const body = JSON.stringify({ 
                updatedSong: {
                    artistName: this.state.artistName
                }
            });
            if (this.state.song.artistName !== '') {
                axios.post(`/api/songs/update/${songId}`, body, this.getToken())
            }
        });
    }

    onChangeName= (e) => {
        this.setState({
            name: e.target.value
        }, () => {
            const songId = this.state.song._id;

            const body = JSON.stringify({ 
                updatedSong: {
                    name: this.state.name
                }
            });
            if (this.state.song.name !== '') {
                axios.post(`/api/songs/update/${songId}`, body, this.getToken())
            }
        });
    }

    updateName = (e) => {
        console.log(this.state.name);
        console.log(this.state.artistName);
    }

    onChangePoints= (e) => {
        this.setState({
            points: parseInt(e.target.value).toString()
        }, () => {
        });
        
    }

    addPoints = (e) => {
        const songId = this.state.song._id;

        const body = JSON.stringify( { points: parseInt(this.state.points) } );
        const parsed = parseInt(this.state.points); 
        if (parsed !== this.state.song.reviewPoints) {
            if (!isNaN(parsed)) {
                if (parsed >= 0) {
                    axios.post(`/api/songs/addpoints/${songId}`, body, this.getToken())
                        .then((res) => {
                            axios.get(`/api/songs/id/${songId}`, this.getToken())
                                .then(res => this.setState({ 
                                    song: res.data,
                                    points: res.data.reviewPoints.toString() 
                                }))
                            this.props.loadUser();

                        })
                }
            } else {
                this.setState({ points: '0' });
                e.target.value = '0';
            }
        }


        
    }

    componentDidMount() {
        const reviewId = queryString.parse(this.props.location.search).id;
        console.log('mounted with' + reviewId);
        axios
            .get(`/api/reviews/id/${reviewId}`, this.getToken())
            .then(res =>
                this.setState({
                    review: res.data, 
                    song: res.data.song
                }, () => {
                    console.log(this.state.review, this.state.song);
                    this.progressor = new Progressor({
                        media : this.audio,
                        bar   : this.waveform,
                        time  : this.time,
                    });

                    this.get_png();

                    this.audio.src = '/songdata/' + this.state.song.filename;
                
                    this.audio.addEventListener('loadedmetadata',() => {
                        this.setState({
                            currentTime: this.audio.currentTime,
                            duration: this.audio.duration
                        });
                    }, false);
                    
                    this.audio.addEventListener('timeupdate', () => {
                        this.setState({
                            currentTime: this.audio.currentTime
                        })
                    }, false);

                    this.setState({
                        artistName: this.state.song.artistName,
                        name: this.state.song.name,
                        namesLoaded: true,
                        points: this.state.song.reviewPoints.toString()
                    });

                }));
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
        const { song, review } = this.state;
        const duration = getTime(this.state.duration);
        const currentTime = getTime(this.state.currentTime);
        console.log(song, review);
        return (
            <SkeletonTheme color="#333333" highlightColor="#555555">
            <Container className="review-container ml-0 animate-fadein">
                { song ? 
                    <img src={song.artwork ? `/songdata/${song.artwork}` : "userpic.png"} className="artwork-uploaded"/>
                :
                    <Skeleton width={200} height={200} />
                }
                { song ? 
                <div className="song-uploaded d-inline-block ml-3 mb-5">

                    <div className="player-row ml-3">
                        { song ? 
                        <button className="footer-player-button" onClick={this.togglePlay}>
                            {!this.audio.paused ? <FontAwesomeIcon icon="pause" size="lg" className="playButton mr-3"/> : <FontAwesomeIcon icon="play" size="lg" className="playButton mr-3"/>}
                        </button>
                        : <Skeleton />}
                        
                        <div className="songinfo-namewrapper">
                            <div className="player-artist-name">{this.state.artistName}</div>
                            
                            <div className="player-track-name">{this.state.name}</div>
                        </div>
                    </div>
                                                                
                    <div className="player-row">
                        <div className="mt-4 review-player-time-left text-white">{ currentTime }</div>
                            <div id="wave_wrap">
                                <div className="player-row waveform" id="waveform" ref={(a) => { this.waveform = a; }}><div id="waveform_hover"  ref={(a) => { this.waveformHover = a; }}></div></div>
                            </div>
                        <div className="mt-4 review-player-time-right text-white">{ duration }</div>
                    </div>
                </div>
                : null }
                
                <Row>
                    {song ?
                    <div className="text-white artist-info-history animate-fadein">
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
                    : null }
                    <Col className="px-0 mx-0">
                        {review ?
                        <div className="text-white your-rating animate-fadein">
                             <p className="myBreadcrumbItem mb-0">Your review on { getDate(review.date) }</p>
                            {review.text ? <p className="your-rating-h mt-0">{review.text}</p> : <p className="no-text-provided"><i>(without text)</i></p>}
                            {review.rating ? <FontAwesomeIcon icon="thumbs-up" className="your-rating-h" /> : <FontAwesomeIcon icon="thumbs-down" className="your-rating-h" />}
                        </div>
                        : null }
                    </Col> 
                </Row>
            </Container>
            </SkeletonTheme>
            
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { loadUser })(ReviewedSong);
