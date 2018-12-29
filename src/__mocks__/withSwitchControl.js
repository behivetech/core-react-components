import {omit} from 'lodash';

export default (WrappedComponent) => function SwitchControlled(props) { 
    return <WrappedComponent {...omit(props, ['formState'])} />; 
};