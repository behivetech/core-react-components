// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import {FormContext} from './Form';
import TextField from './TextField';

export default class FormTextField extends Component {
    
    componentWillUnmount() {
        this.setFieldValueDebounced.cancel()
    }
    
    handleChange = (event) => {
        const {name, onClick} = this.props;

        this.value = event.target.value;
        this.setFieldValueDebounced(name, event.target.value);
        
        if (onClick) {
            onClick(event);
        }
    }

    renderChild = (formState) => {
        const {className, name} = this.props;
        let props = {
            className: classnames('form-text-field', className),
            onChange: this.handleChange,
        }

        this.value = formState.fieldValues[name] || '';

        if (!this.setFieldValueDebounced) {
            this.setFieldValueDebounced = formState.setFieldValueDebounced;
        } 

        return <TextField {...this.props} {...props} value={this.value} />;
    }

    render() {
        return (
            <FormContext.Consumer>
                {this.renderChild}
            </FormContext.Consumer>
        );
    }
}

FormTextField.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    name: PropTypes.string.isRequired,
};