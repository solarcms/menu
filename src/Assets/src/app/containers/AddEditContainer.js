import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as DataActions from '../actions/'
import MenuItem from '../components/menu/MenuItem'
import MenuDropdownItem from '../components/menu/MenuDropdownItem'
import { Tabs, Tab } from 'react-bootstrap';

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
    getData(){
        let menusJSON = [];

        $('.dd').each(function(menu){
            var menu_list = $(this).nestable('serialize');
            var menu_title = $(this).parent().siblings('.panel-heading').children('h3').html();
            var menu_id = this.id;

            menusJSON.push({title: menu_title, items: menu_list});
        })

        console.log(menusJSON)
    }
    updateJSON() {


        $('.dd').each(function (menu) {
            var menu_list = $(this).nestable('serialize');
            var menu_title = $(this).parent().siblings('.panel-heading').children('h3').html();



        })




    }
    addChildHandler(mindex){
        let realDataIndex = [];

        mindex.map((dIndex, index)=> {
            if (index == 0) {
                realDataIndex.push(dIndex);
            } else if (index >= 1) {
                realDataIndex.push('children')
                realDataIndex.push(dIndex)
            }
        })
        this.props.actions.addChild(realDataIndex)
    }
    addItemdHandler(){

        this.props.actions.addMenuItem()
    }
    deleteHandler(mindex){

        if (!confirm('Delete this record?')) {
            return;
        }
        else{
            let realDataIndex = [];

            mindex.map((dIndex, index)=> {
                if (index == 0) {
                    realDataIndex.push(dIndex);
                } else if (index >= 1 && index < mindex.length) {
                    realDataIndex.push('children')
                    realDataIndex.push(dIndex)
                }
            })

            this.props.actions.deleteChild(realDataIndex)
        }
    }

    render() {

        const {
            setup,
            locales,
            default_locale
            } = this.props;



        return (
            <div className="">

                <div className="panel-body">
                    <Tabs defaultActiveKey={0} animation={false}>
                        {locales.map((locale, locale_index)=>
                        <Tab eventKey={locale_index} title={locale.code} key={locale_index}>

                        </Tab>
                        )}
                    </Tabs>
                    <div className="dd" id={this.props.menu.menu_id}>
                        <h4>{this.props.menu.title}</h4>
                        <button className="add-btn" onClick={this.addItemdHandler.bind(this)}>+</button>
                        <button className="-btn" onClick={this.getData.bind(this)}>test</button>
                        <ol className="dd-list">
                            {this.props.menu.items.map((menu_item, menuIndex) =>{
                                let myIndex = [menuIndex];
                                if (menu_item.children && menu_item.children.length >= 1) {
                                    return <MenuDropdownItem key={menuIndex} data={menu_item} mindex={myIndex}
                                                             addHandler={this.addChildHandler.bind(this)}
                                                             default_locale={default_locale}
                                                             deleteHandler={this.deleteHandler.bind(this)}
                                    />;
                                } else {
                                    return <MenuItem key={menuIndex}
                                                     data={menu_item}
                                                     mindex={myIndex}
                                                     default_locale={default_locale}
                                                    addHandler={this.addChildHandler.bind(this)}
                                                     deleteHandler={this.deleteHandler.bind(this)}
                                    />;
                                }
                            })}
                        </ol>
                    </div>
                </div>


            </div>

        )
    }
}

function mapStateToProps(state) {
    const main = state.main;

    return {
        setup: main.get('setup'),
        default_locale: main.getIn(['setup', 'default_locale']),
        locales: main.getIn(['setup', 'locales']).toJS(),
        menu: main.get('menu').toJS(),
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
