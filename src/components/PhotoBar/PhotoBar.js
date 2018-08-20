import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPhotos} from "../../actions/photosAction"

import './PhotoBar.css'

class PhotoBar extends Component {

    componentDidMount() {
        this.props.getPhotos(this.props.howManyPhotos)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.imgIndex === 5) {
            this.ulElement.scrollLeft += 100
        }
    }


    render() {
        const {photosLength, imgIndex} = this.props;

        return (
            <div className="photo-bar-container">
                <button className="bar-button"
                        onClick={() => this.ulElement.scrollLeft -= 100}
                        disabled={imgIndex === 0}>
                    <i className="fas fa-chevron-circle-left"/>
                </button>
                <div className="bar-item-container" >
                    <ul ref={ul => this.ulElement = ul} onScroll={console.log('меня скролят')}>
                        {this.getPhotosFromArray()}
                    </ul>
                </div>
                <button className="bar-button"
                        onClick={() => this.ulElement.scrollLeft += 100}
                        disabled={imgIndex === (photosLength - 1)}>
                    <i className="fas fa-chevron-circle-right"/>
                </button>
            </div>
        );
    }

    getPhotosFromArray = () => {
        const {photos} = this.props;
        return photos && photos.map((i, index) =>
            <li key={index}>
                <img id={index} className="bar-item" src={i} alt="preview" onClick={this.props.selectImg}/>
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