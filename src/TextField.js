import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';
import {MDCTextFieldHelperText} from '@material/textfield/helper-text';

// Styles
import './TextField.scss';

export default class TextField extends Component {
    constructor(props) {
        super(props);
        this.textFieldRef = createRef();
        this.textFieldHelperTextRef = createRef();
    }

    componentDidMount() {
        new MDCTextField(this.textFieldRef.current);
        new MDCTextFieldHelperText(this.textFieldHelperTextRef.current);
    }

    handleKeyDown = (event) => {
        event.stopPropagation();

        const {onKeyDown} = this.props;
        if (onKeyDown) {
            onKeyDown();
        }
    }

    getClass() {
        const {className, disabled, fullWidth} = this.props;

        return classnames({
            'text-field': true,
            'mdc-text-field': true,
            'mdc-text-field--disabled': disabled,
            'mdc-text-field--fullwidth': fullWidth,
        }, className);
    }

    getHelperTextClass() {
        return classnames({
            'mdc-text-field-helper-text': true,
            'mdc-text-field-helper-text--persistent': true,
            'mdc-text-field-helper-text--validation-msg': this.props.error,
        })
    }

    render() {
        const {
            disabled, 
            helperText, 
            label, 
            inputProps, 
            onClick, 
            onChange, 
            name,
            value,
        } = this.props;
        const inputCombinedProps = {
            ...inputProps,
            ...{            
                className: 'mdc-text-field__input',
                disabled,
                onKeyDown: this.handleKeyDown,
                name,
                onChange,
                onClick,
                value,
            },  
        };

        return (
            <React.Fragment>
                <div className={this.getClass()} ref={this.textFieldRef}>
                    <input {...inputCombinedProps} /> 
                    <label className="mdc-floating-label" htmlFor={name}>{label}</label>
                    <div className="mdc-line-ripple"></div>
                </div>
                <p className={this.getHelperTextClass()} aria-hidden="true" ref={this.textFieldHelperTextRef}>
                    {helperText}
                </p>
            </React.Fragment>
        );
    }
}

TextField.propTypes = {
    /** ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** helper text is the text that shows below the field */
    helperText: PropTypes.string,
    /** label for the form field */
    label: PropTypes.string,
    /** onKeyDown functionality to be run from the parent */
    onKeyDown: PropTypes.func,
    /** additional props to be added to the input DOM element */
    inputProps: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string, 
    ])),
    /** name prop for the input field */
    name: PropTypes.string,
    /** onClick functionality to be run from the parent */
    onClick: PropTypes.func,
    /** onChange functionality to be run from the parent */
    onChange: PropTypes.func,

};

TextField.defaultProps = {
    helperText: '',
}