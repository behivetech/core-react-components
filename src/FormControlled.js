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
    getFieldValue: noop,
    getFieldValues: noop,
    getInitialSubmit: noop,
    setFieldError: noop,
    setFieldValue: noop,
    setFieldValueDebounced: noop,
    shouldDisable: noop,
    unsetFieldError: noop,
};

export const FormContext = React.createContext(DEFAULT_CONTEXT);

export default class FormControlled extends Component {
    constructor(props) {
        super(props);

        this.getFieldValue = (fieldName) => {
            return this.state.fieldValues[fieldName];
        };

        this.getFieldValues = () => {
            return this.state.fieldValues;
        };

        this.getInitialSubmit = () => {
            return this.state.initialSubmit;
        };

        this.setFieldError = (fieldName) => {
            this.setState({fieldErrors: union(this.state.fieldErrors, [fieldName])});
        };

        this.unsetFieldError = (fieldName) => {
            this.setState({fieldErrors: difference(this.state.fieldErrors, [fieldName])});
        };

        this.setFieldValue = (fieldName, value) => {
            if (fieldName && value !== this.getFieldValue(fieldName)) {
                this.setState({
                    fieldValues: {
                        ...this.state.fieldValues,
                        [fieldName]: value,
                    },
                });
            }
        };

        this.shouldDisable = () => {
            return (this.state.submitting);
        };

        this.setFieldValueDebounced = debounce(this.setFieldValue, 200, {trailing: true});

        this.state = {
            context: {
                getFieldValue: this.getFieldValue,
                getFieldValues: this.getFieldValues,
                getInitialSubmit: this.getInitialSubmit,
                setFieldError: this.setFieldError,
                setFieldValue: this.setFieldValue,
                setFieldValueDebounced: this.setFieldValueDebounced,
                shouldDisable: this.shouldDisable,
                unsetFieldError: this.unsetFieldError,
            },
            fieldErrors: [],
            fieldValues: {},
            initialSubmit: false,
            submitting: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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

    hasErrors(props = this.props, state = this.state) {
        return (!!state.fieldErrors.length || !!props.formError);
    }

    handleSubmit(event) {
        this.setState({initialSubmit: true, submitting: true});
    }

    render() {
        const {children, className, id, name} = this.props;

        return (
            <FormContext.Provider value={this.state.context}>
                <Form 
                    className={classnames('form-controlled', className)} 
                    id={id}
                    name={name} 
                    onSubmit={this.handleSubmit}
                >
                    {children}
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
    /** Indicates if the form was submitted and a response came back */
    submitted: PropTypes.bool,
};

FormControlled.defaultProps = {
    onSubmit: noop,
};
