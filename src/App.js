import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import MainPhoto from "./components/center/MainPhoto";
import PhotoBar from "./components/PhotoBar/PhotoBar";
import photos from './photos'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

class App extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            currentImg: 'https://cdn.fishki.net/upload/post/2017/03/19/2245758/tn/01-beautiful-white-cat-imagescar-wallpaper.jpg'
        };
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

    render() {
        return (
            <div className="container">
                <div className="left" onClick={this.goLeft}>
                    левый
                </div>
                <div className="center">
                    <MainPhoto
                        currentImg={this.state.currentImg}
                        openModal={this.openModal}
                    />
                    <PhotoBar photos={photos}/>
                </div>
                <div className="right" onClick={this.goRight}>
                    правый
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
                    <img
                        id="modal-img"
                        src={this.state.currentImg}
                        alt="выбранное изображение"/>
                </Modal>
            </div>
        );
    }
}

export default App;



/*
document.querySelector('.bar-button').addEventListener('click', () => {
    document.querySelector('ul').scrollLeft -= 100;
})
document.querySelectorAll('.bar-button')[1].addEventListener('click', () => {
    document.querySelector('ul').scrollLeft += 100;
})
*/
