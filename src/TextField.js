import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import mdcAutoInit from '@material/auto-init';
import {MDCTextField} from '@material/textfield';

// Styles
import './TextField.scss';

export default class TextField extends Component {
	constructor(props) {
    	super(props);
    	this.textFieldRef = createRef();
  	}

	componentDidMount() {
		console.log((this.textFieldRef))
		mdcAutoInit.register(this.textFieldRef, MDCTextField);
	}

	getClass() {
		const {className, disabled, fullWidth} = this.props;

		classnames({
			'text-field': true,
			'mdc-text-field': true,
			'mdc-text-field--disabled': disabled,
			'mdc-text-field--fullwidth': fullWidth,
		}, className);
	}

	render() {
		// <input {...this.props} className={classnames('text-field', this.props.className)} />
		const {disabled, helperText, inputProps, onClick, onChange, name} = this.props;
		const inputCombinedProps = {
			...inputProps,
			...{			
				className: 'mdc-text-field__input',
				disabled,
				name,
				onChange,
				onClick,
			},	
		};

		return (
			<div className={this.getClass()} ref={this.textFieldRef}>
			    <input {...inputCombinedProps} /> 
			    <label className="mdc-floating-label" htmlFor={name}>{helperText}</label>
			    <div className="mdc-line-ripple"></div>
			</div>
		);
	}
}

TextField.propTypes = {
	/** ability to add additional className to the component for addistional styling from parent */
	className: PropTypes.string,
	/** helper text is the text that shows below the field */
	helperText: PropTypes.string,
	/** additional props to be added to the input DOM element */
	inputProps: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.number,
		PropTypes.string, 
	])),
	/** name prop for the input field */
	name: PropTypes.string,
	/** onClick functionality to be run from the parent */
	onClick: PropTypes.func,
	/** onChange functionality to be run from the parent */
	onChange: PropTypes.func,

};

TextField.defaultProps = {
	helperText: '',
}