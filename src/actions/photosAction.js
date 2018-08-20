import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL} from "./constants"
import axios from 'axios'

export function getPhotos(howMany) {
    return (dispatch) => {
        dispatch({ type: LOAD_PHOTOS_START });
        //конфигурация запроса
        //https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V
        axios({
            method: 'get',
            url: `https://api.vk.com/method/newsfeed.get?filters=wall_photo&count=${howMany}&end_time=1516838400&access_token=c3951e080b7959f017b3c2dde3452b8db017004da52222479d7113acf92956d0ed48d142b1bf61b0f4ca4&v=5.80`,
            dataType: 'JSONP'
        })
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: response.data.response.items });
                }

                else if (response.data.status === 'err') {
                    dispatch({ type: LOAD_PHOTOS_FAIL, payload: 'Не удалось загрузить фото' });
                }
            })
            .catch(function () {
                dispatch({ type: LOAD_PHOTOS_FAIL, payload: 'Сервер в данный момент недоступен' });
            })
    }
}
