import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './MainPhoto.css'

class MainPhoto extends Component {
    render() {
        return (
            <div className="main-photo-container">
                <img
                    id="main-photo"
                    src={this.props.currentImg}
                    alt="текущее изображение"
                    onClick={this.props.openModal}
                />
            </div>
        );
    }
}

MainPhoto.propTypes = {};
MainPhoto.defaultProps = {};

export default MainPhoto;
