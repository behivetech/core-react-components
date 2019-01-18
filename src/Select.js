import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {pick} from 'lodash';
import Select from '@material/react-select';

// Components
import FormFieldHelperText from './FormFieldHelperText';

// Styles
import '@material/react-select/index.scss';
import './Select.scss';

export default class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value, clicked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(event) {
        this.setState({clicked: true});
    }

    handleBlur(event) {
        this.setState({clicked: false});
    }

    handleChange(event) {
        event.stopPropagation();
        this.setState({value: event.target.value});
        this.props.onChange(event);
    }

    getClass() {
        const {className, fullWidth, value} = this.props;

        return classnames({
            'select': true,
            'select--full-width': fullWidth,
            'select--show-native-control': true || value || this.state.clicked,
        }, className);
    }

    getNativeControlClass() {
        return classnames({
            'select__native-control': true,
        }, this.props.className);
    }

    render() {
        const {
            error,
            helperText,
            id,
            name,
        } = this.props;

        return (
            <React.Fragment>
                <Select
                    {...pick(this.props, [
                        'box',
                        'children',
                        'disabled',
                        'floatingLabelClassName',
                        'label',
                        'isRtl',
                        'lineRippleClassName',
                        'notchedOutlineClassName',
                        'outlined',
                    ])}
                    id={id || name}
                    name={name || id}
                    className={this.getClass()}
                    onChange={this.handleChange}
                    nativeControlClassName={this.getNativeControlClass()}
                    value={this.state.value}
                />
                <FormFieldHelperText error={error} helperText={helperText} />
            </React.Fragment>
        );
    }
}

TextField.propTypes = {
    /** Enables box variant. */
    box: PropTypes.bool,
    /** Array of <option> elements or a single <option> element. */
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    /** An optional class added to the .mdc-select element. */
    className: PropTypes.string,
    /** Disables the select. */
    disabled: PropTypes.bool,
    /**
        Text that will shows below the form fields and marks
        it as a validation-msg for className for additional sytling.
        If set, this will override helperText
    */
    error: PropTypes.string,
    /** An optional class added to the floating label element. */
    floatingLabelClassName: PropTypes.string,
    /** Enables fullWidth variant. */
    fullWidth: PropTypes.bool,
    /** text that will shows below the form fields */
    helperText: PropTypes.string,
    /** Id of the <select> element. */
    id: PropTypes.string,
    /** Whether the direction of the select is set to RTL. */
    isRtl: PropTypes.bool,
    /** Label text that appears as the floating label. */
    label: PropTypes.string.isRequired,
    /** An optional class added to the line ripple element. */
    lineRippleClassName: PropTypes.string,
    /** The name attribute for the input of the checkbox */
    name: PropTypes.string,
    /** An optional class added to the native <select> element. */
    nativeControlClassName: PropTypes.string,
    /** An optional class added to the notched outline element. Only applied if props.outlined is enabled. */
    notchedOutlineClassName: PropTypes.string,
    /** Callback function when text field has changes. */
    onChange: PropTypes.func,
    /** Enables outlined variant. */
    outlined: PropTypes.bool,
    /**
        Array of strings or objects to be used as options. To be used
        instead of <option> elements passed as this.props.children. If its an
        array of strings, then the string value will be used as the label and
        value of the <option> tag.
    */
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
    /** The value attribute for the input element */
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};

TextField.defaultProps = {
    onChange: () => null,
    value: '',
};
