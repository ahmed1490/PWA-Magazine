import React from 'react';
import ReactDOM from 'react-dom';

import Router from 'react-router/lib/Router'
import IndexRoute from 'react-router/lib/IndexRoute'
import hashHistory from 'react-router/lib/hashHistory'

import App from './App';
import ArticleSlider from './containers/ArticleSlider';
import SliderTabs from './containers/SliderTabs';
import './index.css';

const applicationServerPublicKey = 'BDU56VPIW9XO4mTO6Pqmj9xPNTYHMK4rh6S7Ubh-bxoFN4tCN28BSwfO7NlsykkdZw-aMbHqRiO9sIcWbg0tLwU';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function () {
            console.log('Service Worker Registered');
        });
}

let RouterNav = <Router history={hashHistory}>
    <Router path="/" component={App}>
        <IndexRoute component={SliderTabs} />
        <Router path="/articles/:articleId" component={ArticleSlider}/>
    </Router>
</Router>;


ReactDOM.render(
    RouterNav,
    document.getElementById('root')
);


