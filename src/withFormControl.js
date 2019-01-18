// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Components
import {FormContext} from './FormControlled';

export default function (WrappedComponent) {
    class FormFieldControlled extends Component {
        constructor(props) {
            super(props);
            this.renderChild = this.renderChild.bind(this);
        }

        renderChild(formState) {
            return (
                <WrappedComponent
                    {...this.props}
                    formState={formState}
                    disabled={formState.formDisabled || this.props.disabled}
                />
            );
        }

        render() {
            return (
                <FormContext.Consumer>
                    {this.renderChild}
                </FormContext.Consumer>
            );
        }
    }

    FormFieldControlled.propTypes = {
        /** disables the field */
        disabled: PropTypes.bool,
    };

    return FormFieldControlled;
}

