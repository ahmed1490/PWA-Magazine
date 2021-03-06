import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'react-router/lib/Router'
import hashHistory from 'react-router/lib/hashHistory'

import App from './App';
import ArticleSlider from './containers/ArticleSlider';
import './index.css';

let RouterNav = <Router history={hashHistory}>
    <Router path="/" component={App}>
        <Router path="/articles/:articleId" component={ArticleSlider}/>
    </Router>
</Router>;


ReactDOM.render(
    RouterNav,
    document.getElementById('root')
);


