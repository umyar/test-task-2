import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL} from "./constants"
import axios from 'axios'

export function getPhotos(howMany) {
    return (dispatch) => {
        dispatch({ type: LOAD_PHOTOS_START });
        //конфигурация запроса
        //https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V
        axios({
            method: 'get',
            url: `https://api.vk.com/method/newsfeed.get?filters=wall_photo&count=${howMany}&end_time=1516838400&access_token=ed141a37b1bdc5ea9e77a8a88e64bb34a71fa8137fae5e96f7d5765d8f231e9d728212a4a2042c0e817ae&v=5.80`,
            dataType: 'JSONP'
        })
            .then(function (response) {
                if (response.status === 200) {
                    dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: response.data.response.items });
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
