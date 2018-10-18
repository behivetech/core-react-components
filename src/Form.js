// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DEFAULT_CONTEXT = {
	fieldErrors: {},
	fieldValues: {},
	setFieldError: () => null,
	setFieldValue: () => null,
};

export const FormContext = React.createContext(DEFAULT_CONTEXT);

export default class Form extends Component {
	constructor(props) {
		super(props);

	    this.setFieldError = (fieldName, error) => {
	    	if (fieldName && error) {
		    	this.setState({
		    		fieldErrors: {
		    			...this.state.fieldErrors,
		    			[fieldName]: error,
		    		}
		    	});
	    	}
	    }

	    this.setFieldValue = (fieldName, value) => {
	    	if (fieldName && value) {
		        this.setState({
		        	fieldValues: {
		        		...this.state.fieldValues,
		        		[fieldName]: value,
		        	}
		        });
	    	}
	    }

		this.state = {
			...DEFAULT_CONTEXT,
			...{
				setFieldError: this.setFieldError,
				setFieldValue: this.setFieldValue,
			}
		}
	}

	componentWillUpdate(nextProps, nextState) {
		console.log(nextState)
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
	name: PropTypes.string.isRequired,
};