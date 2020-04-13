import React, { Component } from 'react'
import axios from 'axios';
import { Table, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class History extends Component {
    state = {
        reviews: []
    }

    componentDidMount() {
        axios
            .get(`/api/reviews/history`, this.getToken())
            .then(res =>
                this.setState( { reviews: res.data } ))   
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
            <Container className="review-container classname mb-5">
                <h1 className="text-white"><strong>Your Reviews</strong></h1>
                <Table className="text-white mt-5">
                        <tbody>
                            { this.state.reviews.map((item) =>
                                <tr key={item._id}>
                                
                                    <td><Link to={`history/review?id=${item._id}`} className="sidebarItem">{item.song.name}</Link></td>
                                    
                                    <td><div className="sidebarItem">{item.song.artistName}</div></td>
                                    <td><div className="sidebarItem">{item.song.genre ? item.song.genre.text : null }</div></td>
                                    <td><div className="sidebarItem">{item.rating ? <div className="text-success">like</div> : <div className="text-danger">dislike</div>}</div></td>
                                    <td><div className="sidebarItem">{item.text ? item.text : null}</div></td>
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

export default connect(mapStateToProps)(History);
