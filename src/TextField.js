import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MdcTextField, {HelperText, Input} from '@material/react-text-field';
import classnames from 'classnames';

// Styles
import '@material/react-text-field/index.scss';

export default class TextField extends Component {
    handleOnChange = (event) => {
        event.stopPropagation();
        this.props.onChange(event);
    }

    renderHelperText() {
        return <HelperText>{this.props.helperText}</HelperText>;
    }

    render() {
        const {className, inputProps, label, value} = this.props;
        return (
            <MdcTextField 
                className={classnames('text-field', className)} 
                label={label} 
                helperText={this.renderHelperText()}
            >
                <Input value={value} onChange={this.handleOnChange} {...inputProps} />
            </MdcTextField>
        );
    }
}

TextField.propTypes = {
    className: PropTypes.string,
    helperText: PropTypes.string,
    /** Additional props to be added to the input element */
    inputProps: PropTypes.object,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func,
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