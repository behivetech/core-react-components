// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {difference, omit, union} from 'lodash';

// Components
import withFormControl from './withFormControl';

export default function (WrappedComponent) {
    class SwitchControlled extends Component {
        constructor(props) {
            super(props);
            this.state = {
                checked: (props.checked || props.value === props.formState.getFieldValue(props.name)),
            };
            this.handleChange = this.handleChange.bind(this);
        }

        componentDidMount() {
            const {checked, formState, name, value} = this.props;

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

        render() {
            return (
                <WrappedComponent
                    {...omit(this.props, ['formState'])}
                    checked={this.state.checked}
                    onChange={this.handleChange}
                />
            );
        }
    }

    SwitchControlled.propTypes = {
        formState: PropTypes.shape({
            /** Gets the field value from the FormControlled component */
            getFieldValue: PropTypes.func.isRequired,
            /** Sets the field value in the FormControlled to be a part of the JSON that will be pushed. */
            setFieldValue: PropTypes.func.isRequired,
        }),
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

