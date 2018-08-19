import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL} from "./constants"
import axios from 'axios'

export function getPhotos(howMany) {
    return (dispatch) => {
        dispatch({ type: LOAD_PHOTOS_START });

        axios({
            method: 'get',
            url: `https://api.vk.com/method/newsfeed.get?filters=photo&count=${howMany}&access_token=da37b20af618f805635a8421c10dd662d94742d2443f4eb33e3bcaa0197ac3588e0dadc9fb333df3f3b5a&v=5.80`,
            data: {
                howMany
            }
        })
            .then(function (response) {
                console.log('ОТВЕТ ',response);
                if (response.data.status === 'ok') {
                    dispatch({ type: LOAD_PHOTOS_SUCCESS, payload: response.data });
                }

                else if (response.data.status === 'err') {
                    dispatch({ type: LOAD_PHOTOS_FAIL, payload: 'Имя пользователя или пароль введены неверно' });
                }
            })
            .catch(function () {
                dispatch({ type: LOAD_PHOTOS_FAIL, payload: 'Сервер в данный момент недоступен' });
            })
    }
}
