// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {omit} from 'lodash';

// Components
import Button from './Button';
import withFormControl from './withFormControl';

class ButtonSubmitControlled extends Component {
    render() {
        const {className, disabled, formState} = this.props;
        const props = {
            ...omit(this.props, ['formState']),
            className: classnames('button-submit-controlled', className),
            disabled: disabled || formState.formDisabled,
            type: 'submit',
        };

        return <Button {...props} />;
    }
}

ButtonSubmitControlled.propTypes = {
    /** Ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** Disables button if true. */
    disabled: PropTypes.bool,
    formState: PropTypes.shape({
        /** Comes from the state of the FormControlled component. Disables button if true. */
        formDisabled: PropTypes.bool,
    }),
};

export default withFormControl(ButtonSubmitControlled);