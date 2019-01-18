// Vendor Libs
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import {difference, omit, union} from 'lodash';
import classnames from 'classnames';
import {MDCFormField} from '@material/form-field';

// Components
import withFormControl from './withFormControl';

export default function (WrappedComponent) {
    class SwitchControlled extends Component {
        constructor(props) {
            super(props);
            this.state = {
                checked: (props.checked || props.value === props.formState.getFieldValue(props.name)),
            };
            this.formFieldRef = createRef();
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {
            const formField = new MDCFormField(this.formFieldRef.current);
            const {checked, formState, name, value} = this.props;

            formField.input = this.formFieldRef.current.getElementsByTagName('input')[0];

            if (checked) {
                formState.setFieldValue(name, value);
            }
        }

        handleChange(event) {
            const checked = event.target.checked;
            const {
                formState,
                name,
                onChange,
                value,
            } = this.props;
            const stateName = name.replace('[]', '');
            let returnValue = value;

            if (!checked) {
                returnValue = (value === true) ? false : '';
            }

            if(name !== stateName) {
                const stateValue = formState.getFieldValue(stateName) || [];

                returnValue = (checked)
                    ? union([...stateValue], [value])
                    : difference([...stateValue], [value]);
            }

            this.setState({checked});
            formState.setFieldValue(stateName, returnValue);
            onChange(event);
        }

        getClass() {
            return classnames('mdc-form-field', this.props.className);
        }

        render() {
            const {label, id, name} = this.props;

            return (
                <div className={this.getClass()} ref={this.formFieldRef}>
                    <WrappedComponent
                        {...omit(this.props, ['formState'])}
                        checked={this.state.checked}
                        onChange={this.handleChange}
                    />
                    {
                        (label)
                            ? <label htmlFor={id || name}>{label}</label>
                            : null
                    }
                </div>
            );
        }
    }

    SwitchControlled.propTypes = {
        /** ability to add additional className to the component for addistional styling from parent */
        className: PropTypes.string,
        /** checked attribute for the input field */
        checked: PropTypes.bool,
        formState: PropTypes.shape({
            /** Gets the field value from the FormControlled component */
            getFieldValue: PropTypes.func.isRequired,
            /** Sets the field value in the FormControlled to be a part of the JSON that will be pushed. */
            setFieldValue: PropTypes.func.isRequired,
        }),
        /** id attribute for the input field */
        id: PropTypes.string,
        /** the label to be shown with the checkbox */
        label: PropTypes.string,
        /** Name of the field. Required to be used as a key as part of the JSON that will be pushed */
        name: PropTypes.string.isRequired,
        /** Callback function for additional functionality when the component has a change */
        onChange: PropTypes.func,
        /** Value of the component when it is checked. Defaults to true/false if nothing is set */
        value: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.number,
        ]),
    };

    SwitchControlled.defaultProps = {
        onChange: () => null,
        value: true,
    };

    return withFormControl(SwitchControlled);
}

