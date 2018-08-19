import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//reducers
import photosReducer from './reducers/photosReducer'

const store = createStore(photosReducer, composeWithDevTools(applyMiddleware(thunk)));

window.store = store; //для проверки

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
