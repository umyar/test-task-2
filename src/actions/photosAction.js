import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL,
        LOAD_NEXT_PHOTOS_START, LOAD_NEXT_PHOTOS_SUCCESS, LOAD_NEXT_PHOTOS_FAIL} from "./constants"
import axios from 'axios'

const access_token = 'e8fabb62d571f9ff6c4ce1be8ee40b69e377c9472c0ddc8880232077e3fdf07656031560087d6caaab956';

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
