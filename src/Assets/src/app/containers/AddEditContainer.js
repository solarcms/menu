import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as DataActions from '../actions/'
import MenuItem from '../components/menu/MenuItem'
import MenuDropdownItem from '../components/menu/MenuDropdownItem'
var menus = [
    {
        menu_id: "navigation_menu1",
        title: "Main Menu",
        items: [{id: 1, title: "Item1", link_to: "Products", url: "/product1"}, {
            id: 2,
            title: "Item2",
            link_to: "",
            url: "",
            children: [{
                id: 3,
                title: "Item3",
                link_to: "Products",
                url: "/product2",
                children: [{id: 4, title: "Item4", link_to: "Products", url: "/product3"}]
            }]
        }, {
            id: 5,
            title: "Item5",
            link_to: "",
            url: "",
            children: [{id: 6, title: "Item6", link_to: "Products", url: "/product4"}]
        }]
    },
];

class AddEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {
        $('.dd').nestable(/* config options */).on('change', this.updateJSON.bind(this));

        this.updateJSON();

    }

    updateJSON(){
        let menusJSON = [];

        $('.dd').each(function(menu){
            var menu_list = $(this).nestable('serialize');
            var menu_title = $(this).parent().siblings('.panel-heading').children('h3').html();
            var menu_id = this.id;

            menusJSON.push({menu_id: menu_id, title: menu_title, items: menu_list});
        })

        console.log(menusJSON)

        $('#nestable-output').val(JSON.stringify(menusJSON));
    }

    render() {

        const {
            setup,

            } = this.props;


        return (
            <div className="">
                <div className="panel-body">
                    <div className="dd" id={menus[0].menu_id}>
                        <ol className="dd-list">
                            {menus[0].items.map(function(menu_item){
                                if (menu_item.children) {
                                    return <MenuDropdownItem key={menu_item.id} data={menu_item} />;
                                } else {
                                    return <MenuItem key={menu_item.id} data={menu_item} />;
                                }
                            })}
                        </ol>
                    </div>
                </div>

                <textarea id="nestable-output" readOnly></textarea>
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
