# core-react-components

> Core react components taking advantage of the Material IO libarary which are commonly used in an app which includes Forms and validation. 

>This library is only in the beginning stages and not close to being ready for use just yet.

[![NPM](https://img.shields.io/npm/v/core-react-components.svg)](https://www.npmjs.com/package/core-react-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save core-react-components
```

## Usage

```jsx
import React, { Component } from 'react'

import {Form, CheckboxControlled} from 'core-react-components'

class Example extends Component {
  render () {
    return (
      <Form name="form1">
      	<TextFieldControlled name="textField1" />
  	  </Form>
    )
  }
}
```

## License

MIT © [bruqui](https://github.com/bruqui)
