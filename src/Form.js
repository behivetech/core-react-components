// Vendor Libs
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(event);
    }

    render() {
        const {children, className, name} = this.props;

        return (
            <form className={classnames('form', className)} name={name} onSubmit={this.handleSubmit}>
                {children}
            </form>
        );
    }
}

Form.propTypes = {
    /** The children to go in the form */
    children: PropTypes.node,
    /** Used to add attitional styling from parent component */
    className: PropTypes.string,
    /** Any form type errors to help with it submitting and showing errors */
    formError: PropTypes.string,
    /**
        Standard name you would give a form using html. Helps with react refs.
        It's ideal to keep these names unique per what's displayed on the current
        page because of the potential refs created.
    */
    name: PropTypes.string.isRequired,
    /** Callback function when the form is submitted */
    onSubmit: PropTypes.func,
};

Form.defaultProps = {
    onSubmit: () => null,
};
