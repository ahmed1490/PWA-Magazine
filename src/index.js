import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import Timeline from './components/Timeline';
var Timeline = require('./components/Timeline');

ReactDOM.render(
  <Timeline />,
  document.getElementById('root')
);
