// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    debounce,
    isFunction,
    transform,
} from 'lodash';

// Core Libs
import * as validators from './lib-core/validators';

export default function (WrappedComponent) {
    class FormFieldValidation extends Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.validateFieldDebounced = debounce(this.validateField, 200, {trailing: true});
            this.state = {fieldError: null};
        }

        componentDidMount() {
            this.validateField(this.props.value);    
        }

        validateField(value) {
            const {formState, name} = this.props;
            let fieldError = null;

            // Using transform to iterate through the validators until an error is found.
            // Only sending one error at a time to the form field to prevent a mass
            // amount of errors showing up. This is also a much more efficient approach
            // so all validators aren't iterated through every time the field needs to
            // be validated.
            transform(this.props.validate, (errors, validator) => {
                if (isFunction(validator)) {
                    fieldError = validator(value, formState.getFieldValues());
                } else {
                    const importedValidator = validators[validator]; // eslint-disable-line

                    if (importedValidator && isFunction(importedValidator)) {
                        fieldError = importedValidator(value);
                    } else {
                        fieldError = `${validator} is not a valid validator.`;
                    }
                }

                return !fieldError;
            });

            (fieldError) ? formState.setFieldError(name) : formState.unsetFieldError(name);
            this.setState({fieldError});
        }

        handleChange(event) {
            this.validateFieldDebounced(event.target.value);
            this.props.onChange(event);
        }

        getError() {
            return (this.props.formState.getInitialSubmit()) ? this.state.fieldError : null;
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    error={this.getError()}
                    onChange={this.handleChange}
                />
            );
        }
    }

    FormFieldValidation.propTypes = {
        validate: PropTypes.arrayOf(PropTypes.oneOfType(
            [PropTypes.string, PropTypes.func]
        )).isRequired,
    };

    return FormFieldValidation;
}

