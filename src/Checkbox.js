// Vendor Libs
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCCheckbox} from '@material/checkbox';
import {MDCFormField} from '@material/form-field';

import './Checkbox.scss';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.checkboxRef = createRef();
        this.formFieldRef = createRef();
        this.state = {
            checked: props.checked,
            indeterminate: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const checkbox = new MDCCheckbox(this.checkboxRef.current);
        const formField = new MDCFormField(this.formFieldRef.current);

        formField.input = checkbox;
    }

    componentWillReceiveProps({checked: nextChecked}) {
        if (this.state.checked !== nextChecked) {
            this.setState({checked: nextChecked});
        }
    }

    handleChange(event) {
        event.stopPropagation();
        this.setState({
            checked: event.target.checked,
            indeterminate: event.target.indeterminate,
        });
        this.props.onChange(event);
    }

    getCheckboxClass() {
        return classnames({
            'mdc-checkbox': true,
            'mdc-checkbox--disabled': this.props.disabled,
        });
    }

    render() {
        const {
            className,
            disabled,
            id,
            label,
            name,
        } = this.props;

        return (
            <div className={classnames('checkbox', className)}>
                <div className="mdc-form-field" ref={this.formFieldRef}>
                    <div className={this.getCheckboxClass()} ref={this.checkboxRef}>
                        <input
                            type="checkbox"
                            className="mdc-checkbox__native-control"
                            disabled={disabled}
                            id={id || name}
                        />
                        <div className="mdc-checkbox__background">
                            <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                <path className="mdc-checkbox__checkmark-path"
                                    fill="none"
                                    d="M1.73,12.91 8.1,19.28 22.79,4.59"
                                />
                            </svg>
                            <div className="mdc-checkbox__mixedmark" />
                        </div>
                    </div>
                    {
                        (label)
                            ? <label htmlFor={id || name}>{label}</label>
                            : null
                    }
                </div>
            </div>
        );
    }
}

Checkbox.propTypes = {
    /** ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** Controls the if the checkbox is checked or not */
    checked: PropTypes.bool,
    /** sets the state of the checkbox to disabled */
    disabled: PropTypes.bool,
    /** The id attribute for the input of the checkbox */
    id: PropTypes.string,
    /** Additional props to be added to the input element */
    inputProps: PropTypes.object,
    /** the label to be shown with the checkbox */
    label: PropTypes.string,
    /** The name attribute for the input of the checkbox */
    name: PropTypes.string,
    /** Callback function for when the checkbox changes. */
    onChange: PropTypes.func,
    /** The value attribute for the input element */
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};

Checkbox.defaultProps = {
    checked: false,
    onChange: () => null,
    value: true,
};
