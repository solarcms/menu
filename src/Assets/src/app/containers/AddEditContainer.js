import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import * as DataActions from '../actions/'
import MenuItem from '../components/menu/MenuItem'
import MenuDropdownItem from '../components/menu/MenuDropdownItem'
import { Tabs, Tab } from 'react-bootstrap';
import Header from '../components/template/Header'
import {saveNew, udateMenu} from '../api/index'
// import sortableListsToHierarchy from '../../change/jquery-sortable-lists.min';

class AddEditContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            destroy: false,
            default_locale: this.props.locales[0].code,
            key:0,
            sending: false
        };
    }

    componentWillMount() {
        if(this.props.params.id){
            let editMenu = {};

            this.props.menus.map(menu=>{
                    if(menu.id == this.props.params.id)
                        editMenu = menu
            })

            if(Object.keys(editMenu).length >= 1)
                this.props.actions.setMenu(editMenu, true)
            else
                window.location.replace('#/');
        }
    }

    componentWillUnmount() {

        this.props.actions.getSetupData()
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
                close: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
                open: '<i class="fa fa-chevron-down" aria-hidden="true"></i>',
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
    saveMenu(){

        if(this.props.menu.slug != ''){
            if(this.props.params.id)
            udateMenu(this.props.menu, this.props.params.id).then((data)=>{

                window.location.replace('#/');
            })
            else
            saveNew(this.props.menu).then((data)=>{
                window.location.replace('#/');
            })
        }

        else
            alert('Цэсэнд зориулсан өгөгдлийг бүрэн оруулана уу')
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
    changeSlugHandler(e){
        this.props.actions.changeSlug(e.target.value)
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
    changeMenuClass(mindex, value){

        let realDataIndex = [];

        mindex.map((dIndex, index)=> {
            if (index == 0) {
                realDataIndex.push(dIndex);
            } else if (index >= 1) {
                realDataIndex.push('children')
                realDataIndex.push(dIndex)
            }
        })

        this.props.actions.changeClass(realDataIndex, value)
    }

    changeMenuLinkto(mindex, value){

        let realDataIndex = [];

        mindex.map((dIndex, index)=> {
            if (index == 0) {
                realDataIndex.push(dIndex);
            } else if (index >= 1) {
                realDataIndex.push('children')
                realDataIndex.push(dIndex)
            }
        })

        this.props.actions.changeLinkTo(realDataIndex, value)
    }

    changeUrl(mindex, value){



        let realDataIndex = [];

        mindex.map((dIndex, index)=> {
            if (index == 0) {
                realDataIndex.push(dIndex);
            } else if (index >= 1) {
                realDataIndex.push('children')
                realDataIndex.push(dIndex)
            }
        })

        this.props.actions.changeUrl(realDataIndex, value)
    }

    render() {

        const {
            setup,
            locales,
            default_locale,
            menuTypes
            } = this.props;

        const sending = this.state.sending;
        let this_default_locale = this.state.default_locale
        let locale_index = this.state.key

        const uiTree =   this.state.destroy === false ? <ul className="sTree2 listsClass" id="sTree2">


            {this.props.menu.items.map((menu_item, menuIndex) =>{
                let myIndex = [menuIndex];



                if (menu_item.children && menu_item.children.length >= 1) {
                    return <MenuDropdownItem key={menuIndex} data={menu_item} mindex={myIndex}
                                             addHandler={this.addChildHandler.bind(this)}
                                             changeMenuTitle={this.changeMenuTitle.bind(this)}
                                             changeMenuClass={this.changeMenuClass.bind(this)}
                                             default_locale={locale_index}
                                             menuTypes={menuTypes}
                                             deleteHandler={this.deleteHandler.bind(this)}
                                             changeMenuLinkto={this.changeMenuLinkto.bind(this)}
                                             changeUrl={this.changeUrl.bind(this)}
                    />;
                } else {
                    return <MenuItem key={menuIndex}
                                     data={menu_item}
                                     mindex={myIndex}
                                     default_locale={locale_index}
                                     menuTypes={menuTypes}
                                     addHandler={this.addChildHandler.bind(this)}
                                     changeMenuTitle={this.changeMenuTitle.bind(this)}
                                     changeMenuClass={this.changeMenuClass.bind(this)}
                                     deleteHandler={this.deleteHandler.bind(this)}
                                     changeMenuLinkto={this.changeMenuLinkto.bind(this)}
                                     changeUrl={this.changeUrl.bind(this)}
                    />;
                }
            })}


        </ul> : null

        return (
            <div className="">
                <Header addEdit={true}/>
                <div className="panel-body">
                    <Tabs defaultActiveKey={0} animation={false}  activeKey={this.state.key} onSelect={this.changeLocale.bind(this)}>
                        {locales.map((locale, locale_index)=>
                        <Tab eventKey={locale_index} title={locale.code} key={locale_index}    >

                        </Tab>
                        )}
                    </Tabs>
                    <div id="treeBox">
                        <div id="ui-tree">

                            <h4><input type="text" value={this.props.menu.slug} onChange={this.changeSlugHandler.bind(this)}/></h4>

                            <button className="add-btn" onClick={this.addItemdHandler.bind(this)}>+</button>

                            {uiTree}


                        </div>
                    </div>
                    <div className="menu-bottom">
                        {sending === true
                            ?<div className="sending spinner">
                            <div className="bounce1"></div>
                            <div className="bounce2"></div>
                            <div className="bounce3"></div>
                        </div>

                            : <div>

                            <button type="button" className="btn btn-fw btn-success p-h-lg"
                                    onClick={this.saveMenu.bind(this)}>
                                <i className="material-icons">&#xE2C3;</i> Хадгалах

                            </button>

                            &nbsp;
                            <a href="#/" className="btn btn-fw danger p-h-lg">
                                <i className="material-icons">&#xE5CD;</i> Болих
                            </a>
                        </div>
                        }
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
        menus: main.get('menus').toJS(),
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
