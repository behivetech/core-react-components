// Vendor Libs
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCSwitch} from '@material/switch';
import {MDCFormField} from '@material/form-field';

// Components
import FormFieldHelperText from './FormFieldHelperText';

// Styles
import './Switch.scss';

export default class Switch extends Component {
    constructor(props) {
        super(props);
        this.switchRef = createRef();
        this.formFieldRef = createRef();
        this.state = {
            checked: props.checked,
            indeterminate: false,
        };
    }

    componentDidMount() {
        const checkbox = new MDCSwitch(this.switchRef.current);
        const formField = new MDCFormField(this.formFieldRef.current);

        formField.input = checkbox;
    }

    handleChange = (event) => {
        event.stopPropagation();
        this.setState({
            checked: event.target.checked,
            indeterminate: event.target.indeterminate,
        });
        this.props.onChange(event);
    }

    getSwitchClass = (props) => {
        const {checked, className, disabled} = this.props;

        return classnames({
            'mdc-switch': true,
            'mdc-switch--disabled': disabled,
            'mdc-switch--checked': checked,
        }, className);
    }

    render() {
        const {
            checked,
            className,
            disabled,
            error,
            helperText,
            id,
            label,
            name,
            value,
        } = this.props;

        return (
            <div className={classnames('switch', className)}>
                <div className="mdc-form-field switch--form-field" ref={this.formFieldRef}>
                    <div className={this.getSwitchClass()} ref={this.switchRef}>
                        <div className="mdc-switch__track" />
                        <div className="mdc-switch__thumb-underlay">
                            <div className="mdc-switch__thumb">
                                <input
                                    checked={checked}
                                    className="mdc-switch__native-control"
                                    disabled={disabled}
                                    id={id || name}
                                    name={name || id}
                                    onChange={this.handleChange}
                                    role="switch"
                                    type="checkbox"
                                    value={value}
                                />
                            </div>
                        </div>
                    </div>
                {
                    (label)
                        ? <label htmlFor={id || name}>{label}</label>
                        : null
                }
                </div>
                <FormFieldHelperText error={error} helperText={helperText} />
            </div>
        );
    }
}

Switch.propTypes = {
    /** ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** Controls the if the checkbox is checked or not */
    checked: PropTypes.bool,
    /** sets the state of the checkbox to disabled */
    disabled: PropTypes.bool,
    /** Error to be displayed for this field */
    error: PropTypes.string,
    /** Helper text to be displayed for this field */
    helperText: PropTypes.string,
    /** The id attribute for the input of the checkbox */
    id: PropTypes.string,
    /** the label to be shown with the checkbox */
    label: PropTypes.string,
    /** The name attribute for the input of the checkbox */
    name: PropTypes.string,
    /**
        Callback function for when the checkbox changes. It's recommended to use
        onClick for the changing event since IE doesn't play well with onChange
    */
    onChange: PropTypes.func,
    /**
        The values to be compared with the default value with will check or umncheck
        the checkbox. If it's an array, this will compare to see if the value exists
        in the checkbox.
    */
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};

Switch.defaultProps = {
    checked: false,
    onChange: () => null,
    value: true,
};
