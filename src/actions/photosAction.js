import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL,
        LOAD_NEXT_PHOTOS_START, LOAD_NEXT_PHOTOS_SUCCESS, LOAD_NEXT_PHOTOS_FAIL} from "./constants"
import axios from 'axios'

const access_token = '5a27c1a50db258e805bb9585caaf63ebdf0af1dd2a920c738cab5b788c2429fd85ea030f42e132724c2e8';

export function getPhotos(howMany) {
    return (dispatch) => {
        dispatch({ type: LOAD_PHOTOS_START });

        axios({
            method: 'get',
            url: `https://api.vk.com/method/newsfeed.get?filters=wall_photo&count=${howMany}&end_time=1516838400&access_token=${access_token}&v=5.80`,
            dataType: 'JSONP'
        })
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: response.data.response });
                }

                else {
                    dispatch({ type: LOAD_PHOTOS_FAIL, payload: 'Не удалось загрузить фото' });
                }
            })
            .catch(function () {
                dispatch({ type: LOAD_PHOTOS_FAIL, payload: 'Сервер в данный момент недоступен' });
            })
    }
}

export function getNextPhotos(next_from) {
    return (dispatch) => {
        dispatch({ type: LOAD_NEXT_PHOTOS_START });

        axios({
            method: 'get',
            url: `https://api.vk.com/method/newsfeed.get?filters=wall_photo&count=1&end_time=1516838400&start_from=${next_from}&access_token=${access_token}&v=5.80`,
            dataType: 'JSONP'
        })
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({ type: LOAD_NEXT_PHOTOS_SUCCESS, payload: response.data.response });
                }

                else {
                    dispatch({ type: LOAD_NEXT_PHOTOS_FAIL, payload: 'Не удалось загрузить фото' });
                }
            })
            .catch(function () {
                dispatch({ type: LOAD_NEXT_PHOTOS_FAIL, payload: 'Сервер в данный момент недоступен' });
            })
    }
}
