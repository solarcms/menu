import React, { Component, PropTypes } from 'react'
import MenuItem from './MenuItem'


export default class MenuDropdownItem extends Component {
    changeTitle(){

    }
    addChild(){
        this.props.addHandler(this.props.mindex)
    }
    deleteChild(){
        this.props.deleteHandler(this.props.mindex)
    }
    render() {


        return (
            <li className="dd-item dd3-item" data-title={this.props.data.title} data-id={this.props.data.id}>
                <div className="dd-handle dd3-handle">Drag</div>
                <div className="dd3-content">

                    {this.props.data.title.map(title=>
                    {title.locale == this.props.default_locale ? title.value : null}
                    )}
                    <button onClick={this.addChild.bind(this)} className="add-btn">
                        +
                    </button>
                    <button onClick={this.deleteChild.bind(this)} className="del-btn">
                        -
                    </button>
                </div>
                <ol className="dd-list">
                    {this.props.data.children.map((menu_item, menuIndex)=>{
                        let myIndex = [menuIndex];
                        if (menu_item.children) {

                            let childIndex = this.props.mindex;

                            myIndex = childIndex.concat(myIndex)

                            return <MenuDropdownItem key={menuIndex} data={menu_item} mindex={myIndex}
                                                     addHandler={this.props.addHandler}
                                                     default_locale={this.props.default_locale}
                                                     deleteHandler={this.props.deleteHandler}
                            />;
                        } else {

                            return <MenuItem key={menuIndex} data={menu_item} mindex={myIndex}
                                             addHandler={this.props.addHandler}
                                             default_locale={this.props.default_locale}
                                             deleteHandler={this.props.deleteHandler}
                            />
                        }
                    })}
                </ol>
            </li>
        )
    }
}
