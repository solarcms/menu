import React, { Component, PropTypes } from 'react'
import MenuItem from './MenuItem'
import {translate} from '../../utils/Translator'
import Combobox from './ComboBox'

export default class MenuDropdownItem extends Component {
    changeTitle(e){
        this.props.changeMenuTitle(this.props.mindex, this.props.default_locale,  e.target.value)
    }
    addChild(){
        this.props.addHandler(this.props.mindex)
    }
    deleteChild(){
        this.props.deleteHandler(this.props.mindex)
    }
    menuTypeChangeHandler(value){
        this.props.changeMenuLinkto(this.props.mindex, value)
    }
    menuUrlHandler(e){
        if(this.props.data.link_to == 'link')
            this.props.changeUrl(this.props.mindex, e.target.value)
        else
            this.props.changeUrl(this.props.mindex, e.value)
    }

    render() {

        let title = this.props.data.title[this.props.default_locale].value;


        let typeOptios = [{
            value:'link',
            label:'Холбоос'
        }];
        let dataOptions = [];

        this.props.menuTypes.map(menuType =>{
            typeOptios.push({
                value: menuType.slug,
                label: menuType.slug
            })

            if(this.props.data.link_to == menuType.slug){
                menuType.data.map(data=>{
                    dataOptions.push({
                        value: data[menuType.id_field],
                        label: menuType.translated == 1 ? translate(data[menuType.text_field], this.props.default_locale) : data[menuType.text_field]
                    })
                })
            }
        })
        let urlValue = this.props.data.url*1;
        return (
            <li id={this.props.mindex} data-title={title} className="sortableListsOpen">

                <div className="clickable sortDiv">


                    <Combobox
                        placeholder="Цэсний төрөл"
                        options={typeOptios}
                        value={this.props.data.link_to}
                        changeHandler={this.menuTypeChangeHandler.bind(this)} />
                    {this.props.data.link_to != 'link' ?<Combobox
                        placeholder="Холбох зам"
                        options={dataOptions}
                        value={`${urlValue}`}
                        changeHandler={this.menuUrlHandler.bind(this)} />

                        :
                        <div className="menu-title">
                            <input
                                type="text"
                                placeholder="Холбох зам"
                                value={this.props.data.url}
                                onChange={this.menuUrlHandler.bind(this)} />
                        </div>}

                    <div className="menu-title">
                        <input className="clickable" type="text" name=""
                               id={this.props.mindex}
                               onChange={this.changeTitle.bind(this)}
                               value={title}
                               placeholder="Нэр"

                        />
                    </div>

                    <button onClick={this.addChild.bind(this)} className="add-btn clickable">
                        +
                    </button>
                    <button onClick={this.deleteChild.bind(this)} className="del-btn clickable">
                        -
                    </button>
                </div>
                <ul className="dd-list">
                    {this.props.data.children.map((menu_item, menuIndex)=>{
                        let myIndex = [menuIndex];

                        let childIndex = this.props.mindex;

                        myIndex = childIndex.concat(myIndex)


                        if (menu_item.children && menu_item.children.length >= 1) {



                            return <MenuDropdownItem key={menuIndex} data={menu_item} mindex={myIndex}
                                                     addHandler={this.props.addHandler}
                                                     changeMenuTitle={this.props.changeMenuTitle}
                                                     changeMenuClass={this.props.changeMenuClass}
                                                     changeMenuLinkto={this.props.changeMenuLinkto}
                                                     changeUrl={this.props.changeUrl}
                                                     default_locale={this.props.default_locale}
                                                     deleteHandler={this.props.deleteHandler}
                                                     menuTypes={this.props.menuTypes}
                            />;
                        } else {

                            return <MenuItem key={menuIndex} data={menu_item} mindex={myIndex}
                                             addHandler={this.props.addHandler}
                                             changeMenuTitle={this.props.changeMenuTitle}
                                             changeMenuClass={this.props.changeMenuClass}
                                             changeMenuLinkto={this.props.changeMenuLinkto}
                                             changeUrl={this.props.changeUrl}
                                             default_locale={this.props.default_locale}
                                             deleteHandler={this.props.deleteHandler}
                                             menuTypes={this.props.menuTypes}
                            />
                        }
                    })}
                </ul>
            </li>
        )
    }
}
