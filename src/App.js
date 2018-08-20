import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import MainPhoto from "./components/center/MainPhoto";
import PhotoBar from "./components/PhotoBar/PhotoBar";
import {connect} from 'react-redux'

import {getToken} from './actions/tokenAction'

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

    componentDidMount() {
        this.props.getToken()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.photos) {
            this.setState({currentImg: nextProps.photos[0]})
        }
    }

    render() {
        return (
            <div className="container">
                <div className="app-bar">
                    <button>Войти</button>
                </div>
                <div className="content">
                    <div className="left" onClick={this.goLeft}>
                        <i className="fas fa-angle-left"/>
                    </div>
                    <div className="main">
                        <MainPhoto
                            isLoading={this.props.isLoading}
                            currentImg={this.state.currentImg}
                            openModal={this.openModal}
                        />
                        <PhotoBar
                            selectImg={this.selectImage}
                            howManyPhotos={61}
                        />
                    </div>
                    <div className="right" onClick={this.goRight}>
                        <i className="fas fa-angle-right"/>
                    </div>
                </div>
                {/*МОДАЛКА*/}
                <Modal
                    isOpen={this.state.modalIsOpen}
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
                            src={this.state.currentImg}
                            alt="выбранное изображение"/>
                    </div>
                </Modal>
            </div>
        );
    }

    selectImage = (e) => {
        this.setState({currentImg: e.target.src});
    }

    openModal = () => {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal = () => {
        console.log('opened')
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    goLeft = () => {
        this.setState(prevState => ({
            imgIndex: (prevState.imgIndex - 1) >= 0? prevState.imgIndex - 1 : prevState.imgIndex //todo проверка на длину массива
        }))
    }

    goRight = () => {
        this.setState(prevState => ({
            imgIndex: (prevState.imgIndex + 1) < this.props.photos.length? prevState.imgIndex + 1 : prevState.imgIndex
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

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: () => {
            dispatch(getToken())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

//token
//d7e17e7db3c5dc32bc774fe63c2577a3accffdda2864231ce51e522bf55c08a08c15ec7a715fefa440535

//запрос за token для приложения 'photos'
//https://oauth.vk.com/authorize?client_id=6665721&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.80

//формат запроса
//https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V

//chrome extension
// https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en
