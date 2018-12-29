import {omit} from 'lodash';

export default (WrappedComponent) => function FormFieldValidation(props) { 
    return <WrappedComponent {...omit(props, ['formState'])} />; 
};