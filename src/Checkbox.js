// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MdcCheckbox from '@material/react-checkbox';

// Styles
import './Checkbox.scss';
import '@material/react-checkbox/index.scss';

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            indeterminate: false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps({checked: nextChecked}) {
        if (this.state.checked !== nextChecked) {
            this.setState({checked: nextChecked});
        }
    }

    handleChange(event) {
        event.stopPropagation();
        this.setState({
            checked: event.target.checked,
            indeterminate: event.target.indeterminate,
        });
        this.props.onChange(event);
    }

    render() {
        const {
            disabled,
            id,
            name,
        } = this.props;

        return (
            <React.Fragment>
                <MdcCheckbox
                    className="checkbox"
                    checked={this.state.checked}
                    disabled={disabled}
                    name={name || id}
                    nativeControlId={id || name}
                    onChange={this.handleChange}
                />
            </React.Fragment>
        );
    }
}

Checkbox.propTypes = {
    /** Controls the if the checkbox is checked or not */
    checked: PropTypes.bool,
    /** sets the state of the checkbox to disabled */
    disabled: PropTypes.bool,
    /** The id attribute for the input of the checkbox */
    id: PropTypes.string,
    /** Additional props to be added to the input element */
    inputProps: PropTypes.object,
    /** The name attribute for the input of the checkbox */
    name: PropTypes.string,
    /** Callback function for when the checkbox changes. */
    onChange: PropTypes.func,
    /** The value attribute for the input element */
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};

Checkbox.defaultProps = {
    checked: false,
    onChange: () => null,
    value: true,
};
