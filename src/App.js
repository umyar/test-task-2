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
            currentImg: photos[0]
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

    goLeft = () => {
        this.setState({currentImg: photos[2]})
    }

    goRight = () => {
        this.setState({currentImg: photos[3]})
    }

    render() {
        return (
            <div className="container">
                <div className="left" onClick={this.goLeft}>
                    <i className="fas fa-angle-left"/>
                </div>
                <div className="center">
                    <MainPhoto
                        currentImg={this.state.currentImg}
                        openModal={this.openModal}
                    />
                    <PhotoBar photos={photos}/>
                </div>
                <div className="right" onClick={this.goRight}>
                    <i className="fas fa-angle-right"/>
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
