import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL,
        LOAD_NEXT_PHOTOS_START, LOAD_NEXT_PHOTOS_SUCCESS, LOAD_NEXT_PHOTOS_FAIL} from '../actions/constants'

const initialState = {
    isLoading: false,
    photos: [],
    next_from: null,
    error: null
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    const takePhotosFromPayload = (payload) => {
        const urlArray = (payload.map(i => i.photos.items)).map(i => i.map(i => i.sizes.pop()));
        return (urlArray.map(i => i.shift())).map(i => i.url);
    };

    switch (type) {

        case LOAD_PHOTOS_START : return {
            ...state,
            isLoading: true
        };
        case LOAD_PHOTOS_SUCCESS : return {
            ...state,
            isLoading: false,
            photos: takePhotosFromPayload(payload.items),
            next_from: payload.next_from
        };
        case LOAD_PHOTOS_FAIL : return {
            ...state,
            isLoading: false,
            error: payload
        };
        //NEXT PHOTOS **********************************
        case LOAD_NEXT_PHOTOS_START : return {
            ...state,
            /*isLoading: true*/
            //все-таки решил не выводить Loading, чтобы не прерывать просмотр фото в <MainPhoto/>
        };
        case LOAD_NEXT_PHOTOS_SUCCESS : return {
            ...state,
            /*isLoading: false,*/
            photos: [...state.photos, takePhotosFromPayload(payload.items)],
            next_from: payload.next_from
        };
        case LOAD_NEXT_PHOTOS_FAIL : return {
            ...state,
            /*isLoading: false,*/
            error: payload
        };

        default: break
    }

    return state
}