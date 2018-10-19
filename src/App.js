import React, { Component } from 'react';
import FormTextField from './FormTextField';
import Form from './Form';

export default class App extends Component {
    render() {
        return (
            <section className="app">
                <h1>Test Components</h1>
                <Form name="mockName"><FormTextField name="mockFieldName" /></Form>
            </section>
        );
    }
}
