import { setupPage, getFormData } from '../api/'
import * as types from '../constants/';




export function getSetupData() {
    const setup = window.menuSetup;

    return dispatch => {
        dispatch(receiveSetupData(setup))
    }
}
export function receiveSetupData(setupData) {
    return {
        type: types.SETUP,
        setupData
    }
}




