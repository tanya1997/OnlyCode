import { ActionTypes } from "../actions";
import {clusters, genders, ages, bannerFormats, bannerTypes, products} from "../../constants";

const initialState = {
    userInfo: {
        gender: genders[0],
        age: ages[0],
        wage: 40000*12,
        cluster: clusters[2],
    },
    banner: {
        format: bannerFormats[0],
        type: bannerTypes[0],
        width: 512,
        height: 512,
    },
    prompt: '',
    product: products[2],
}

export const prompt = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_PROMPT: {
            return {
                ...state,
                prompt: action.payload.prompt
            }
        }
        case ActionTypes.UPDATE_PRODUCT: {
            return {
                ...state,
                product: action.payload.product
            }
        }
        case ActionTypes.UPDATE_BANNER_FORMAT: {
            return {
                ...state,
                banner: {
                    ...state.banner,
                    format: action.payload.format
                }
            }
        }
        case ActionTypes.UPDATE_BANNER_TYPE: {
            return {
                ...state,
                banner: {
                    ...state.banner,
                    type: action.payload.type
                }
            }
        }
        case ActionTypes.UPDATE_BANNER_WIDTH: {
            return {
                ...state,
                banner: {
                    ...state.banner,
                    width: action.payload.width
                }
            }
        }
        case ActionTypes.UPDATE_BANNER_HEIGHT: {
            return {
                ...state,
                banner: {
                    ...state.banner,
                    height: action.payload.height
                }
            }
        }
        case ActionTypes.UPDATE_GENDER: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    gender: action.payload.gender
                }
            }
        }
        case ActionTypes.UPDATE_AGE: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    age: action.payload.age
                }
            }
        }
        case ActionTypes.UPDATE_WAGE: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    wage: action.payload.wage
                }
            }
        }
        case ActionTypes.UPDATE_CLUSTER: {
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cluster: action.payload.cluster
                }
            }
        }
        default: {
            return state
        }
    }
}