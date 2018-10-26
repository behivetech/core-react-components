// src/validators.js
import {isArray} from 'lodash';
import {
    isDecimal,
    isEmail,
    isNumeric,
    isURL,
} from 'validator';

const imageUrlJpgRegex = /\.jpe?g$/i;
const priceRegex = /[\d]+\.[\d]{2}/;

export function decimal(value) {
    return value && !isDecimal(String(value)) ? 'This is not a valid decimal number' : undefined;
}

export function email(value) {
    return value && !isEmail(String(value)) ? 'This email address is invalid' : undefined;
}

export function nonNegativeNumber(value) {
    return value && (+value < 0) ? 'Non-negative number required' : undefined;
}

export function positiveNumber(value) {
    return value !== "" && (+value <= 0) ? 'Positive number required' : undefined;
}

export function numeric(value) {
    return value && !isNumeric(String(value)) ? 'This is not a valid integer' : undefined;
}

export function price(value) {
    return value && (!isDecimal(String(value)) || !priceRegex.test(String(value))) ? 'Price must match format 1.23' : undefined;
}

export function required(value) {
    return !value || (isArray(value) && !value.length) || value == '' ? 'This field cannot be empty' : undefined;
}

export function url(value) {
    return value && !isURL(String(value)) ? 'This URL is invalid' : undefined;
}

export function imageUrlJpg(value) {
    return value && (!isURL(String(value)) || !imageUrlJpgRegex.test(String(value))) ? 'This image URL is invalid or not a JPEG' : undefined;
}
