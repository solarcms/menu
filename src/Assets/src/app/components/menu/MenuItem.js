import React, { Component, PropTypes } from 'react'

export default class MenuItem extends Component {
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
            <li className="dd-item dd3-item" data-title={this.props.data.title} data-link_to={this.props.data.link_to}
                data-url={this.props.data.url} data-id={this.props.data.id}>
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
            </li>
        )
    }
}
