import React, { Component, PropTypes }  from 'react';
import Select from 'react-select';

export default class ComboBox extends Component {


    render() {
        const { value, options, changeHandler, placeholder } = this.props;

        return (
                    <Select
                        className={`clickable-combo`}
                        value={value}
                        options={options}
                        clearable={false}
                        onChange={changeHandler}
                        placeholder={placeholder}
                    />


        )
    }
}
