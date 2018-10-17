// Vendor Libs
import React from 'react';

export const FormContext = React.createContext({
	fields: {},
	setFieldError: () => null,
	setFieldValue: () => null,
});