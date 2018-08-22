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

    componentDidUpdate(prevProps, prevState) {
        //сюда попадаем, когда меняется imgIndex: в handleClickImg, goLeft, goRight
        if (this.state.imgIndex !== prevState.imgIndex) {
            this.setState({currentImg: this.props.photos[this.state.imgIndex]})
        }
        //сюда попадаем, когда обновляется массив фотографий
        else if (this.props.photos.length !== prevProps.photos.length) {
            this.setState({
                currentImg: this.props.photos[prevState.imgIndex]
            })
        }
    }


    render() {
        const {isLoading, photos} = this.props;
        const {currentImg, imgIndex, modalIsOpen} = this.state;
        const blurStyle = {
            backgroundImage: 'url(' + currentImg + ')',
        };

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
                        selectImg={this.handleClickImg}
                        howManyPhotos={8}
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
                        <div className="blur"
                            style={blurStyle}/>
                        <img
                            id="modal-img"
                            src={currentImg}
                            alt="выбранное изображение"/>
                    </div>
                </Modal>
            </div>
        );
    }

    handleClickImg = (e) => {
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
        //Переход к предыдущему изображению путем изменения индекса текущего изображения в массиве.
        this.setState(prevState => ({
            imgIndex: (prevState.imgIndex - 1) >= 0? prevState.imgIndex - 1 : prevState.imgIndex,
        }))
    };

    goRight = () => {
        //Переход к следующему изображению путем изменения индекса текущего изображения в массиве.
        //Проверка на длину массива нужна, чтобы не увеличивать индекс в случае возникновения ошибки с постоянной подгрузкой.
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
