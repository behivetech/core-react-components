// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {FormContext} from './Form';

// Components
import TextField from './TextField';

export default class FormTextField extends Component {

	handleChange = (event) => {
		const {name, onClick} = this.props;

		this.setFieldValue(name, event.target.value);

		if (onClick) {
			onClick(event);
		}
	}

	renderChild = (formState) => {
		const {className, name} = this.props;
		let props = {
			className: classnames('form-text-field', className),
			onChange: this.handleChange,
			value: formState.fieldValues[name] || '',
		}

		if (!this.setFieldValue) {
			this.setFieldValue = formState.setFieldValue;
		} 

		return <TextField {...this.props} {...props} />;
	}

	render() {
	    return (
	        <FormContext.Consumer>
	        	{this.renderChild}
	        </FormContext.Consumer>
	    );
	}
}

FormTextField.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
};