import React, {Component} from 'react';

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

export default MainPhoto;
