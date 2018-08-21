import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getPhotos, getNextPhotos} from "../../actions/photosAction"

import './PhotoBar.css'

class PhotoBar extends Component {

    //компонент смонтировался, пора вешать обработчик на скролл, который будет тригерить запрос за новой фото
    componentDidMount() {
        this.props.getPhotos(this.props.howManyPhotos);
        window.document.getElementById('viewport').addEventListener('scroll', this.scrollHandler)
    }

    scrollHandler = (e) => {
        const {photosLength, getNextPhotos, next_from} = this.props;
        if ((photosLength - 5) * 100 === e.currentTarget.scrollLeft) {
            //Небольшой таймаут, потому что:
            // К методам API ВКонтакте (за исключением методов из секций secure и ads) с ключом доступа пользователя можно обращаться не чаще 3 раз в секунду.
            setTimeout(() => getNextPhotos(next_from) , 350);
        }
    };

    //следим за изменением imgIndex в App компоненте, после чего скроллим наш "viewport" к текущей картинке
    componentDidUpdate(prevProps) {
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
        getNextPhotos: (next_from) => {
            dispatch(getNextPhotos(next_from))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoBar);