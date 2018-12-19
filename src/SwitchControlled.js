// Vendor Libs
import React, {Component} from 'react';

// Components
import Switch from './Switch';
import withFormControl from './withFormControl';
import withSwitchControl from './withSwitchControl';

class SwitchControlled extends Component {
	render() {
		return <Switch {...this.props} className="checkbox-controlled" />;
	}
}

export default withFormControl(withSwitchControl(SwitchControlled));