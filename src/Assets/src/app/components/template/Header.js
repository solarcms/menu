import React, { Component, PropTypes }  from 'react';

export default class Header extends Component {



    render() {
        let addButton = <a href='#/add' className="nav-link"><i className="material-icons">&#xE145;</i> Нэмэх</a>


        return (
            <div className="tp_header">

                    <div className="navbar">
                  
                        <div className="navbar-item pull-left h6 p-l hidden-xs" id="pageTitle" style={{'margin':0}}>Цэсний удирдлага</div>

                        <div>
                            {this.props.addEdit == true ? null : <ul className="nav navbar-nav">
                                <li className="nav-item dropdown">
                                    {addButton}
                                </li>
                            </ul>}
                        </div>


                    </div>

            </div>

        )
    }
}
