// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
    debounce,
    difference,
    noop,
    union,
} from 'lodash';

// Components
import Form from './Form';

const DEFAULT_CONTEXT = {
    formDisabled: false,
    getFieldValue: noop,
    getFieldValues: noop,
    initialSubmit: false,
    setFieldError: noop,
    setFieldValue: noop,
    setFieldValueDebounced: noop,
    unsetFieldError: noop,
};

export const FormContext = React.createContext(DEFAULT_CONTEXT);

export default class FormControlled extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formDisabled: this.props.disabled,
            initialSubmit: false,
            fieldErrors: [],
            fieldValues: {},
            submitting: false,
        };
        this.setFieldValueDebounced = debounce(this.setFieldValue, 300, {trailing: true});
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    UNSAFE_componentWillMount() {
        const {fieldValues} = this.props;

        if (fieldValues) {
            this.setState({fieldValues});
        }
    }

    getFieldValue(fieldName) {
        return this.state.fieldValues[fieldName];
    }

    getFieldValues() {
        return this.state.fieldValues;
    }

    setFieldError(fieldName) {
        this.setState({fieldErrors: union(this.state.fieldErrors, [fieldName])});
    }

    unsetFieldError(fieldName) {
        this.setState({fieldErrors: difference(this.state.fieldErrors, [fieldName])});
    }

    setFieldValue(fieldName, value) {
        if (fieldName && value !== this.getFieldValue(fieldName)) {
            this.setState({
                fieldValues: {
                    ...this.state.fieldValues,
                    [fieldName]: value,
                },
            });
        }
    }

    hasErrors() {
        return (!!this.state.fieldErrors.length || !!this.props.formError);
    }

    handleSubmit(event) {
        this.setState({initialSubmit: true});

        if (!this.hasErrors()) {
            this.setState({
                formDisabled: true,
                submitting: true,
            });

            this.props.onSubmit(this.state.fieldValues, this.handleSubmitted);
        }
    }

    handleSubmitted() {
        this.setState({
            formDisabled: false,
            submitting: false,
        });
    }


    render() {
        const {children, className, formError, id, name} = this.props;
        const {formDisabled, initialSubmit} = this.state;
        const formContext = {
            formDisabled,
            initialSubmit,
            getFieldValue: this.getFieldValue.bind(this),
            getFieldValues: this.getFieldValues.bind(this),
            setFieldError: this.setFieldError.bind(this),
            setFieldValue: this.setFieldValue.bind(this),
            setFieldValueDebounced: this.setFieldValueDebounced.bind(this),
            unsetFieldError: this.unsetFieldError.bind(this),
        };

        return (
            <FormContext.Provider value={formContext}>
                <Form
                    className={classnames('form-controlled', className)}
                    id={id}
                    name={name}
                    onSubmit={this.handleSubmit}
                >
                    {children}
                    {(formError) ? <div>{formError}</div> : null}
                </Form>
            </FormContext.Provider>
        );
    }
}

FormControlled.propTypes = {
    /** The children to go in the form */
    children: PropTypes.node,
    /** Used to add attitional styling from parent component */
    className: PropTypes.string,
    /** Disable all elements of the form */
    disabled: PropTypes.bool,
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
    /** id attribute for the form */
    id: PropTypes.string,
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
};

FormControlled.defaultProps = {
    disabled: false,
    onSubmit: noop,
};
