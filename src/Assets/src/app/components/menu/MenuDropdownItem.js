import React, { Component, PropTypes } from 'react'
import MenuItem from './MenuItem'


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
    render() {

        let title = this.props.data.title[this.props.default_locale].value;

        return (
            <li id={this.props.mindex} data-title={title} className="sortableListsOpen">

                <div className="clickable">

                    <input className="clickable" type="text" name=""
                           id={this.props.mindex}
                           onChange={this.changeTitle.bind(this)}
                           value={title}
                           placeholder="Нэр"
                    />

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
                                                     default_locale={this.props.default_locale}
                                                     deleteHandler={this.props.deleteHandler}
                            />;
                        } else {

                            return <MenuItem key={menuIndex} data={menu_item} mindex={myIndex}
                                             addHandler={this.props.addHandler}
                                             changeMenuTitle={this.props.changeMenuTitle}
                                             default_locale={this.props.default_locale}
                                             deleteHandler={this.props.deleteHandler}
                            />
                        }
                    })}
                </ul>
            </li>
        )
    }
}
