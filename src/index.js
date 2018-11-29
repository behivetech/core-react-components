// Vendor Libs
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import App from './App';

// Styles
import './index.scss';
import './styles/mdc-theme.scss';

ReactDOM.render(<App />, document.getElementById('root'));
