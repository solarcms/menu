import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as DataActions from '../actions/'
import Header from '../components/template/Header'
import { Button } from 'react-bootstrap';
import {deleteMenu} from '../api/'

class ListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    deleteHandler(id){


        if (!confirm('Delete this record?')) {
            return;
        }
        else{
            deleteMenu(id).then((data)=>{
                this.props.actions.getSetupData()
            })
        }
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
            menus
            } = this.props;




        return (
            <div className="">
                <Header />
                {menus.map(menu=>
                    <div key={menu.id} className="menu-box" >
                        {menu.slug}
                        <a className="btn btn-xs btn-info edit-menu" href={`#/edit/${menu.id}`} >
                            <i className="material-icons">&#xE254;</i>
                        </a>
                        <Button bsSize="xsmall" bsStyle="danger" className="delete-menu" onClick={this.deleteHandler.bind(this, menu.id)}>
                            <i className="material-icons">&#xE872;</i>
                        </Button>
                    </div>
                )}
            </div>

        )
    }
}

function mapStateToProps(state) {
    const main = state.main;

    return {
        setup: main.get('setup'),
        menus: main.get('menus').toJS(),
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
)(ListContainer)
