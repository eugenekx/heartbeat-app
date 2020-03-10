import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Col, Row } from 'reactstrap';

class YourRating extends Component {
    render() {
        return(
            <div className="text-white your-rating">
                <p className="your-rating-h">Your Review: </p>
                <textarea className="text-area" placeholder="What do you think about the song? (optional)"></textarea>
                    <div className="review-buttons mt-3">
                        <FontAwesomeIcon icon={['fas', 'thumbs-up']} className="mr-1 mr-3 inactive" size="lg" />
                        <FontAwesomeIcon icon={['fas', 'thumbs-down']} className="mr-1 inactive" size="lg" />
                            
                    </div>
            </div>
            
        );
    }
}

export default YourRating;