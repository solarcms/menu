import { getMenus } from '../api/'
import * as types from '../constants/';




export function getSetupData() {
    const setup = window.menuSetup;

    return dispatch => {
        dispatch(receiveSetupData(setup))


        getMenus().then((data)=>{
            dispatch(receiveMenus(data))
            window.location.replace('#/');
        })
    }
}
export function receiveSetupData(setupData) {
    return {
        type: types.SETUP,
        setupData
    }
}
export function receiveMenus(menus) {
    return {
        type: types.SETMENUS,
        menus
    }
}
export function setMenu(menu, edit) {
    return {
        type: types.SETMENU,
        menu,
        edit
    }
}
export function changeTitle(menuIndex, localeindex, value) {
    return {
        type: types.CHANGETITLE,
        menuIndex: menuIndex,
        localeindex: localeindex,
        value:value
    }
}
export function changeLinkTo(menuIndex, value) {
    return {
        type: types.CHANGELINKTO,
        menuIndex: menuIndex,
        value:value
    }
}
export function changeUrl(menuIndex, value) {
    return {
        type: types.CHANGEURL,
        menuIndex: menuIndex,
        value:value
    }
}
export function changeSlug(value) {
    return {
        type: types.CHANGESLUG,
        value:value
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




