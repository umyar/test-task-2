import {LOAD_PHOTOS_START, LOAD_PHOTOS_SUCCESS, LOAD_PHOTOS_FAIL} from '../actions/constants'

const initialState = {
    isLoading: false,
    photos: [],
    currentImg: null
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    const takePhotosFromPayload = (payload) => {
        const firstStep = (payload.map(i => i.photos.items)).map(i => i.map(i => i.sizes.pop()));
        const secondStep = (firstStep.map(i => i.shift())).map(i => i.url);
       /* console.log('firstStep', firstStep);
        console.log('secondStep', secondStep);*/
        return secondStep
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