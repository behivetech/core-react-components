// src/validators.js
import {isArray} from 'lodash';
import {
    isDecimal,
    isEmail,
    isNumeric,
} from 'validator';

export function required(value) {
    return ((!value && value !== 0) || (isArray(value) && !value.length) || value === '')
        ? 'This field cannot be empty' 
        : undefined;
}

export function numeric(value) {
    return (value && !isNumeric(String(value))) 
        ? 'This is not a valid number' 
        : undefined;
}

export function decimal(value) {
    return (value && !isDecimal(String(value)))
        ? 'This is not a valid decimal number' 
        : undefined;
}

export function positiveNumber(value) {
    return ((value && value !== "" && (+value <= 0)) || !isNumeric(String(value))) 
        ? 'Positive number required' 
        : undefined;
}

export function email(value) {
    return (value && !isEmail(String(value))) 
        ? 'This email address is invalid' 
        : undefined;
}
