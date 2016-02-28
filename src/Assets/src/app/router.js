import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
import Main from './components/template/Main';
import ListContainer from './containers/ListContainer';
import AddEditContainer from './containers/AddEditContainer';

export default () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={ Main }>
                <IndexRoute component={ ListContainer } />
                <Route path="add" component={ AddEditContainer }  />
                <Route path="edit/:id" component={ AddEditContainer }  />
            </Route>
        </Router>
    );
}
