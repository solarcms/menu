import createReducer from '../lib/createReducer';

import Immutable from 'immutable';

import * as types from '../constants/';

let testMenu = Immutable.fromJS({
    menu_id: "navigation_menu1",
    title: "Main Menu",
    items: []
})



const initialState = Immutable.fromJS({
    setup: {
        default_locale:'EN',
        locales:[]
    },
    menu:testMenu
});

export default createReducer(initialState, {
    [types.SETUP](state, { setupData }) {

        const data = Immutable.fromJS(setupData);

        state = state.set('setup', data);

        return state;
    },
    [types.SETMENU](state, { menu }) {

        const data = Immutable.fromJS(menu);

        state = state.setIn(['menu', 'items'], data);

        return state;
    },
    [types.ADDCHILD](state, { menuIndex }) {

        let RealIndex = menuIndex;

        RealIndex.unshift('items')
        RealIndex.unshift('menu')

        RealIndex.push('children')

        ///child title
        let title = [];
        state.getIn(['setup', 'locales']).map(locale=>{
            title.push({
                locale: locale.get('code'),
                value:null
            })
        })
        const newChild = Immutable.fromJS({
            title: title,
            link_to: "1",
            url: "2",
            children: []

        });

        state = state.updateIn(RealIndex, (children)=>
            children.push(newChild)
        );

        return state;
    },
    [types.CHANGETITLE](state, { menuIndex, localeindex, value }) {

        let RealIndex = menuIndex;


        RealIndex.unshift('items')
        RealIndex.unshift('menu')

        RealIndex.push('title')
        RealIndex.push(localeindex)
        RealIndex.push('value')


        state = state.setIn(RealIndex, value);

        return state;
    },
    [types.ADDMENUITEM](state, { }) {


        ///child title
        let title = [];
        state.getIn(['setup', 'locales']).map(locale=>{

            title.push({
                locale: locale.get('code'),
                value:null
            })
        })
        const newChild = Immutable.fromJS({
            title: title,
            link_to: "3",
            url: "4",
            children: []

        });

        state = state.updateIn(['menu', 'items'], (items)=>
            items.push(newChild)
        );

        return state;
    },
    [types.DELETECHILD](state, { menuIndex }) {

        let RealIndex = menuIndex;

        RealIndex.unshift('items')
        RealIndex.unshift('menu')


        state = state.removeIn(RealIndex);

        return state;
    },




});

