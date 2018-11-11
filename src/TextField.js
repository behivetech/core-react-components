// Vendor Libs
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCTextField} from '@material/textfield';

// Components
import FormFieldHelperText from './FormFieldHelperText';

// Styles
import './TextField.scss';

export default class TextField extends Component {
    constructor(props) {
        super(props);
        this.textFieldRef = createRef();
    }

    componentDidMount() {
        new MDCTextField(this.textFieldRef.current);
    }

    handleKeyDown = (event) => {
        event.stopPropagation();

        const {onKeyDown} = this.props;

        if (onKeyDown) {
            onKeyDown(event);
        }
    }

    getTextFieldClass() {
        const {disabled, fullWidth} = this.props;

        return classnames({
            'mdc-text-field': true,
            'mdc-text-field--disabled': disabled,
            'mdc-text-field--fullwidth': fullWidth,
        });
    }

    render() {
        const {
            className,
            disabled,
            error,
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
            <div className={classnames('text-field', className)}>
                <div className={this.getTextFieldClass()} ref={this.textFieldRef}>
                    <input {...inputCombinedProps} />
                    <label className="mdc-floating-label" htmlFor={name}>{label}</label>
                    <div className="mdc-line-ripple" />
                </div>
                <FormFieldHelperText error={error} helperText={helperText} />
            </div>
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
};
