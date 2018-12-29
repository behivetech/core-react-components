
// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MdcButton from '@material/react-button';
import {pick} from 'lodash';

// Styles
import '@material/react-button/index.scss';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();

        this.props.onClick(event);
    }

    render() {
        const {children, className, type} = this.props;
        const props = {
            ...pick(this.props, [
                'children',
                'className',
                'dense',
                'disabled',
                'href',
                'icon',
                'outlined',
                'raised',
                'type',
                'unelevated',
            ]),
            children: children || type,
            className: classnames('button', className),
            onClick: this.handleClick,
        };
        
        return <MdcButton {...props} />;
    }
}

Button.propTypes = {
    /** Text to be displayed within root element. */
    children: PropTypes.string,
    /** Ability to add additional className to the component for addistional styling from parent */
    className: PropTypes.string,
    /** Enables dense variant and makes the button smaller */
    dense: PropTypes.bool,
    /** Disables button if true. */
    disabled: PropTypes.bool,
    /** Sets a hyperlink & uses anchor tag instead of a button. */
    href: PropTypes.string,
    /** Icon to render within root element. */
    icon: PropTypes.node,
    /** callback function to run when the button is clicked. */
    onClick: PropTypes.func,
    /** Enables outlined variant. */
    outlined: PropTypes.bool,
    /** Enables raised variant. */
    raised: PropTypes.bool,
    /** indicates the type of button it is. Defaults to button */
    type: PropTypes.oneOf(['button', 'reset', 'submit']),
    /** Enables unelevated variant. */
    unelevated: PropTypes.bool,
};

Button.defaultProps = {
    onClick: () => null,
    type: 'button',
};
