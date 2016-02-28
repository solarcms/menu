import React, { Component, PropTypes } from 'react'
import MenuItem from './MenuItem'


export default class MenuDropdownItem extends Component {
    changeTitle(){

    }
    render() {


        return (
            <li className="dd-item dd3-item" data-title={this.props.data.title} data-id={this.props.data.id}>
                <div className="dd-handle dd3-handle">Drag</div>
                <div className="dd3-content">

                    {this.props.data.title}
                </div>
                <ol className="dd-list">
                    {this.props.data.children.map(function (menu_item) {
                        if (menu_item.children) {
                            return <MenuDropdownItem key={menu_item.id} data={menu_item}/>;
                        } else {
                            return <MenuItem key={menu_item.id} data={menu_item}/>
                        }
                    })}
                </ol>
            </li>
        )
    }
}
