// Vendor Libs
import React, {Component} from 'react';
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

export default withFormControl(withSwitchControl(CheckboxControlled));