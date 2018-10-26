// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    compact,
    debounce,
    get,
    isFunction,
    map,
    noop,
    transform,
} from 'lodash';
import * as validators from './lib-app/validators';

const DEFAULT_CONTEXT = {
    getFieldError: noop,
    getFieldValue: noop,
    setFieldValidators: noop,
    setFieldValue: noop,
    setFieldValueDebounced: noop,
};

export const FormContext = React.createContext(DEFAULT_CONTEXT);

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.getFieldValue = (fieldName) => {
            return this.state.fieldValues[fieldName];
        };

        this.getFieldError = (fieldName) => {
            const {fieldErrors, initialSubmit} = this.state;

            return (initialSubmit)
                ? fieldErrors[fieldName]
                : undefined;
        };

        this.setFieldValue = (fieldName, value) => {
            if (fieldName && value !== this.getFieldValue(fieldName)) {
                this.setState({
                    fieldValues: {
                        ...this.state.fieldValues,
                        [fieldName]: value,
                    },
                }, () => this.validateField(fieldName));
            }
        };

        this.setFieldValidators = (fieldName, validate) => {
            if (fieldName && validate) {
                this.setState({
                    fieldValidators: {
                        ...this.state.fieldValidators,
                        [fieldName]: validate,
                    },
                }, () => this.validateField(fieldName));
            }
        };

        this.setFieldValueDebounced = debounce(this.setFieldValue, 200, {trailing: true});

        this.state = {
            context: {
                getFieldError: this.getFieldError,
                getFieldValue: this.getFieldValue,
                setFieldValidators: this.setFieldValidators,
                setFieldValue: this.setFieldValue,
                setFieldValueDebounced: this.setFieldValueDebounced,
            },
            fieldErrors: {},
            fieldValues: {},
            fieldValidators: {},
            initialSubmit: false,
        };
    }

    componentWillMount() {
        const {fieldValues} = this.props;

        if (fieldValues) {
            this.setState({fieldValues});
        }
    }

    setFieldError(fieldName, error) {
        if (fieldName && error) {
            this.setState({
                fieldErrors: {
                    ...this.state.fieldErrors,
                    [fieldName]: error,
                },
            });
        }
    }

    validateField(fieldName, forceValidate) {
        const {fieldValues, fieldValidators} = this.state;
        const fieldValidatorsArray = fieldValidators[fieldName];
        let fieldError = null;

        if (fieldValidatorsArray && fieldValidatorsArray.length) {
            const fieldValue = this.getFieldValue(fieldName);

            // Using transform to iterate through the validators until an error is found.
            // Only sending one error at a time to the form field to prevent a mass
            // amount of errors showing up. This is also a much more efficient approach
            // so all validators aren't iterated through every time the field needs to
            // be validated.
            transform(fieldValidatorsArray, (errors, validator) => {
                if (isFunction(validator)) {
                    fieldError = validator(fieldValue, fieldValues);
                } else {
                    const importedValidator = validators[validator]; // eslint-disable-line

                    if (importedValidator && isFunction(importedValidator)) {
                        fieldError = importedValidator(fieldValue, fieldValues);
                    } else {
                        fieldError = `${validator} is not a valid validator. Please pass a function or `;
                        fieldError += `insure you are using the correct name for the validator.`;
                    }
                }

                return !fieldError;
            });

        }

        if(fieldError) {
            this.setFieldError(fieldName, fieldError);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({initialSubmit: true});
    }

    render() {
        const {children, className, name} = this.props;

        return (
            <FormContext.Provider value={this.state.context}>
                <form className={classnames('form', className)} name={name} onSubmit={this.handleSubmit}>
                    {children}
                </form>
            </FormContext.Provider>
        );
    }
}

Form.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    fieldValues: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.string,
    ])),
    name: PropTypes.string.isRequired,
};
