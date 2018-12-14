// Vendor Libs
import React, {Component, createRef} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {MDCTextFieldHelperText} from '@material/textfield/helper-text';

export default class FormFieldHelperText extends Component {
    constructor(props) {
        super(props);

        this.textFormFieldHelperTextRef = createRef();
    }

    componentDidMount() {
        new MDCTextFieldHelperText(this.textFormFieldHelperTextRef.current);
    }

    getClass() {
        const {className, error} = this.props;

        return classnames({
            'mdc-text-field-helper-text': true,
            'mdc-text-field-helper-text--persistent': true,
            'mdc-text-field-helper-text--validation-msg': error,
        }, className);
    }

    render() {
        const {error, helperText, style} = this.props;

        return (
            <p
                className={this.getClass()}
                aria-hidden="true"
                ref={this.textFormFieldHelperTextRef}
                style={style}
            >
                {error || helperText}
            </p>
        );
    }
}

FormFieldHelperText.propTypes = {
    /** className from parent to style from parent scss file */
    className: PropTypes.string,
    /**
        Text that will shows below the form fields and marks
        it as a validation-msg for className for additional sytling.
        If set, this will override helperText
    */
    error: PropTypes.string,
    /** text that will shows below the form fields */
    helperText: PropTypes.string,
    /** additional inline styling for the component */
    style: PropTypes.object,
};

FormFieldHelperText.defaultProps = {
    helperText: '',
};
