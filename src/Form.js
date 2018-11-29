// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    debounce,
    isEmpty,
    isFunction,
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
    shouldDisable: noop,
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

        this.shouldDisable = () => {
            return (this.state.submitting);
        };

        this.setFieldValueDebounced = debounce(this.setFieldValue, 200, {trailing: true});

        this.state = {
            context: {
                getFieldError: this.getFieldError,
                getFieldValue: this.getFieldValue,
                setFieldValidators: this.setFieldValidators,
                setFieldValue: this.setFieldValue,
                setFieldValueDebounced: this.setFieldValueDebounced,
                shouldDisable: this.shouldDisable,
            },
            fieldErrors: {},
            fieldValues: {},
            fieldValidators: {},
            initialSubmit: false,
            submitting: false,
        };
    }

    componentWillMount() {
        const {fieldValues} = this.props;

        if (fieldValues) {
            this.setState({fieldValues});
        }
    }

    componentWillReceiveProps({submitted: nextSubmitted}) {
        if (!this.props.submitted && nextSubmitted) {
            this.setState({submitting: false});
            // Do something once form has been submitted
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const {submitting} = this.state;
        const {submitting: nextSubmitting} = nextState;
        const {onSubmit: nextOnSubmit} = nextProps;

        if (
            !submitting &&
            nextSubmitting &&
            !this.hasErrors(nextProps, nextState)
        ) {
            nextOnSubmit();
            this.setState({initialSubmit: false});
        }
    }

    setFieldError(fieldName, error) {
        const currentFieldError = this.state.fieldErrors[fieldName];

        if (
            fieldName &&
            (
                (error && error !== currentFieldError) ||
                (!error && currentFieldError)
            )
        ) {
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
                        fieldError = `${validator} is not a valid validator.`;
                    }
                }

                return !fieldError;
            });

        }

        this.setFieldError(fieldName, fieldError);
    }

    hasErrors(props = this.props, state = this.state) {
        return (!isEmpty(state.fieldErrors) || !!props.formError);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({initialSubmit: true, submitting: true});
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
    /** The children to go in the form */
    children: PropTypes.node,
    /** Used to add attitional styling from parent component */
    className: PropTypes.string,
    /** Any form type errors to help with it submitting and showing errors */
    formError: PropTypes.string,
    /**
        Values to populate the fields going by the same name you use
        as the name prop for the field and using the FormField component
    */
    fieldValues: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.string,
    ])),
    /**
        Standard name you would give a form using html. Helps with react refs.
        It's ideal to keep these names unique per what's displayed on the current
        page because of the potential refs created.
        (refs are coming from a FormRefProvider component to have the ability to
        submit the form outside of the form).
    */
    // TODO: need to figure out the ref thing and disabling components that would
    // potentially submit this form from outside of the form. Probably pass the
    // values down through the value argument in the provider and callback functions.
    name: PropTypes.string.isRequired,
    /**
        Functionality to run when this Form component meets all requirements
        such as passsing validation tests.
    */
    onSubmit: PropTypes.func,
    /** Indicates if the form was submitted and a response came back */
    submitted: PropTypes.bool,
};

Form.defaultProps = {
    onSubmit: noop,
};
