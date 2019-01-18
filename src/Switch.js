// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Components
import MdcSwitch from '@material/react-switch';

// Styles
import '@material/react-switch/index.scss';
import './Switch.scss';

export default class Switch extends Component {
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
            value,
        } = this.props;

        return (
            <React.Fragment>
                <MdcSwitch
                    className="switch"
                    disabled={disabled}
                    id={id || name}
                    name={name || id}
                    onChange={this.handleChange}
                    value={value}
                />
            </React.Fragment>
        );
    }
}

Switch.propTypes = {
    /** ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** Controls the if the checkbox is checked or not */
    checked: PropTypes.bool,
    /** sets the state of the checkbox to disabled */
    disabled: PropTypes.bool,
    /** The id attribute for the input of the checkbox */
    id: PropTypes.string,
    /** The name attribute for the input of the checkbox */
    name: PropTypes.string,
    /**
        Callback function for when the checkbox changes. It's recommended to use
        onClick for the changing event since IE doesn't play well with onChange
    */
    onChange: PropTypes.func,
    /**
        The values to be compared with the default value with will check or umncheck
        the checkbox. If it's an array, this will compare to see if the value exists
        in the checkbox.
    */
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
    ]),
};

Switch.defaultProps = {
    checked: false,
    onChange: () => null,
    value: true,
};
