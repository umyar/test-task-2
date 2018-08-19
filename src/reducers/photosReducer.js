import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL} from '../actions/constants'

const initialState = {
    isLoading: false,
    photos: []
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    const takePhotosFromPayload = (payload) => {
        return payload
    };

    switch (type) {

        case LOAD_PHOTOS_START : return {
            ...state,
            isLoading: true
        };
        case LOAD_PHOTOS_SUCCESS : return {
            ...state,
            isLoading: false,
            photos: takePhotosFromPayload(payload)
        };
        case LOAD_PHOTOS_FAIL : return {
            ...state,
            isLoading: false,
            error: payload
        };
        default: break
    }

    return state
}