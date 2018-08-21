import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import MainPhoto from "./components/MainPhoto/MainPhoto";
import PhotoBar from "./components/PhotoBar/PhotoBar";
import {connect} from 'react-redux'

Modal.setAppElement('#root');

class App extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            currentImg: null,
            imgIndex: 0
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.photos) {
            this.setState({
                currentImg: nextProps.photos[this.state.imgIndex],
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.imgIndex !== prevState.imgIndex) {
            this.setState({currentImg: this.props.photos[this.state.imgIndex]})
        }
        else if (this.props.photos.length !== prevProps.photos.length) {
            this.setState({
                currentImg: this.props.photos[this.props.photos.length - 3],
                imgIndex: this.props.photos.length - 3
            })
        }
    }


    render() {
        const {isLoading, photos} = this.props;
        const {currentImg, imgIndex, modalIsOpen} = this.state;

        return (
            <div className="container">
                <div className="left" onClick={this.goLeft}>
                    <i className="fas fa-angle-left"/>
                </div>
                <div className="main">
                    <MainPhoto
                        isLoading={isLoading}
                        currentImg={currentImg}
                        openModal={this.openModal}
                    />
                    <PhotoBar
                        photosLength={photos.length}
                        imgIndex={imgIndex}
                        selectImg={this.selectImage}
                        howManyPhotos={6}
                    />
                </div>
                <div className="right" onClick={this.goRight}>
                    <i className="fas fa-angle-right"/>
                </div>
                {/*МОДАЛКА*/}
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    className="Modal"
                    overlayClassName="Overlay"
                    contentLabel="modal-window"
                    closeTimeoutMS={150}
                >
                    <div className="container-in-modal">
                        <img
                            id="modal-img"
                            src={currentImg}
                            alt="выбранное изображение"/>
                    </div>
                </Modal>
            </div>
        );
    }

    selectImage = (e) => {
        this.setState({
            currentImg: e.target.src,
            imgIndex: +e.target.id
        });
    };

    openModal = () => {
        this.setState({modalIsOpen: true});
    };

    afterOpenModal = () => {
        console.log('opened')
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    goLeft = () => {
        this.setState(prevState => ({
            imgIndex: (prevState.imgIndex - 1) >= 0? prevState.imgIndex - 1 : prevState.imgIndex,
        }))
    };

    goRight = () => {
        this.setState(prevState => ({
            imgIndex: (prevState.imgIndex + 1) < this.props.photos.length? prevState.imgIndex + 1 : prevState.imgIndex,
        }))
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        photos: state.photos,
        error: state.error
    }
};

export default connect(mapStateToProps, null)(App);

//token
//ed141a37b1bdc5ea9e77a8a88e64bb34a71fa8137fae5e96f7d5765d8f231e9d728212a4a2042c0e817ae

//запрос за token для приложения 'photos'
//https://oauth.vk.com/authorize?client_id=6665721&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=wall,friends&response_type=token&v=5.80

//формат запроса
//https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V

//chrome extension
// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
