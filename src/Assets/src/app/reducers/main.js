import createReducer from '../lib/createReducer';

import Immutable from 'immutable';

import * as types from '../constants/';

let testMenu = Immutable.fromJS({
    slug: "",
    items: []
})



const initialState = Immutable.fromJS({
    setup: {
        default_locale:'EN',
        locales:[]
    },
    menu:testMenu,
    menus:[]
});

export default createReducer(initialState, {
    [types.SETUP](state, { setupData }) {

        const data = Immutable.fromJS(setupData);

        state = state.set('setup', data);
        state = state.set('menu', testMenu);

        return state;
    },
    [types.SETMENU](state, { menu, edit }) {



        if(edit){
            const data = Immutable.fromJS(JSON.parse(menu.items));
            const slug = menu.slug;
            state = state.setIn(['menu', 'items'], data);
            state = state.setIn(['menu', 'slug'], slug);
            return state;
        } else {
            const data = Immutable.fromJS(menu);
            state = state.setIn(['menu', 'items'], data);
            return state;
        }

    },
    [types.SETMENUS](state, { menus }) {

        const data = Immutable.fromJS(menus);

        state = state.set('menus', data);

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
            link_to: null,
            url: null,
            children: []

        });
        if(state.getIn(RealIndex))
            state = state.updateIn(RealIndex, (children)=>
                children.push(newChild)
            );
        else{

            state = state.setIn(RealIndex, Immutable.fromJS([]))

            state = state.updateIn(RealIndex, (children)=>
                children.push(newChild)
            );
        }

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
    [types.CHANGELINKTO](state, { menuIndex, value }) {

        let RealIndex = menuIndex;


        RealIndex.unshift('items')
        RealIndex.unshift('menu')

        RealIndex.push('link_to')

        state = state.setIn(RealIndex, value);

        RealIndex.pop()
        RealIndex.push('url')
        state = state.setIn(RealIndex, null);

        return state;
    },
    [types.CHANGEURL](state, { menuIndex, value }) {

        let RealIndex = menuIndex;

        RealIndex.unshift('items')
        RealIndex.unshift('menu')

        RealIndex.push('url')


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
            link_to: null,
            url: null,
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
    [types.CHANGESLUG](state, { value }) {




        state = state.setIn(['menu', 'slug'], value);

        return state;
    },




});

