import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import MainPhoto from "./components/center/MainPhoto";
import PhotoBar from "./components/PhotoBar/PhotoBar";
import photos from './photos'

Modal.setAppElement('#root');

class App extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            currentImg: photos[0],
            imgIndex: 0
        };
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
                            currentImg={photos[this.state.imgIndex]}
                            openModal={this.openModal}
                        />
                        <PhotoBar
                            selectImg={this.selectImage}
                            photos={photos}
                            how={6}
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
                            src={photos[this.state.imgIndex]}
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
            imgIndex: (prevState.imgIndex + 1) < photos.length? prevState.imgIndex + 1 : prevState.imgIndex
        }))
    }
}

export default App;

//da37b20af618f805635a8421c10dd662d94742d2443f4eb33e3bcaa0197ac3588e0dadc9fb333df3f3b5a
//https://oauth.vk.com/blank.html#access_token=da37b20af618f805635a8421c10dd662d94742d2443f4eb33e3bcaa0197ac3588e0dadc9fb333df3f3b5a&expires_in=86400&user_id=37348941
/*
document.querySelector('.bar-button').addEventListener('click', () => {
    document.querySelector('ul').scrollLeft -= 100;
})
document.querySelectorAll('.bar-button')[1].addEventListener('click', () => {
    document.querySelector('ul').scrollLeft += 100;
})
*/
