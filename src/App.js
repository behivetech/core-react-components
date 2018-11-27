

import React, {Component} from 'react';
import FormField from './FormField';
import Form from './Form';
import Checkbox from './Checkbox';

export default class App extends Component {
    state = {checked: false, indeterminate: false}

    render() {
        return (
            <section className="app">
                <h1>Form Components</h1>

                <Checkbox name="mockName" value="mock value" style={{'margin-left': '10px'}} label="mock label" />
                <Form name="mockName">
                    <FormField name="field1" label="Field 1" componentName="TextField" helperText="test" validate={['required']} />
                    <FormField defaultValue="value" name="field2" label="Field 2" componentName="Checkbox" helperText="test" />
                    <FormField defaultValue="value" name="field3" label="Field 3" componentName="Switch" helperText="test" />
                </Form>
            </section>
        );
    }
}
