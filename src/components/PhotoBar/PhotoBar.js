import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPhotos} from "../../actions/photosAction"

import './PhotoBar.css'

class PhotoBar extends Component {

    componentDidMount() {
        this.props.getPhotos(this.props.howManyPhotos)
    }

    render() {
        return (
            <div className="photo-bar-container">
                <button className="bar-button" onClick={() => this.divElement.scrollLeft -= 100}>
                    <i className="fas fa-chevron-circle-left"/>
                </button>
                <div className="bar-item-container" ref={div => this.divElement = div}>
                    <ul>
                        {this.getPhotosFromArray()}
                    </ul>
                </div>
                <button className="bar-button" onClick={() => this.divElement.scrollLeft += 100}>
                    <i className="fas fa-chevron-circle-right"/>
                </button>
            </div>
        );
    }

    getPhotosFromArray = () => {
        const {photos} = this.props;
        return photos && photos.map((i, index) =>
            <li key={index}>
                <img className="bar-item" src={i} alt="preview" onClick={this.props.selectImg}/>
            </li>)
    };

}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        photos: state.photos,
        error: state.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPhotos: (howMany) => {
            dispatch(getPhotos(howMany))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBar);