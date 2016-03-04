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

        this.state = {
            destroy: false,
            default_locale: this.props.locales[0].code,
            key:0
        };
    }

    componentWillMount() {

    }
    componentDidMount() {

        var self = this;
        var optionsPlus = {
            ignoreClass: 'clickable',
            placeholderCss: {'background-color': '#ff8'},
            hintCss: {'background-color':'#bbf'},
            opener: {
                active: true,
                as: 'html',  // if as is not set plugin uses background image
                close: '<i class="material-icons icon-btn">&#xE15B;</i>',
                open: '<i class="material-icons icon-btn">&#xE145;</i>',
                openerCss: {
                    'display': 'inline-block',
                    'float': 'left',
                    'margin-left': '-35px',
                    'margin-right': '5px',
                    'font-size': '1.1em'
                }
            },
            onChange: function(cEl)
            {
                let pre_data = $('#sTree2').sortableListsToHierarchy();


                let newItems =[]

                pre_data.map(item=>{
                    newItems.push(self.getChildData(item))
                })

                //$('#sTree2,#sTree2 *').unbind().removeData();


                self.setState({ destroy: true });


                self.props.actions.setMenu(newItems)

                self.setState({ destroy: false });

                $('#sTree2').sortableLists( optionsPlus );

            },
        };


        $('#sTree2').sortableLists( optionsPlus );

    }
    getData(){
        let pre_data = $('#sTree2').sortableListsToHierarchy();


        let newItems =[]

        pre_data.map(item=>{
            newItems.push(this.getChildData(item))
        })
    }
    getChildData(child){




        let menuIndex = child.id.split(',');

        let realDataIndex = [];

        menuIndex.map((dIndex, index)=> {
            if (index == 0) {
                realDataIndex.push(dIndex);
            } else if (index >= 1) {
                realDataIndex.push('children')
                realDataIndex.push(dIndex)
            }
        })
        realDataIndex.unshift('items')




        let newChild = {};

        let newChilds = [];

        let realChild = this.props.menuImmutable.getIn(realDataIndex).toJS();




        if(child.children && child.children.length >= 1)
            child.children.map(child=>{
                newChilds.push(this.getChildData(child))
            })

        newChild = {
            title: realChild.title,
            link_to: realChild.link_to,
            url: realChild.url,
            children: newChilds
        }

        return newChild



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

    changeLocale(index){


        this.setState({ key: index });
        this.setState({ default_locale: this.props.locales[index].code });
    }

    changeMenuTitle(mindex, localeindex, value){

        let realDataIndex = [];

        mindex.map((dIndex, index)=> {
            if (index == 0) {
                realDataIndex.push(dIndex);
            } else if (index >= 1) {
                realDataIndex.push('children')
                realDataIndex.push(dIndex)
            }
        })

        this.props.actions.changeTitle(realDataIndex, localeindex, value)
    }

    render() {

        const {
            setup,
            locales,
            default_locale,
            menuTypes
            } = this.props;



        let this_default_locale = this.state.default_locale
        let locale_index = this.state.key

        const uiTree =   this.state.destroy === false ? <ul className="sTree2 listsClass" id="sTree2">


            {this.props.menu.items.map((menu_item, menuIndex) =>{
                let myIndex = [menuIndex];



                if (menu_item.children && menu_item.children.length >= 1) {
                    return <MenuDropdownItem key={menuIndex} data={menu_item} mindex={myIndex}
                                             addHandler={this.addChildHandler.bind(this)}
                                             changeMenuTitle={this.changeMenuTitle.bind(this)}
                                             default_locale={locale_index}
                                             menuTypes={menuTypes}
                                             deleteHandler={this.deleteHandler.bind(this)}
                    />;
                } else {
                    return <MenuItem key={menuIndex}
                                     data={menu_item}
                                     mindex={myIndex}
                                     default_locale={locale_index}
                                     menuTypes={menuTypes}
                                     addHandler={this.addChildHandler.bind(this)}
                                     changeMenuTitle={this.changeMenuTitle.bind(this)}
                                     deleteHandler={this.deleteHandler.bind(this)}
                    />;
                }
            })}


        </ul> : null

        return (
            <div className="">

                <div className="panel-body">
                    <Tabs defaultActiveKey={0} animation={false}  activeKey={this.state.key} onSelect={this.changeLocale.bind(this)}>
                        {locales.map((locale, locale_index)=>
                        <Tab eventKey={locale_index} title={locale.code} key={locale_index}    >

                        </Tab>
                        )}
                    </Tabs>
                    <div id="treeBox">
                        <div id="ui-tree">

                            <h4>{this.props.menu.title}</h4>

                            <button className="add-btn" onClick={this.addItemdHandler.bind(this)}>+</button>
                            <button className="-btn" onClick={this.getData.bind(this)}>test</button>

                            {uiTree}


                        </div>
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
        menuTypes: main.getIn(['setup', 'menuTypes']).toJS(),
        locales: main.getIn(['setup', 'locales']).toJS(),
        menu: main.get('menu').toJS(),
        menuImmutable: main.get('menu'),
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
