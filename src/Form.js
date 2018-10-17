// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Context 
import {FormContext, formState} from './FormContext';

export default class Form extends Component {
	constructor(props) {
	    super(props);

	    this.setFieldError = (fieldName, error) => {
	        this.setState((state) => {
	            return {
	            	fields: {
	            		...state.fields,
	            		...{
	            			[fieldName]: {...state.fields[fieldName], {error}}
	            		}
	            	}
	            }
	    	});
	    };

	    this.setFieldValue = (fieldName, value) => {
	        this.setState((state) => {
	            return {
	            	fields: {
	            		...state.fields,
	            		...{
	            			[fieldName]: {...state.fields[fieldName], {value}}
	            		}
	            	}
	            }
	    	});
	    };

	    this.state = {
	        fields: formState.fields,
	        setFieldError: this.setFieldError,
	        setFieldValue: this.setFieldValue,
	    };
	}

	render() {
		const {children, className, name} = this.props;

	    return (
	        <FormContext.Provider value={this.state}>
	        	<form className={classnames('form', className)} name={name}>{children}</form>
	        </FormContext.Provider>
	    );
	}
}

Form.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	name: PropTypes.string,
}