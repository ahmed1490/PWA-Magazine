import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Router, Route, Link, browserHistory} from 'react-router';
import Timeline from './components/Timeline';

let RouterNav = <Router history={browserHistory}>
    <Router path="/" component={Timeline}>
        <Router path="/:articleId" component={App}/>
    </Router>
</Router>;


ReactDOM.render(
    RouterNav,
    document.getElementById('root')
);
