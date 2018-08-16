import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import MainPhoto from "./components/center/MainPhoto";

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
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
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
                    contentLabel="modal-window"
                >
                    <h2>Hello</h2>
                    <img src={this.state.currentImg} alt="выбранное изображение"/>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
    }
}

export default App;
