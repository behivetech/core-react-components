// Vendor Libs
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {noop} from 'lodash';
import {MDCCheckbox} from '@material/checkbox';
import {MDCFormField} from '@material/form-field';

// Components
import FormFieldHelperText from './FormFieldHelperText';

// Styles
import './Checkbox.scss';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);

        if (!this.props.renderComponent) {
            this.checkboxRef = createRef();
            this.formFieldRef = createRef();
        }

        this.state = {checked: props.checked || false};
    }

    componentDidMount() {
        if (!this.props.renderComponent) {
            const checkbox = new MDCCheckbox(this.checkboxRef.current);
            const formField = new MDCFormField(this.formFieldRef.current);

            formField.input = checkbox;
        }
    }

    componentWillReceiveProps({checked}) {
        if (this.props.checked !== checked) {
            this.setState({checked});
        }
    }

    handleChange = (event) => {
        // It's unadvised to use handleChange because IE doesn't aways kick this off.
        // It's best to use onClick.
        event.stopPropagation();

        const {onChange} = this.props;

        if (onChange) {
            onChange(event);
        }
    }

    handleClick = (event) => {
        event.stopPropagation();
        this.setState({checked: event.target.checked || false});
        this.props.onClick(event);
    }

    getCheckboxClass() {
        return classnames({
            'mdc-checkbox': true,
            'mdc-checkbox--disabled': this.props.disabled,
        });
    }

    getInputProps = () => {
        const {disabled, name, style} = this.props;

        return {
            checked: this.state.checked,
            disabled,
            id: name,
            name: name,
            onChange: this.handleChange,
            onClick: this.handleClick,
            readOnly: true,
            style,
            type: 'checkbox',
            value: this.props.defaultValue,
        };
    }

    render() {
        const {
            className,
            error,
            helperText,
            label,
            name,
            renderComponent,
        } = this.props;

        return (renderComponent)
            ? renderComponent(
                this.handleClick,
                {...this.props, ...this.getInputProps()},
                this.state
            )
            : (
                <div className={classnames('checkbox', className)}>
                    <div className="mdc-form-field" ref={this.formFieldRef}>
                        <div className={this.getCheckboxClass()} ref={this.checkboxRef}>
                            <input
                                {...this.getInputProps()}
                                className="mdc-checkbox--input mdc-checkbox__native-control"
                            />
                            <div className="mdc-checkbox__background">
                                <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                    <path
                                        className="mdc-checkbox__checkmark-path"
                                        fill="none"
                                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                                    />
                                    </svg>
                                <div className="mdc-checkbox__mixedmark" />
                            </div>
                        </div>
                        <label className="checkbox--label mdc-checkbox--label" htmlFor={name}>{label}</label>
                    </div>
                    <FormFieldHelperText
                        className="checkbox--helper"
                        error={error}
                        helperText={helperText}
                        style={{marginLeft: '10px'}}
                    />
                </div>
            );
    }
}

Checkbox.propTypes = {
    className: PropTypes.string,
    checked: PropTypes.bool,
    /** The actual value of the checkbox. If not set, defaults to true */
    defaultValue: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]).isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    /**
        Function to give the ability to render different content for the checkbox.
        hanldeClick, props and state are passed in as arguments of the function.
        Primary example can be seen with MdcSwitch.
    */
    renderComponent: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.number,
            PropTypes.string,
        ])),
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};

Checkbox.defaultProps = {
    onClick: noop,
    onChange: noop,
};
