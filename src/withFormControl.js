// Vendor Libs
import React, {Component} from 'react';

// Components
import {FormContext} from './Form';

export default function (WrappedComponent) {
    return class FormFieldControlled extends Component {
        constructor(props) {
            super(props);
            this.renderChild = this.renderChild.bind(this);
        }

        renderChild(formState) {
            return (
                <WrappedComponent
                    {...this.props}
                    formState={formState}
                    disabled={formState.shouldDisable() || this.props.disabled}
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
    };
}

