import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './PhotoBar.css'

class PhotoBar extends Component {

    getPhotosFromArray = () => {
        const {photos} = this.props;
        return photos.map((i, index) =>
            <li
            key={index}
            onClick={() => console.log('click', index)}
            >
                <img className="bar-item" src={i}/>
            </li>)
    };

    render() {
        return (
            <div className="photo-bar-container">
                <button className="bar-button"><i className="fas fa-arrow-circle-left"/></button>
                <div className="bar-item-container">
                    <ul>
                        {this.getPhotosFromArray()}
                    </ul>
                </div>
                <button className="bar-button"><i className="fas fa-arrow-circle-right"/></button>
            </div>
        );
    }
}

PhotoBar.propTypes = {};
PhotoBar.defaultProps = {};

export default PhotoBar;