import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPhotos, getNextPhotos} from "../../actions/photosAction"

import './PhotoBar.css'

class PhotoBar extends Component {

    componentDidMount() {
        this.props.getPhotos(this.props.howManyPhotos);
        window.document.getElementById('viewport').addEventListener('scroll', this.scrollHandler)
    }

    scrollHandler = (e) => {
        const {photosLength, getNextPhotos, next_from} = this.props;
        if ((photosLength - 5) * 100 === e.currentTarget.scrollLeft) {
            getNextPhotos(next_from)
        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.imgIndex !== prevProps.imgIndex) {
            let {scrollLeft} = this.ulElement;
            const {imgIndex} = this.props;

            if (scrollLeft < (imgIndex - 4) * 100) {
                this.ulElement.scrollLeft = (imgIndex - 4) * 100;
            } else if (scrollLeft > imgIndex * 100) {
                this.ulElement.scrollLeft = imgIndex * 100;
            }
        }
    }

    /*componentWillReceiveProps(nextProps) {
        if (nextProps.imgIndex !== undefined) {
            let {scrollLeft} = this.ulElement;
            const {imgIndex} = nextProps;

            if (scrollLeft < (imgIndex - 4) * 100) {
                this.ulElement.scrollLeft = (imgIndex - 4) * 100;
            } else if (scrollLeft > imgIndex * 100) {
                this.ulElement.scrollLeft = imgIndex * 100;
            }
        }
    }*/

    render() {
        return (
            <div className="photo-bar-container">
                <button className="bar-button"
                        onClick={() => this.ulElement.scrollLeft += -100}>
                    <i className="fas fa-chevron-circle-left"/>
                </button>
                <div className="bar-item-container" >
                    <ul ref={ul => this.ulElement = ul}
                        id="viewport">
                        {this.getPhotosFromArray()}
                    </ul>
                </div>
                <button className="bar-button"
                        onClick={() => this.ulElement.scrollLeft += 100}>
                    <i className="fas fa-chevron-circle-right"/>
                </button>
            </div>
        );
    }

    getPhotosFromArray = () => {
        const {photos, imgIndex} = this.props;
        return photos && photos.map((i, index) =>
            <li key={index} className={`${imgIndex === index && 'active'}`}>
                <img id={index} className='bar-item' src={i} alt="preview" onClick={this.props.selectImg}/>
            </li>)
    };

}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        photos: state.photos,
        error: state.error,
        next_from: state.next_from
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPhotos: (howMany) => {
            dispatch(getPhotos(howMany))
        },
        getNextPhotos: (howMany) => {
            dispatch(getNextPhotos(howMany))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBar);