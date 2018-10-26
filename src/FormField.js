// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {difference, map, union} from 'lodash';

// Components
import {FormContext} from './Form';

export default class FormField extends Component {
    state = {
        componentImport: null,
        value: null,
    }

    componentWillMount() {
        import(`./${this.props.componentName}`).then((component) => {
            if (component && component.default) {
                this.setState({componentImport: component.default});
            }
        });
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
        const {onChange} = this.props;

        if (this.shouldHandleChange()) {
            this.setState({value: event.target.value});
            this.setFieldValueDebounced(this.stateName, event.target.value);
        }

        if (onChange) {
            onChange(event);
        }
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

            props.value = this.state.value || this.getFieldValue(this.stateName) || '';
            props.error = this.getFieldError(this.stateName) || '';
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
    children: PropTypes.node,
    className: PropTypes.string,
    componentName: PropTypes.oneOf(['Checkbox', 'Switch', 'TextField']).isRequired,
    name: PropTypes.string.isRequired,
    validate: PropTypes.arrayOf(PropTypes.string, PropTypes.func),
};
