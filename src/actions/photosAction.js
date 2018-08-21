import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL,
        LOAD_NEXT_PHOTOS_START, LOAD_NEXT_PHOTOS_SUCCESS, LOAD_NEXT_PHOTOS_FAIL} from "./constants"
import axios from 'axios'

const access_token = '05128f130cd9214117bdfbdf2bb582c2464a463d5345c19fed3b60e72be5c7f607560eff03b5c266bee1f';

export function getPhotos(howMany) {
    return (dispatch) => {
        dispatch({ type: LOAD_PHOTOS_START });

        axios({
            method: 'get',
            url: `https://api.vk.com/method/newsfeed.get?filters=wall_photo&count=${howMany}&end_time=1516838400&access_token=${access_token}&v=5.80`,
            dataType: 'JSONP'
        })
            .then(function (response) {
                if (response.data.response) {
                    console.log(response.data.response);
                    dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: response.data.response });
                }

                else if (response.data.error.error_code) {
                    console.log(response.data.error.error_code);
                    dispatch({ type: LOAD_PHOTOS_FAIL, payload: response.data.error.error_msg });
                }
            })
            .catch(function () {
                dispatch({ type: LOAD_PHOTOS_FAIL, payload: 'Сервер в данный момент не отвечает' });
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
