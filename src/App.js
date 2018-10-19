import React, { Component } from 'react';
import FormField from './FormField';
import Form from './Form';

export default class App extends Component {
    render() {
        return (
            <section className="app">
                <h1>Form Components</h1>
                <Form name="mockName">
                	<FormField name="mockFieldName1" label="Mock Field 1" helperText="test helper text 1" componentName="TextField" />
                	<FormField name="mockFieldName2" label="Mock Field 2" helperText="test helper text 2" componentName="TextField" />
            	</Form>
            </section>
        );
    }
}
