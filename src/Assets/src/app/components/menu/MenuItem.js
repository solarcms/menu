import React, { Component, PropTypes } from 'react'

export default class MenuItem extends Component {
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
            <li id={this.props.mindex} data-title={title} data-link_to={this.props.data.link_to}
                data-url={this.props.data.url} data-id={this.props.data.id}>

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
            </li>
        )
    }
}
