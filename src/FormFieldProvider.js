// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {difference, map, noop, union} from 'lodash';

// Components
import {FormContext} from './Form';

const DEFAULT_CONTEXT = {
    handleChange: noop,
};
export const FormFieldContext = React.createContext(DEFAULT_CONTEXT);

export default class FormFieldProvider extends Component {
    constructor(props) {
        super(props);

        this.handleOnChange = this.handleChange.bind(this);
        this.state = {
            value: '',
        }
    }
    state = {
        value: null,
    }

    componentDidMount() {
        const {validate} = this.props;
        
        if (validate) {
            this.setFieldValidators(this.stateName, validate);
        }
    }

    componentWillReceiveProps({validate: nextValidate}) {
        if (this.props.validate !== nextValidate) {
            this.setFieldValidators(this.stateName, nextValidate);
        }
    }

    shouldHandleClick() {
        const {componentName} = this.props;

        return (componentName === 'Checkbox' || componentName === 'Switch');
    }

    shouldHandleChange() {
        const {componentName} = this.props;

        return (componentName !== 'Checkbox' && componentName !== 'Switch');
    }

    handleClick = (event) => {
        const {defaultValue, name, onClick} = this.props;
        let returnValue;

        if (this.shouldHandleClick()) {
            if (name !== this.stateName) {
                let formStateValue = this.getFieldValue(this.stateName);
                formStateValue = (!formStateValue)
                    ? [] : [...formStateValue];
                returnValue = (event.target.checked)
                    ? union(formStateValue, [defaultValue])
                    : difference(formStateValue, [defaultValue]);
            } else {
                if (event.target.checked) {
                    returnValue = defaultValue;
                } else {
                    returnValue = (defaultValue === true) ? false : '';
                }
            }

            this.setState({value: returnValue});
            this.setFieldValue(this.stateName, returnValue);
        }


        if (onClick) {
            onClick(event);
        }
    }

    handleChange = (event) => {
        this.setFieldValueDebounced(this.stateName, event.target.value);
    }

    renderChild = (formState) => {
        const {className, name} = this.props;
        const {componentImport} = this.state;
        let props = {
            className: classnames('form-field', className),
            onChange: this.handleChange,
            onClick: this.handleClick,
        };
        let content = null;

        this.stateName = name.replace('[]', '');

        if (!this.setFieldValue) {

            // formState comes from the FormContext in the Form.js file.
            // Values passed into the context object of formState will be
            // set to the 'this' object of this class.
            map(formState, (value, key) => {
                this[key] = value;
            });
        }


        if (componentImport) {
            const Component = componentImport;

            props.error = this.getFieldError(this.stateName) || '';
            props.value = this.state.value || this.getFieldValue(this.stateName) || '';
            props.disabled = this.shouldDisable() || this.props.disabled;
            content = <Component {...this.props} {...props} />;
        }

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
    /** Used to add attitional styling from parent component */
    className: PropTypes.string,
    /**
        Name of an existing component in the prop types. This will render
        whichever component you decide to import dynamically by choosing the name
        of an existing component designed for the FormField component.
    */
    componentName: PropTypes.oneOf(['Checkbox', 'Switch', 'TextField']).isRequired,
    /**
        If the component handles disabled props, this should disable the field
        like it would normally by passing the disable prop the HTML DOM element
        if supported such as input or select. These are supported by the components
        supplied through component name. If true, this will override the disabled
        state coming from the Form component.
    */
    disabled: PropTypes.bool,
    /**
        Standard name you would use for a form element. Should be unique from all
        other children form fields within the Form component unless it ends with a [].
        Currently this is used for checkbox and will create an array of values based on
        what checkboxes are checked for this name. For instance, if you had three checkboxes
        with the name "MyField[]", the values for MyField would end up to be an array of
        values based on the defaultValue of the checkbox and if they are checked.
    */
    name: PropTypes.string.isRequired,
    /**
        This is an array of validators for the field. If they don't pass, you will see an
        error passed through the helperText prop passed down from the Form component.
        See validator.js in lib-app for the already supplied standard validation functions.
        You can optionally pass a function instead of a string for your own type of custome
        validations. If you pass a function, the arguments recieved for that function are the
        value and the values of other fields. See validator.js in lib-app to see the format.
        The 2nd argument passes the other form fields in case you want to validate this particular
        field based on the value of another field(s).
    */
    validate: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
};
