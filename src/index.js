import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Router, hashHistory} from 'react-router';
import Article from './containers/Article';

let RouterNav = <Router history={hashHistory}>
    <Router path="/" component={App}>
        <Router path="/articles/:articleId" component={Article}/>
    </Router>
</Router>;


ReactDOM.render(
    RouterNav,
    document.getElementById('root')
);
