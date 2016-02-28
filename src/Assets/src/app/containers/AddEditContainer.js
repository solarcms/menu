import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as DataActions from '../actions/'


class AddEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }



    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount(){

    }

    render() {

        const {
            setup,

            } = this.props;




        return (
            <div className="">
                test menu add & edit
            </div>

        )
    }
}

function mapStateToProps(state) {
    const main = state.main;

    return {
        setup: main.get('setup'),
    }
}
// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(DataActions, dispatch)
    };
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddEditContainer)
