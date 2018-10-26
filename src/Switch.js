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
        const {checked, disabled} = props;

        return classnames({
            'mdc-switch': true,
            'mdc-switch--disabled': disabled,
            'mdc-switch--checked': checked,
        });
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
    className: PropTypes.string,
    checked: PropTypes.bool,
    controlled: PropTypes.bool,
    defaultValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};
