// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {omit} from 'lodash';

// Components
import withValidation from './withValidation';

class TextFieldValidated extends Component {
    render() {
        const {className, component} = this.props;
        const TextField = component;

        return (
            <TextField 
                {...omit(this.props, ['formState'])} 
                className={classnames('text-field-validated', className)} 
            />
        );
    }
}

TextFieldValidated.propTypes = {
    className: PropTypes.string,
    component: PropTypes.func,
};

export default withValidation(TextFieldValidated);