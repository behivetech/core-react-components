// Vendor Libs
import React, {Component} from 'react';

// Components
import Checkbox from './Checkbox';
import withFormControl from './withFormControl';
import withSwitchControl from './withSwitchControl';

class CheckboxControlled extends Component {
	render() {
		return <Checkbox {...this.props} className="checkbox-controlled" />;
	}
}

export default withFormControl(withSwitchControl(CheckboxControlled));