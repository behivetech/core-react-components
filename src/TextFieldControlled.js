// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'lodash';

// Components
import TextField from './TextField.js';
import withFormControl from './withFormControl';
// TODO: Set up withValidation file.
const withValidation = (Component) => Component;

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

    handleChange(event) {
        const value = event.target.value;
        const {name, onChange, formState} = this.props;

        this.setState({value: value});
        formState.setFieldValueDebounced(name, value);
        onChange(event);
    }

    render() {
        const textField = (
            <TextField 
                {...omit(this.props, ['formState'])} 
                onChange={this.handleChange} 
                value={this.state.value} 
            />
        );

        return (this.props.validate)
            ? withValidation(textField)
            : textField;
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

TextFieldControlled.defaultProps = {
    onChange: () => null,
    value: '',
};


export default withFormControl(TextFieldControlled);