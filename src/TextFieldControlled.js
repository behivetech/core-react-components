// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'lodash';

// Components
import TextField from './TextField';
import TextFieldValidated from './TextFieldValidated';
import withFormControl from './withFormControl';

class TextFieldControlled extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || props.formState.getFieldValue(props.name) || '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const {formState, name, value} = this.props;

        if (value) {
            formState.setFieldValue(name, value);
        }
    }

    UNSAFE_componentWillUpdate({value: nextPropsValue}, {value: nextStateValue}) {
        const {name, formState, value} = this.props;

        if (
            value !== nextPropsValue &&
            nextPropsValue !== nextStateValue &&
            this.state.value === nextStateValue
        ) {
            this.setState({value: nextPropsValue}, () => {
                formState.setFieldValue(name, nextPropsValue);
            });
        }
    }

    handleChange(event) {
        const value = event.target.value;
        const {name, onChange, formState} = this.props;

        this.setState({value: value}, () => {
            formState.setFieldValueDebounced(name, value);
            onChange(event);
        });
    }

    render() {
        const props = {
            onChange: this.handleChange,
            value: this.state.value,
        };

        return (this.props.validate)
            ? <TextFieldValidated {...this.props} {...props} component={TextField} />
            : <TextField {...omit(this.props, ['formState'])} {...props} />;
    }

}

TextFieldControlled.propTypes = {
    formState: PropTypes.shape({
        /** Gets the field value from the FormControlled component */
        getFieldValue: PropTypes.func.isRequired,
        /** Sets the field value in the FormControlled to be a part of the JSON that will be pushed. */
        setFieldValue: PropTypes.func.isRequired,
        /** Same as setFieldValue, but deboinces the onChange events. */
        setFieldValueDebounced: PropTypes.func.isRequired,
    }),
    /** Function passed in from withValidation that handles validation of field. */
    handleValidate: PropTypes.func,
    /** Name of the field. Required to be used as a key as part of the JSON that will be pushed */
    name: PropTypes.string.isRequired,
    /** Callback function for additional functionality when the component has a change */
    onChange: PropTypes.func,
    validate: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
    ]),
    /** Value of the component when it is checked. Defaults to true/false if nothing is set */
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
        PropTypes.number,
    ]),
};

TextFieldControlled.defaultProps = {
    onChange: () => null,
    value: '',
};


export default withFormControl(TextFieldControlled);
