import {GET_TOKEN_START, GET_TOKEN_SUCCESS, GET_TOKEN_FAIL} from "./constants"
import axios from 'axios'

export function getToken() {
    return (dispatch) => {
        dispatch({ type: GET_TOKEN_START });
        //https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V
        axios({
            method: 'get',
            url: `https://oauth.vk.com/authorize?client_id=6665721&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=wall_photos&response_type=token&v=5.80`,
            dataType: 'JSONP'
        })
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    dispatch({ type: GET_TOKEN_SUCCESS, payload: response.data.response.items });
                }

                else if (response.data.status === 'err') {
                    dispatch({ type: GET_TOKEN_FAIL, payload: 'Не удалось загрузить фото' });
                }
            })
            .catch(function () {
                dispatch({ type: GET_TOKEN_FAIL, payload: 'Сервер в данный момент недоступен' });
            })
    }
}