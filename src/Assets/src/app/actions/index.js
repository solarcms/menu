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

export function addChild(menuIndex) {
    return {
        type: types.ADDCHILD,
        menuIndex
    }
}
export function deleteChild(menuIndex) {
    return {
        type: types.DELETECHILD,
        menuIndex
    }
}


export function addMenuItem() {
    return {
        type: types.ADDMENUITEM
    }
}




