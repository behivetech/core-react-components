import React, { Component } from 'react';
import FormField from './FormField';
import FormTextField from './FormTextField';
import Form from './Form';

export default class App extends Component {
    render() {
        return (
            <section className="app">
                <h1>Form Components</h1>
                <Form name="mockName">
                	<FormField name="mockFieldName1" label="Mock Field 1" helperText="test helper text 1" component="TextField" />
                	<FormField name="mockFieldName2" label="Mock Field 2" helperText="test helper text 2" component="TextField" />
            	</Form>
            </section>
        );
    }
}
