import actionTypes from './actionTypes';

/**set up user actions */
export const fetchGenderStart = () => ({
    type: actionTypes.FETCH_GENDER_START
})

export const fetchGenderSuccess = () => ({
    type: actionTypes.FETCH_GENDER_SUCCESS
})

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

