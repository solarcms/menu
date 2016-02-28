import createReducer from '../lib/createReducer';

import Immutable from 'immutable';

import * as types from '../constants/';

const initialState = {
    setup: {},
};

export default createReducer(initialState, {
    [types.SETUP](state, { setupData }) {

        const data = Immutable.fromJS(setupData);

        state = state.set('setup', data);

        return state;
    },





});
