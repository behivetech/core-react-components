// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Components
import {FormContext} from './Form';

export default class FormField extends Component {
    state = {componentImport: null}
    
    componentWillMount() {
        import(`./${this.props.componentName}`).then((component) => {
            if (component && component.default) {
                this.setState({componentImport: component.default});
            }
        });
    }

    componentWillUnmount() {
        this.setFieldValueDebounced.cancel()
    }
    
    handleChange = (event) => {
        const {name, onClick} = this.props;

        this.value = event.target.value;
        this.setFieldValueDebounced(name, event.target.value);
        
        if (onClick) {
            onClick(event);
        }
    }

    renderChild = (formState) => {
        const {className, name} = this.props;
        const {componentImport} = this.state;
        let props = {
            className: classnames('form-field', className),
            onChange: this.handleChange,
        }
        let content = null;

        this.value = formState.fieldValues[name] || '';

        if (!this.setFieldValueDebounced) {
            this.setFieldValueDebounced = formState.setFieldValueDebounced;
        } 

        if (componentImport) {
            const Component = componentImport;
            
            content = <Component {...this.props} {...props} value={this.value} />;
        }

        return content;
    }

    render() {
        return (
            <FormContext.Consumer>
                {this.renderChild}
            </FormContext.Consumer>
        );
    }
}

FormField.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    componentName: PropTypes.oneOf(['TextField']).isRequired,
    name: PropTypes.string.isRequired,
};