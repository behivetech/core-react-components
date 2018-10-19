// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import {FormContext} from './Form';
import TextField from './TextField';

export default class FormField extends Component {
    
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
        const {className, component, name} = this.props;
        let props = {
            className: classnames('form-text-field', className),
            onChange: this.handleChange,
        }
        let content = null;

        this.value = formState.fieldValues[name] || '';

        if (!this.setFieldValueDebounced) {
            this.setFieldValueDebounced = formState.setFieldValueDebounced;
        } 

        import(`./${component}`).then((Component) => {
            console.log(Component)
            content = <Component {...this.props} {...props} value={this.value} />;
        });

        return content;
    }

    render() {
        return (
            <FormContext.Consumer>
                {this.renderChild}
            </FormContext.Consumer>
        );
    }
}

FormField.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.oneOf(['TextField']).isRequired,
    name: PropTypes.string.isRequired,
};