// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import Checkbox from './Checkbox';
import withFormControl from './withFormControl';
import withSwitchControl from './withSwitchControl';

class CheckboxControlled extends Component {
	render() {
		return (
			<Checkbox
				{...this.props}
				className={classnames('checkbox-controlled', this.props.className)}
			/>
		);
	}
}

CheckboxControlled.propTypes = {
    /** Ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
};

export default withFormControl(withSwitchControl(CheckboxControlled));
