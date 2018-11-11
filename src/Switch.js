// Vendor Libs
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCSwitch} from '@material/switch';
import Checkbox from './Checkbox';
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
    }

    ComponentDidMount() {
        const checkbox = new MDCSwitch(this.switchRef.current);
        const formField = new MDCFormField(this.formFieldRef.current);

        formField.input = checkbox;
    }

    getSwitchClass = (props) => {
        const {checked, className, disabled} = props;

        return classnames({
            'mdc-switch': true,
            'mdc-switch--disabled': disabled,
            'mdc-switch--checked': checked,
        }, className);
    }

    renderComponent = (handleClick, props) => {
        const {
            className,
            checked,
            defaultValue,
            disabled,
            error,
            helperText,
            label,
            onChange,
            onClick,
            name,
            style,
        } = props;

        return (
            <div className={classnames('switch', className)}>
                <div className="mdc-form-field switch--form-field" ref={this.formFieldRef}>
                    <div className={this.getSwitchClass(props)} ref={this.switchRef}>
                      <div className="mdc-switch__track" />
                      <div className="mdc-switch__thumb-underlay">
                        <div className="mdc-switch__thumb">
                            <input
                                checked={checked}
                                className="mdc-switch__native-control"
                                disabled={disabled}
                                id={name}
                                name={name}
                                onChange={onChange}
                                onClick={onClick}
                                role="switch"
                                style={style}
                                type="checkbox"
                                value={defaultValue}
                            />
                        </div>
                      </div>
                    </div>
                {
                    (label)
                        ? <label htmlFor={name}>{label}</label>
                        : null
                }
                </div>
                <FormFieldHelperText error={error} helperText={helperText} />
            </div>
        );
    }

    render() {
        return <Checkbox {...this.props} renderComponent={this.renderComponent} />;
    }
}

Switch.propTypes = {
    /** ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** Controls the if the checkbox is checked or not */
    checked: PropTypes.bool,
    /** The value to be compared with props value to determine if the checkbox is checked */
    defaultValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    /** sets the state of the checkbox to disabled */
    disabled: PropTypes.bool,
    /** the label to be shown with the checkbox */
    label: PropTypes.string,
    /** The name attribute for the input of the checkbox */
    name: PropTypes.string,
    /** 
        Callback function for when the checkbox changes. It's recommended to use 
        onClick for the changing event since IE doesn't play well with onChange 
    */
    onChange: PropTypes.func,
    /** Add additional inline styling to the checkbox */
    style: PropTypes.object,
    /** 
        The values to be compared with the default value with will check or umncheck 
        the checkbox. If it's an array, this will compare to see if the defaultValue exists 
        in the checkbox. 
    */
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};
